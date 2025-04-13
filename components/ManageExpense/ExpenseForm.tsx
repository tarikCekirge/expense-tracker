import { StyleSheet, Text, View, Alert } from 'react-native'
import Input from './Input'
import { useState } from 'react'
import Button from 'components/UI/Button'
import { GlobalStyles } from 'constants/styles'
import IconButton from 'components/UI/IconButton'
import { Expense } from 'types/expensesTypes'

type FormValues = {
    amount: {
        value: string;
        isValid: boolean;
    };
    date: {
        value: string;
        isValid: boolean;
    };
    description: {
        value: string;
        isValid: boolean;
    };
};

type Props = {
    defaultValues?: Expense;
    onCancel: () => void;
    onSubmit: (expenseData: {
        amount: number;
        date: Date;
        description: string;
    }) => void;
    onDelete: () => void;
    submitButtonLabel: string;
    isEditing: boolean;
};




const ExpenseForm = ({ defaultValues, onCancel, onSubmit, onDelete, submitButtonLabel, isEditing }: Props) => {

    const initialValues: FormValues = {
        amount: {
            value: defaultValues?.amount?.toString() ?? '',
            isValid: true
        },
        date: {
            value: defaultValues?.date?.toISOString().split('T')[0] ?? '',
            isValid: true
        },
        description: {
            value: defaultValues?.description ?? '',
            isValid: true
        }
    };
    const [inputs, setInputs] = useState<FormValues>(initialValues)

    const inputChangedHandler = (
        inputIdentifier: keyof FormValues,
        enteredValue: string
    ) => {
        setInputs((curInputs) => ({
            ...curInputs,
            [inputIdentifier]: { value: enteredValue, isValid: true },
        }))
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currentValues) => ({
                amount: { value: currentValues.amount.value, isValid: amountIsValid },
                date: { value: currentValues.date.value, isValid: dateIsValid },
                description: { value: currentValues.description.value, isValid: descriptionIsValid },
            }));
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        }

        onSubmit(expenseData);
    };

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
    return (
        <View>
            <Text className="text-center text-xl font-bold text-primary-700 mt-4">
                Your Expense
            </Text>
            <View className="flex flex-row gap-4">
                <View className="flex-1">
                    <Input
                        label="Amount"
                        textInputConfig={{
                            keyboardType: 'decimal-pad',
                            onChangeText: (text) => inputChangedHandler('amount', text),
                            value: inputs.amount.value,
                        }}
                    />
                </View>
                <View className="flex-1">
                    <Input
                        label="Date"
                        textInputConfig={{
                            placeholder: 'YYYY-MM-DD',
                            maxLength: 10,
                            onChangeText: (text) => inputChangedHandler('date', text),
                            value: inputs.date.value,
                        }}
                    />
                </View>
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                    autoCapitalize: 'sentences',
                    onChangeText: (text) => inputChangedHandler('description', text),
                    value: inputs.description.value,
                }}
            />
            {formIsValid && <View className='bg-error-500 border border-error-700 my-2 p-3 rounded'><Text className='text-center text-white'>Invalid input Values - please check your entered</Text></View>}
            <View>
                <View className='flex flex-row p-2'>
                    <Button className='flex-1' mode='flat' onPress={onCancel}>Cancel</Button>
                    <Button className='flex-1' onPress={submitHandler}>{submitButtonLabel}</Button>
                </View>
                {isEditing && <View style={styles.deleteContainer}><IconButton name='trash' color={GlobalStyles.colors.error[600]} size={24} onPress={onDelete} /></View>}
            </View>
        </View>
    )
}

export default ExpenseForm


const styles = StyleSheet.create({
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary[600],
        alignItems: 'center'
    },
});