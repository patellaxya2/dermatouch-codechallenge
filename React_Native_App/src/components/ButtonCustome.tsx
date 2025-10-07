import { ReactNode } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle
} from 'react-native';

type customButtonType = 'primary' | 'secondary';


const ButtonCustom = ({
    disabled,
    buttonStyle,
    onClick,
    title,
    styleType = 'primary',
    titleStyle
}: {
    disabled?: boolean;
    buttonStyle?: ViewStyle;
    onClick: () => void;
    title: string;
    styleType?: customButtonType;
    titleStyle?: TextStyle;
}) => {

    return (
        <TouchableOpacity
            style={[styles.button, { ...buttonStyle }]}
            onPress={onClick}
            disabled={disabled}
        >
            <Text
                style={titleStyle}
                numberOfLines={1}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
});

export default ButtonCustom;
