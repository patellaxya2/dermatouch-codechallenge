import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { MyCartContext } from '../context/MyCartContext';

function useMyCartContext() {

    const myCartContext = useContext(MyCartContext);
    if (!myCartContext)
        throw new Error('AuthContext must be used within an AuthProvider');
    const state = myCartContext;
    return state;
}

export default useMyCartContext