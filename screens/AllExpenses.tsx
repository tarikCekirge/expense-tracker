import { Container } from 'components/Container'
import ExpensesOutput from 'components/ExpensesOutput/ExpensesOutput'
import { StyleSheet, Text, View } from 'react-native'

const AllExpenses = () => {
    return (
        <ExpensesOutput expensesPeriod='TOTAL' />
    )
}

export default AllExpenses

const styles = StyleSheet.create({})