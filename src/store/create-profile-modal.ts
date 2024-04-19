import { create } from "zustand";

interface ProfileModalStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const useProfileModal = create<ProfileModalStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useProfileModal;
