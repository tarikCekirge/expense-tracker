import { Pressable, Text, View } from 'react-native'

type Props = {
    id?: string
    description: string
    amount: number
    date: Date
}

const ExpenseItem = ({ description, amount, date }: Props) => {
    return (
        <Pressable>
            <View className='p-3 my-2 bg-primary-600 flex flex-row justify-between rounded-md elevation shadow'>
                <View>
                    <Text className='text-primary-100 text-sm font-bold'>{description}</Text>
                    <Text className='text-white text-sm'>{date.toDateString()}</Text>
                </View>
                <View>
                    <Text className='bg-primary-50 p-3 rounded-md flex items-center font-bold text-primary-950'>
                        ${amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem
