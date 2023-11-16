import { message } from 'antd';
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// export interface CartState {
//     items: any[],
//     add: (item: any) => void,
//     remove: (id: any) => void
// }

const useCartStore = create<any>(
    persist(
        devtools(
            (set, get) => ({
                items: [],
                add: (item: any) => {
                    const items = get().items
                    const found = items.find((x: any) => x.item.id === item.id)
                    message.success('Add to cart success')
                    if (found) {
                        found.quantity++
                    }
                    else {
                        items.push({ item, quantity: 1 })
                    }
                    return set({ items: items }, false, { type: 'cart/addToCart' })
                },
                remove: (id: any) => {
                    const items = get().items
                    const newItems = items.filter((item: any) => item.item.id !== id)
                    return set({ items: newItems }, false, { type: 'cart/removeFromCart' })
                }
            })
        ),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
export default useCartStore;