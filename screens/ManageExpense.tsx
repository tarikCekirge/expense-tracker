import { Alert, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigationTypes';
import { useContext, useLayoutEffect } from 'react';
import { ExpensesContext } from 'store/expenses-context';
import ExpenseForm from 'components/ManageExpense/ExpenseForm';
import { storeExpense } from 'util/http';

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

    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === expenseId);

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

    const confirmHandler = async (expenseData: ExpenseData) => {
        try {
            if (isEditing && expenseId) {
                expensesCtx.updateExpense(expenseId, expenseData);
            } else {
                const data = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData });
            }

            navigation.goBack();
        } catch (error) {
            console.error('Expense saving failed:', error);
            Alert.alert('Failed to save expense', 'Please try again later.');
        }
    };


    return (
        <View className='flex-1 p-4 bg-primary-50'>
            <View >
                <ExpenseForm
                    defaultValues={selectedExpense}
                    isEditing={isEditing}
                    submitButtonLabel={isEditing ? 'Update' : 'Add'}
                    onSubmit={confirmHandler}
                    onCancel={cancelHandler}
                    onDelete={expenseDeleteHandler}
                />
            </View>

        </View>
    );
};

export default ManageExpense;

