import React, { createContext, useState, ReactNode } from 'react';
import { IOrder, IProduct } from '../types';
interface MyCartContextType {
    cart: IProduct[];
    addToCart: (item: IProduct) => void;
    clearCart: () => void;
    orders: IOrder[];
    placeOrder: () => void;
    isInCart: (id: string) => boolean;
    removeFromCart: (id: string) => void;

}
export const MyCartContext = createContext<MyCartContextType | undefined>(undefined);

export const MyCartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<IProduct[]>([]);
    const [orders, setOrders] = useState<IOrder[]>([]);

    const addToCart = (item: IProduct) => setCart(prev => [...prev, item]);

    const clearCart = () => setCart([]);
    const isInCart = (id: string) => cart.some((item) => item.id === id);
    const removeFromCart = (id: string) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const placeOrder = () => {
        if (cart.length === 0) return;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const newOrder: IOrder = { id: Date.now().toString(), items: cart, total };
        setOrders(prev => [...prev, newOrder]);
        clearCart();
    };


    const value = { cart, addToCart, clearCart, orders, placeOrder, isInCart, removeFromCart };

    return <MyCartContext.Provider value={value}>{children}</MyCartContext.Provider>;
};

