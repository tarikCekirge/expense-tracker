import { GestureResponderEvent, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { GlobalStyles } from 'constants/styles'

type Props = {
    children: React.ReactNode,
    onPress: (event: GestureResponderEvent) => void,
    mode?: 'flat',
    style?: ViewStyle | ViewStyle[],
    className?: string
}

const Button = ({ children, onPress, mode, style, className }: Props) => {
    return (
        <View style={style} className={className}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary[500]
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: GlobalStyles.colors.primary[600]
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary[100],
        borderRadius: 4,
    }
})
