import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TextInputCustom from '../../components/TextInputCustom'
import theme from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonCustom from '../../components/ButtonCustome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, ILoginApiRes } from '../../types';
import useAuthContext from '../../hooks/useAuthContext';
import { apiCall } from '../../api/setup';
import Loader from '../../components/Loader';
type RegiScreenProps = NativeStackScreenProps<AuthStackParamList, 'Registration'>;

const RegistrationScreen: React.FC<RegiScreenProps> = ({ navigation }) => {
    const [fullName, setFullName] = useState<string>('');
    const [emailId, setEmailId] = useState<string>('');
    const [psw, setPsw] = useState<string>('');
    const { dispatch } = useAuthContext()
    const [loader, setLoader] = useState(false);

    const onRegistration = async () => {
        if (!emailId) {
            Alert.alert("Error", "Email id is required!")
        } else if (!psw) {
            Alert.alert("Error", "Password is required!")
        } else {
            setLoader(true)

            try {
                const res = await apiCall<ILoginApiRes>("POST", "/auth/register", "", {}, JSON.stringify({
                    email: emailId,
                    password: psw,
                    name: fullName
                }))
                if (res?.token) {
                    // successfully Register
                    dispatch({ payload: { userDetails: res.user, access_token: res.token, error: null, isAuthenticated: true, loading: false }, type: "LOGIN_SUCCESS" })
                }
                setLoader(false)

            } catch (error: any) {
                Alert.alert("Error", error && error?.message !== null && error?.message || "Something went wrong!!")
                setLoader(false)

            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loader} />

            <TextInputCustom
                label='Full Name'
                handleChange={(text) => {
                    setFullName(text)
                }}
                inputValue={fullName}
                type='string'
                inputStyle={styles.inputStyle}

            />
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

                onClick={() => { onRegistration() }}
                title='Register'
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: theme.colors.primary, fontSize: 16 }}
            />

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                    <Text style={{ textDecorationLine: "underline" }}>Already have an account? Login.</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RegistrationScreen

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