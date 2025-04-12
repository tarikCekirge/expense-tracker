import { StyleSheet, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { Expense } from 'types/expensesTypes'


type Props = {
    expensesPeriod: string
    expenses: Expense[]
}


const ExpensesOutput = ({ expensesPeriod, expenses }: Props) => {
    return (
        <View className='p-4 pb-0 bg-primary-100 flex-1'>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({})