import { Alert, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigationTypes';
import { useContext, useLayoutEffect, useState } from 'react';
import { ExpensesContext } from 'store/expenses-context';
import ExpenseForm from 'components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from 'util/http';
import LoadingOverlay from 'components/UI/LoadingOverlay';
import ErrorOverlay from 'components/UI/ErrorOverlay';

type ManageExpenseRouteProp = RouteProp<RootStackParamList, 'ManageExpense'>;

type ExpenseData = {
    amount: number;
    date: Date;
    description: string;
};

const ManageExpense = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null);

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

    const expenseDeleteHandler = async () => {
        setIsSubmitting(true)

        try {
            await deleteExpense(expenseId)
            navigation.goBack()
            expensesCtx.deleteExpense(expenseId)
        } catch (error) {
            setError('Could not delete expense please try again!')
            setIsSubmitting(false)
        }



    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = async (expenseData: ExpenseData) => {
        setIsSubmitting(true)
        try {
            if (isEditing && expenseId) {
                expensesCtx.updateExpense(expenseId, expenseData);
                await updateExpense(expenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            console.error('Expense saving failed:', error);
            Alert.alert('Failed to save expense', 'Please try again later.');
        }
    };

    const errorHandler = () => {
        setError(null)
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }


    if (isSubmitting) {
        return <LoadingOverlay />
    }

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

