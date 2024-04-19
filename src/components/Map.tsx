"use client";

import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { NavigationControl, GeolocateControl, Marker } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "sonner"
import { MapPin } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import { User } from "@prisma/client";

interface Props {
    user: User | null;
}

const Map = ({ user }: Props) => {

    mapboxgl.accessToken =
        'pk.eyJ1Ijoic2hyZXlhcy0yOTc0IiwiYSI6ImNsZHI2c291eDFpankzdnFndTU1MXk5bTYifQ.pj7LpQpOQebyerv7kZogRg';

    const mapContainerRef = useRef(null);

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 10
    });
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);

    // useEffect(() => {
    //     const map = new mapboxgl.Map({
    //         container: mapContainerRef.current!,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [lng, lat],
    //         zoom: viewport.zoom
    //     });

    //     map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    //     map.on('move', () => {
    //         setViewport({
    //             ...viewport,
    //             latitude: map.getCenter().lat,
    //             longitude: map.getCenter().lng,
    //             zoom: map.getZoom()
    //         });
    //         setLat(map.getCenter().lat);
    //         setLng(map.getCenter().lng);
    //     });

    //     if (user?.address) {
    //         fetchUserLocation(user.address);
    //     }

    //     return () => map.remove();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     // Fetch user's current location
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             position => {
    //                 setViewport(prevViewport => ({
    //                     ...prevViewport,
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude
    //                 }));
    //             },
    //             error => {
    //                 console.error('Error getting user location:', error);
    //                 toast.error("Error getting user location");
    //             }
    //         );
    //     } else {
    //         console.error('Geolocation is not supported by this browser.');
    //     }
    // }, []);

    useEffect(() => {
        const fetchUserLocation = (address: string) => {
            // Fetch user's location from address using geocoding service
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}`)
                .then(response => response.json())
                .then(data => {
                    console.log("data", data)
                    if (data.features && data.features.length > 0) {
                        const [lng, lat] = data.features[0].center;
                        console.log("lng", lng, "lat", lat)
                        setViewport({
                            latitude: lat,
                            longitude: lng,
                            zoom: 10
                        });
                        setLat(lat);
                        setLng(lng);
                    } else {
                        console.error('No location found for the given address:', address);
                        toast.error("No location found for the given address");
                    }
                })
                .catch(error => {
                    console.error('Error fetching user location:', error);
                    toast.error("Error fetching user location");
                });
        };

        if (user?.address) {
            fetchUserLocation(user.address);
        }
    }, [user, mapboxToken, viewport]);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: viewport.zoom
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setViewport({
                ...viewport,
                latitude: lat,
                longitude: lng
            });
        });
    }, [lng, lat, viewport]);

    useEffect(() => {
        if (lat !== 0 && lng !== 0) {
            setViewport({
                ...viewport,
                latitude: lat,
                longitude: lng
            });
        }
    }, [lat, lng, viewport]);

    return (
        <div className='inset-0 absolute w-full min-h-[450px] h-full' ref={mapContainerRef}>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                // @ts-ignore
                onViewportChange={setViewport}
            >
                {user && user.address && (
                    <Marker
                        latitude={lat}
                        longitude={lng}
                        style={{ transform: 'translate(-50%, -100%)' }}
                    >
                        <MapPin className="text-red-500" />
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    )
};

export default Map
