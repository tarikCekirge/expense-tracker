import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { Expense } from 'types/expensesTypes'
import { DUMMY_EXPENSES } from 'data/dummyData'


type Props = {
    expensesPeriod: string
}


const ExpensesOutput = ({ expensesPeriod }: Props) => {
    return (
        <View className='p-4 pb-0 bg-primary-100 flex-1'>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({})