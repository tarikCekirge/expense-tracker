import { StyleSheet, Text, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigationTypes';
import { useContext, useLayoutEffect } from 'react';
import IconButton from 'components/UI/IconButton';
import { GlobalStyles } from 'constants/styles';
import Button from 'components/UI/Button';
import { ExpensesContext } from 'store/expenses-context';

type ManageExpenseRouteProp = RouteProp<RootStackParamList, 'ManageExpense'>;

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

    const confirmHandler = () => {
        if (isEditing) {
            expensesCtx.updateExpense(expenseId, { description: 'Demo Description', amount: 9.99, date: new Date() })
        } else {
            expensesCtx.addExpense({ description: 'Demo Description', amount: 9.99, date: new Date() })
        }
        navigation.goBack()

    }

    return (
        <View className='flex-1 p-4 bg-primary-50'>
            <Text className='flex-1'>
                {isEditing ? 'Edit Expense Form' : 'Add New Expense Form'} - {expenseId}
            </Text>
            <View>
                <View className='flex flex-row p-2'>
                    <Button className='flex-1' mode='flat' onPress={cancelHandler}>Cancel</Button>
                    <Button className='flex-1' onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
                </View>
                {isEditing && <View style={styles.deleteContainer}><IconButton name='trash' color={GlobalStyles.colors.error[600]} size={24} onPress={expenseDeleteHandler} /></View>}
            </View>

        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary[600],
        alignItems: 'center'
    },
});