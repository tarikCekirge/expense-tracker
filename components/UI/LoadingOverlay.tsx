import { GlobalStyles } from 'constants/styles'
import { View, ActivityIndicator } from 'react-native'

const LoadingOverlay = () => {
    return (
        <View className='flex-1 flex items-center justify-center bg-primary-300'>
            <ActivityIndicator size={'large'} color={GlobalStyles.colors.primary[600]} />
        </View>
    )
}

export default LoadingOverlay
