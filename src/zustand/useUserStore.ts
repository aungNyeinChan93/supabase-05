/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

type UserStore = {
    user: any,
    setUser: (user: any) => void
};

const useUserStore = create<UserStore>((set) => {
    return {
        user: {},
        setUser: (newUser: any) => set({ user: newUser })
    }
});


export default useUserStore;


