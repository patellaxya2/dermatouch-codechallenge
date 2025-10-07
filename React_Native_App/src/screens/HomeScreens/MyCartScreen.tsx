import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { IProduct, IOrder, HomeStackParamList, IPlaceOrderApiRes } from '../../types';
import EmptyList from '../../components/EmptyList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PRODUCTS } from '../../data/products';
import useMyCartContext from '../../hooks/useMyCartContext';
import ButtonCustom from '../../components/ButtonCustome';
import theme from '../../styles/theme';
import Loader from '../../components/Loader';
import { apiCall } from '../../api/setup';
import useAuthContext from '../../hooks/useAuthContext';

type MyCartScreenProps = NativeStackScreenProps<HomeStackParamList, 'MyCart'>;

const MyCartScreen: React.FC<MyCartScreenProps> = ({ }) => {
    const { access_token } = useAuthContext()
    const { cart, removeFromCart, clearCart } = useMyCartContext();
    const [loader, setLoader] = useState(false);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const placeOrder = () => {
        if (cart.length === 0) return;

        Alert.alert("Order Confirmation", "Are you sure want to place an order?", [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Proceed', onPress: () => callPlaceOrderApi(), style: 'default',
            },
        ]);


    };

    const callPlaceOrderApi = async () => {

        setLoader(true)
        const orderData = {
            items: cart,
            total
        }
        try {


            const res = await apiCall<IPlaceOrderApiRes>("POST", "/orders", access_token || "", {}, JSON.stringify(orderData));
            if (res.status) {
                clearCart()

                Alert.alert("Congratulations", "Order Placed Successfully.")
            }
            setLoader(false)



        } catch (error) {

            setLoader(false)
            Alert.alert("Error", "Something went wrong while placing a order.")


        }
    }

    return (
        <View style={styles.container}>
            <Loader visible={loader} />
            <FlatList
                data={cart}
                keyExtractor={(item, i) => item.id}
                ListEmptyComponent={<EmptyList message="Your cart is empty" />}
                renderItem={({ item }) => (

                    <View style={styles.item}>
                        <View>
                            <Text style={styles.name}>{item.title}</Text>
                            <Text>₹{item.price}</Text>
                        </View>
                        <ButtonCustom
                            buttonStyle={styles.removeBtn}
                            title='Remove'
                            onClick={() => {
                                removeFromCart(item.id)
                            }}
                        />
                    </View>

                )}
            />
            {cart.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.total}>Total: ₹{total}</Text>
                    <TouchableOpacity style={styles.orderBtn} onPress={placeOrder}>
                        <Text style={styles.orderText}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default MyCartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: theme.colors.primary
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    footer: {
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    orderBtn: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    orderText: { color: '#fff', fontWeight: '600' },
    name: { fontWeight: 'bold', fontSize: 16 },
    removeBtn: {
        width: "23%",
        height: 35,
        borderWidth: 0.5,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    }

});
