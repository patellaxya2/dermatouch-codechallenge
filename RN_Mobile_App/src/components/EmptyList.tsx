import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const EmptyList = ({ message }: { message: string }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
    </View>
);

export default React.memo(EmptyList);

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginTop: 50 },
    text: { color: '#666', fontSize: 16 },
});
