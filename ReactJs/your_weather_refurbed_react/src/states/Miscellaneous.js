import { create } from "zustand";

const useMiscellaneous = create((set) => ({
    input: 0,
    setInput: (data) => {
        set((state) => ({
            input: data
        }));
    },
    closeMenuN: 0,
    setCloseMenuN: (data) => {
        set((state) => ({
            closeMenuN: data
        }));
    }
}));

export default useMiscellaneous;