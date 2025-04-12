import { StyleSheet, Text, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { Expense } from 'types/expensesTypes'


type Props = {
    expensesPeriod: string
    expenses: Expense[]
    fallBackText: string
}


const ExpensesOutput = ({ expensesPeriod, expenses, fallBackText = 'No registered expenses found!' }: Props) => {

    let content = <Text className='text-center p-2 bg-accent-500 rounded-md my-4 text-lg font-bold text-white'>{fallBackText}</Text>

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }
    return (
        <View className='p-4 pb-0 bg-primary-100 flex-1'>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({})