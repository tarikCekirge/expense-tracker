import { StyleSheet, Text, View } from 'react-native'
import { Expense } from 'types/expensesTypes'


type Props = {
    periodName: string
    expenses: Expense[]
}
const ExpensesSummary = ({ expenses, periodName }: Props) => {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)
    return (
        <View className='p-2 bg-primary-300 flex flex-row rounded-md mb-2 justify-between'>
            <Text className='text-primary-950 font-bold text-lg'>{periodName}</Text>
            <Text className='text-primary-950 font-bold text-lg'>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary

const styles = StyleSheet.create({})