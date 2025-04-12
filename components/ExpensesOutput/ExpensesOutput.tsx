import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'


type Expense = {
    id: string
    description: string
    amount: number
    date: Date
}

type Props = {
    expensesPeriod: string
    expenses: Expense[]
}


const ExpensesOutput = ({ expenses, expensesPeriod }: Props) => {
    return (
        <View>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList />
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({})