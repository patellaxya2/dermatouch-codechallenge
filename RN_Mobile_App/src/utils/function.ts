import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { IAuthAction } from "../types";
import { BASE_URL } from "@env";

export function getBaseURL() {
    
    return BASE_URL

}

export const saveAuthStateToStorage = async (state: object) => {
    try {
      await AsyncStorage.setItem('authState', JSON.stringify(state));
    } catch (error) {}
};
  

export function logout(dispatch: Dispatch<IAuthAction>) {
  dispatch({ type: 'LOGOUT' });  
}