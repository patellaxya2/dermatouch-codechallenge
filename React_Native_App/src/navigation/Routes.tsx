import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { MyCartProvider } from '../context/MyCartContext';
import useAuthContext from '../hooks/useAuthContext';


function Routes() {
    const { isAuthenticated, loading } = useAuthContext();



    return (

        <NavigationContainer>
            {loading ? (
                <Loader visible={loading} />
            ) : !isAuthenticated ? (
                <AuthStack />
            ) : (
                <MyCartProvider>
                    <HomeStack />
                </MyCartProvider>
            )}
        </NavigationContainer>


    );
}

export default Routes;
