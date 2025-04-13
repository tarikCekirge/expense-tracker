import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import { useState } from 'react'
import Button from 'components/UI/Button'
import { GlobalStyles } from 'constants/styles'
import IconButton from 'components/UI/IconButton'

type FormValues = {
    amount: string
    date: string
    description: string
}

type Props = {
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

const initialValues: FormValues = {
    amount: '',
    date: '',
    description: '',
}

const ExpenseForm = ({ onCancel, onSubmit, onDelete, submitButtonLabel, isEditing }: Props) => {
    const [inputValues, setInputValues] = useState<FormValues>(initialValues)

    const inputChangedHandler = (
        inputIdentifier: keyof FormValues,
        enteredValue: string
    ) => {
        setInputValues((currentValues) => ({
            ...currentValues,
            [inputIdentifier]: enteredValue,
        }))
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        };

        onSubmit(expenseData);
    };

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
                            value: inputValues.amount,
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
                            value: inputValues.date,
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
                    value: inputValues.description,
                }}
            />
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