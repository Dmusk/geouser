import { create } from "zustand";

interface SignUpModalStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const useSignUpModal = create<SignUpModalStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useSignUpModal;
