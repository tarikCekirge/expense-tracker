import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'



type Props = {
    label: string,
    textInputConfig?: TextInputProps;
}



const Input = ({ label, textInputConfig }: Props) => {
    return (
        <View className='px-1 my-2'>
            <Text className='text-xs text-primary-400 mb-1'>{label}</Text>
            <TextInput className={`bg-primary-200 p-2 rounded-md text-lg text-primary-700 ${textInputConfig?.multiline ? 'min-h-24 text-top' : ''}`} {...textInputConfig} />
        </View>
    )
}

export default Input
