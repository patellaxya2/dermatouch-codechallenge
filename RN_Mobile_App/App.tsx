/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import '@babel/polyfill';
import React, { } from 'react';
import { Text } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { enableScreens } from 'react-native-screens';
import Routes from './src/navigation/Routes';
import { AuthProvider } from './src/context/AuthContext';


enableScreens();



function App(): React.JSX.Element {

  return (

    <SafeAreaProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </SafeAreaProvider>

  );
}



export default App;
