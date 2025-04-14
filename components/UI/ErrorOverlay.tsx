import { GlobalStyles } from 'constants/styles'
import { View, ActivityIndicator, Text } from 'react-native'
import Button from './Button'


type Props = {
    message: string,
    onConfirm: () => void
}

const ErrorOverlay = ({ message, onConfirm }: Props) => {



    return (
        <View className='flex-1 flex items-center justify-center bg-primary-300 gap-4'>
            <Text className='text-2xl text-center text-error-600 font-bold'>An error occured!</Text>
            <Text className='text-center text-error-500'>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay
