import ExpensesOutput from 'components/ExpensesOutput/ExpensesOutput'
import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ExpensesContext } from 'store/expenses-context'

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext)
    return (
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='TOTAL' fallBackText='No registered expenses found!' />
    )
}

export default AllExpenses

const styles = StyleSheet.create({})