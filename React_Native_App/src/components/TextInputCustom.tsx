import React from 'react'
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View } from 'react-native'

interface TxtInputProps {
    label: string;
    inputValue: string;
    handleChange: (txt: string) => void;
    inputStyle?: StyleProp<TextStyle>;
    type: "number" | "string",
    validation?: string;
    maxInputLength?: number | undefined;

}

function TextInputCustom({ label, type, handleChange, inputStyle, inputValue, validation, maxInputLength }: TxtInputProps) {
    return (

        <TextInput

            value={inputValue}
            style={[
                styles.txtInput,
                inputStyle
            ]}
            keyboardType={type === 'number' ? 'phone-pad' : 'default'}
            onChangeText={handleChange}
            secureTextEntry={validation === 'password'}
            placeholder={label}
            maxLength={maxInputLength}
        />

    )
}

export default TextInputCustom

const styles = StyleSheet.create({

    txtInput: {
        height: 48,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: '400'
    }

})