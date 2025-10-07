import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

function useAuthContext() {

    const authContext = useContext(AuthContext);
    if (!authContext)
        throw new Error('AuthContext must be used within an AuthProvider');
    const { state, dispatch } = authContext;
    return { ...state, dispatch };
}

export default useAuthContext