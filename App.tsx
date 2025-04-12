import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import './global.css';
import AllExpenses from 'screens/AllExpenses';
import RecentExpenses from 'screens/RecentExpenses';
import ManageExpense from 'screens/ManageExpense';
import { GlobalStyles } from 'constants/styles';
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary[600],
      },
      headerTintColor: '#FFFFFF',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary[600],
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent[400]
    }} >
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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{ title: 'Manage Expense' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
