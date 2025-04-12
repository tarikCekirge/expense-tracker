import './global.css';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from 'screens/AllExpenses';
import RecentExpenses from 'screens/RecentExpenses';
import ManageExpense from 'screens/ManageExpense';
import { GlobalStyles } from 'constants/styles';
import { Ionicons } from '@expo/vector-icons'
import IconButton from 'components/UI/IconButton';
import ExpensesContextProvider from 'store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary[600],
      },
      headerTintColor: '#FFFFFF',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary[600],
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent[400],
      headerRight: ({ tintColor }) => <IconButton name='add' size={24} color={tintColor} onPress={() => { navigation.navigate('ManageExpense') }} />
    })} >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'Recent Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary[600],
            }
          }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal'//IOS
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
      <StatusBar style="auto" />
    </>
  );
}
