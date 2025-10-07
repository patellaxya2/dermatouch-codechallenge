import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { HomeStackParamList, IOrder } from '../../types';
import EmptyList from '../../components/EmptyList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { apiCall } from '../../api/setup';
import useAuthContext from '../../hooks/useAuthContext';
import { logout } from '../../utils/function';
import { useIsFocused } from '@react-navigation/native';
type MyOrdersScreenProps = NativeStackScreenProps<HomeStackParamList, 'MyOrders'>;

const MyOrdersScreen: React.FC<MyOrdersScreenProps> = ({ }) => {
    const focus = useIsFocused()
    const { access_token, dispatch, userDetails } = useAuthContext()
    const [orderList, setOrderList] = useState<IOrder[]>([]);
    useEffect(() => {
        if (focus) {
            fetchOrders()

        }
    }, [focus]);

    const fetchOrders = async () => {
        try {
            const res: IOrder[] = await apiCall("GET", "/orders", access_token || "", {}, "");


            if (res.length > 0) {
                setOrderList(res)
            }
        } catch (error) {


        }
    }
    return <View style={styles.container}>
        <View style={styles.accountContainer}>
            <Text style={styles.header}>My Account</Text>


            <>
                <View style={styles.userBox}>
                    <Text style={styles.info}>👤 Name: {userDetails?.name}</Text>
                    <Text style={styles.info}>📧 Email: {userDetails?.email}</Text>
                </View>

                <View style={styles.divider} />

                {/* Your order list component here */}

                <Button title="Logout" onPress={() => {
                    Alert.alert("Logout", "Are you sure want to logout?", [
                        {
                            text: "No",
                        },
                        {
                            text: "Logout",
                            onPress: () => {
                                logout(dispatch)
                            }
                        }
                    ])
                }} color="#d9534f" />
            </>

        </View>
        <View style={{ flex: 0.7 }}>
            <Text style={styles.subHeader}>My Orders</Text>

            <FlatList
                data={orderList}
                keyExtractor={item => item?.id}
                ListEmptyComponent={<EmptyList message="No previous orders" />}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>Order #{item?.id}</Text>
                        <Text>Items: {item?.items.length}</Text>
                        <Text>Total: ₹{item?.total}</Text>
                        <Text>Status: {item?.status}</Text>
                    </View>
                )}
            />
        </View>
    </View>
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: '#fff' },
    accountContainer: {
        flex: 0.3,
    },
    card: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
    },
    userBox: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
        marginBottom: 4,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
    },
});
