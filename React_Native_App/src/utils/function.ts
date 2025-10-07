import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { IAuthAction } from "../types";

export function getBaseURL() {
    
    return 'http://192.168.1.101:4000/api'

}

export const saveAuthStateToStorage = async (state: object) => {
    try {
      await AsyncStorage.setItem('authState', JSON.stringify(state));
    } catch (error) {}
};
  

export function logout(dispatch: Dispatch<IAuthAction>) {
  dispatch({ type: 'LOGOUT' });  
}