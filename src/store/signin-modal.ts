import { create } from "zustand";

interface SignInModalStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const useSignInModal = create<SignInModalStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useSignInModal;
