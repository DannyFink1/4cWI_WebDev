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
    },
    tempTodayRange: {},
    setTempTodayRange: (data) => {
        set((state) => ({
            tempTodayRange: data
        }));
    },
    tomorrow: {},
    setTomorrow: (data) => {
        set((state) => ({
            tomorrow: data
        }));
    },
    tomorrowRange: {},
    setTomorrowRange: (data) => {
        set((state) => ({
            tomorrowRange: data
        }));
    },
    threeDays: {},
    setThreeDays: (data) => {
        set((state) => ({
            threeDays: data
        }));
    },
}));

export default useAPI;