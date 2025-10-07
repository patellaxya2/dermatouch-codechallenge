import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IProduct } from '../types';
import theme from '../styles/theme';

interface Props {
    product: IProduct;
    onAddToCart: (item: IProduct) => void;
    inCart: boolean;
    onRemove: () => void;


}

const ProductCard: React.FC<Props> = ({ product, onAddToCart, inCart, onRemove }) => {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{product.title}</Text>
                <Text >{product.category}</Text>
                <Text style={styles.price}>₹{product.price}</Text>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={() =>

                inCart ? onRemove() : onAddToCart(product)

            }>
                <Text style={styles.addText}>{inCart ? "Remove" : "Add to Cart"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(ProductCard);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        marginBottom: 15,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2
    },
    name: { fontWeight: 'bold', fontSize: 16 },
    price: { color: '#666' },
    addBtn: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRadius: 5,
        height: 40,
        alignSelf: "center"
    },
    addText: { color: '#fff', fontWeight: '600' },
});
