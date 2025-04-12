import { StyleSheet, Text, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigationTypes';
import { useLayoutEffect } from 'react';

type ManageExpenseRouteProp = RouteProp<RootStackParamList, 'ManageExpense'>;

const ManageExpense = () => {
    const route = useRoute<ManageExpenseRouteProp>();
    const navigation = useNavigation();
    const expenseId = route.params?.expenseId
    const isEditing = !!expenseId;


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    return (
        <View>
            <Text>{isEditing ? 'Edit Expense Form' : 'Add New Expense Form'} - {expenseId}</Text>
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({});
