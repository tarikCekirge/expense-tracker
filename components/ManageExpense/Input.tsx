import { GlobalStyles } from 'constants/styles'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'



type Props = {
    label: string,
    textInputConfig?: TextInputProps,
    invalid: boolean
}



const Input = ({ label, textInputConfig, invalid }: Props) => {
    return (
        <View className='px-1 my-2'>
            <Text className='text-xs text-primary-400 mb-1' style={invalid && styles.errorText}>{label}</Text>
            <TextInput className={`bg-primary-200 p-2 rounded-md text-lg text-primary-700 ${invalid ? 'bg-red-200' : 'bg-primary-200'} ${textInputConfig?.multiline ? 'min-h-24 align-top' : ''}`} {...textInputConfig} />
        </View>
    )
}

export default Input


const styles = StyleSheet.create({
    errorText: {
        color: GlobalStyles.colors.error[500]
    }
});