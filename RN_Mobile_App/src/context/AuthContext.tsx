import {
    Dispatch,
    ReactNode,
    createContext,
    useEffect,
    useReducer
} from 'react';
import { IAuthAction, IAuthState } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveAuthStateToStorage } from '../utils/function';

const initialState: IAuthState = {
    isAuthenticated: false,
    access_token: null,
    error: null,
    loading: false,
    userDetails: null
};

const authReducer = (state: IAuthState, action: IAuthAction) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                isAuthenticated: true,
                access_token: action.payload.access_token,
                error: null,
                loading: false,
                userDetails: action.payload.userDetails
            };
        case 'LOGIN_FAILURE':
            return {
                isAuthenticated: false,
                access_token: null,
                error: action.payload,
                loading: false,
                userDetails: null

            };
        case 'LOGOUT':
            return initialState
        default:
            return state;
    }
};
interface AuthContextProps {
    state: IAuthState;
    dispatch: Dispatch<IAuthAction>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
    undefined
);
// Provider component
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<IAuthState, IAuthAction>>(authReducer, initialState);

    // Restore state from AsyncStorage when the app starts
    useEffect(() => {
        const loadStoredState = async () => {
            try {
                const storedState = await AsyncStorage.getItem('authState');
                if (storedState) {
                    const authStateData: IAuthState = JSON.parse(storedState);
                    if (authStateData?.isAuthenticated) {
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: JSON.parse(storedState)
                        });
                    }
                    state.loading = false;

                }
            } catch (error) {
                state.loading = false;

            }
        };

        loadStoredState();
    }, []);

    // Save state to AsyncStorage whenever it changes
    useEffect(() => {
        state.loading = true;
        saveAuthStateToStorage(state)
            .then((res) => {
                //saved in storage
                state.loading = false;
            })
            .catch((e) => {
                state.loading = false;

                // something went wrong with storage
            });
    }, [state]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
