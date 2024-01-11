import { create } from "zustand";

const useAPI = create((set) => ({
    data: {},
    setData: (data) => {
        set((state) => ({
            data: data
        }));
    }
}));

export default useAPI;