import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'

const ExpenseForm = () => {

    const amountChangeHandler = () => { }
    return (
        <View>
            <Text className='text-center text-xl font-bold text-primary-700 mt-4'>Your Expense</Text>
            <View className='flex flex-row gap-4'>
                <View className='flex-1'>
                    <Input label='Amount' textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: amountChangeHandler
                    }} />
                </View>
                <View className='flex-1'>
                    <Input label='Date' textInputConfig={{
                        placeholder: 'YYY-MM-DD',
                        maxLength: 10,
                        onChangeText: () => { },
                    }} />
                </View>
            </View>
            <Input label='Description' textInputConfig={{
                multiline: true,
                autoCorrect: false,
                autoCapitalize: 'sentences'
            }} />

        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({})