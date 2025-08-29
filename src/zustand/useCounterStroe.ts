import { create } from 'zustand'

interface Counter {
    count: number,
    increment: () => void
};


const useCounterStore = create<Counter>((set) => {
    return {
        count: 0,
        increment: () => set(state => ({ count: state.count + 1 }))
    }
});

export default useCounterStore;