import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import { Expense } from 'types/expensesTypes'
import ExpenseItem from './ExpenseItem'

type ExpensesListProps = {
    expenses: Expense[]
}

const renderExpenseItem: ListRenderItem<Expense> = ({ item }) => {
    return <ExpenseItem {...item} />
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
    return (
        <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
    )
}

export default ExpensesList

