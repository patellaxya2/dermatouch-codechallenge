import React, { useContext, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TextInputCustom from '../../components/TextInputCustom'
import theme from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonCustom from '../../components/ButtonCustome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, IErrorApi, ILoginApiRes } from '../../types';
import { apiCall } from '../../api/setup';
import Loader from '../../components/Loader';
import { AuthContext } from '../../context/AuthContext';
import useAuthContext from '../../hooks/useAuthContext';
type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { dispatch } = useAuthContext()

    const [emailId, setEmailId] = useState<string>('');
    const [psw, setPsw] = useState<string>('');
    const [loader, setLoader] = useState(false);

    const login = async () => {
        if (!emailId) {
            Alert.alert("Error", "Email id is required!")
        } else if (!psw) {
            Alert.alert("Error", "Password is required!")
        } else {
            setLoader(true)
            try {
                const res = await apiCall<ILoginApiRes>("POST", "/auth/login", "", {}, JSON.stringify({
                    email: emailId,
                    password: psw
                }))
                if (res?.token) {
                    // successfully login
                    dispatch({ payload: { userDetails: res.user, access_token: res.token, error: null, isAuthenticated: true, loading: false }, type: "LOGIN_SUCCESS" })
                }
                setLoader(false)

            } catch (error: any) {
                setLoader(false)

                Alert.alert("Error", error && error?.message !== null && error?.message || "Something went wrong!!")

            }
        }


    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loader} />
            <TextInputCustom
                label='Email Id*'
                handleChange={(text) => {
                    setEmailId(text)
                }}
                inputValue={emailId}
                type='string'
                inputStyle={styles.inputStyle}

            />
            <TextInputCustom
                label='Password*'
                handleChange={(text) => {
                    setPsw(text)
                }}
                inputValue={psw}
                type='string'
                validation='password'
                inputStyle={styles.inputStyle}


            />

            <ButtonCustom

                onClick={() => { login() }}
                title='Login'
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: theme.colors.primary, fontSize: 16 }}
            />

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.replace("Registration")}>
                    <Text style={{ textDecorationLine: "underline" }}>New User? Register.</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        gap: 10,
        paddingTop: 10

    },
    title: {},
    btnStyle: {
        backgroundColor: theme.colors.secondary,
        margin: 10

    },
    inputStyle: {
        margin: 10
    }


})