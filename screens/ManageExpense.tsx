import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigationTypes';
import { useContext, useLayoutEffect } from 'react';
import IconButton from 'components/UI/IconButton';
import { GlobalStyles } from 'constants/styles';
import Button from 'components/UI/Button';
import { ExpensesContext } from 'store/expenses-context';
import ExpenseForm from 'components/ManageExpense/ExpenseForm';

type ManageExpenseRouteProp = RouteProp<RootStackParamList, 'ManageExpense'>;

type ExpenseData = {
    amount: number;
    date: Date;
    description: string;
};

const ManageExpense = () => {
    const expensesCtx = useContext(ExpensesContext)
    const route = useRoute<ManageExpenseRouteProp>();
    const navigation = useNavigation();
    const expenseId = route.params?.expenseId
    const isEditing = !!expenseId;


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    const expenseDeleteHandler = () => {
        navigation.goBack()
        expensesCtx.deleteExpense(expenseId)
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = (expenseData: ExpenseData) => {
        if (isEditing && expenseId) {
            expensesCtx.updateExpense(expenseId, expenseData);
        } else {
            expensesCtx.addExpense(expenseData);
        }

        navigation.goBack();
    };

    return (
        <View className='flex-1 p-4 bg-primary-50'>
            <View >
                <ExpenseForm isEditing={isEditing} submitButtonLabel={isEditing ? 'Update' : 'Add'} onSubmit={confirmHandler} onCancel={cancelHandler} onDelete={expenseDeleteHandler} />
            </View>

        </View>
    );
};

export default ManageExpense;

