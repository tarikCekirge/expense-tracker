import { useNavigation } from '@react-navigation/native'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import { getFormattedDate } from 'util/date'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'types/navigationTypes'


type Props = {
    id?: string
    description: string
    amount: number
    date: Date
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'ManageExpense'>

const ExpenseItem = ({ description, amount, date }: Props) => {
    const navigation = useNavigation<NavigationProps>()

    const expensePressHandler = () => {
        navigation.navigate('ManageExpense')
    }

    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed} android_ripple={{ color: '#ccc' }}>
            <View className="p-3 my-1 bg-primary-600 flex flex-row justify-between items-center rounded-md elevation shadow h-16">
                <View>
                    <Text className="text-primary-100 text-sm font-bold">{description}</Text>
                    <Text className="text-white text-sm">{getFormattedDate(date)}</Text>
                </View>
                <View>
                    <Text className="bg-primary-50 p-3 text-xs min-w-20 text-center rounded-md flex items-center font-bold text-primary-950">
                        ${amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    }
})
