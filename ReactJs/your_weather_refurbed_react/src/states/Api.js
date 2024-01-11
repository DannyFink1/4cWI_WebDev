import { create } from "zustand";

const useAPI = create((set) => ({
    current: {},
    setCurrent: (data) => {
        set((state) => ({
            current: data
        }));    
    },
    todayRange: {},
    setTodayRange: (data) => {
        set((state) => ({
            todayRange: data
        })); 
    }  
}));

export default useAPI;