import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { GestureResponderEvent } from 'react-native'

type IconButtonProps = {
    name: keyof typeof Ionicons.glyphMap
    size: number
    color: string | undefined
    onPress: (event: GestureResponderEvent) => void
}

const IconButton = ({ name, size, color, onPress }: IconButtonProps) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
            <View className='rounded-md p-2 m-2'>
                <Ionicons name={name} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    }
})
