import React, { createContext, useReducer, ReactNode } from 'react';
import { Expense } from 'types/expensesTypes';

const DUMMY_EXPENSES: Expense[] = [
  { id: 'e1', description: 'Groceries', amount: 42.75, date: new Date('2025-04-01') },
  { id: 'e2', description: 'Coffee', amount: 4.2, date: new Date('2025-04-02') },
  { id: 'e3', description: 'Bus Ticket', amount: 2.5, date: new Date('2025-04-02') },
  { id: 'e4', description: 'Netflix Subscription', amount: 9.99, date: new Date('2025-04-03') },
  { id: 'e5', description: 'Gym Membership', amount: 30.0, date: new Date('2025-04-03') },
  { id: 'e6', description: 'Dinner', amount: 28.4, date: new Date('2025-04-03') },
  { id: 'e7', description: 'Taxi', amount: 16.7, date: new Date('2025-04-04') },
  { id: 'e8', description: 'Books', amount: 23.99, date: new Date('2025-04-04') },
  { id: 'e9', description: 'Snacks', amount: 6.8, date: new Date('2025-04-04') },
  { id: 'e10', description: 'Parking Fee', amount: 5.0, date: new Date('2025-04-05') },
  { id: 'e11', description: 'Groceries', amount: 53.1, date: new Date('2025-04-05') },
  { id: 'e12', description: 'Lunch', amount: 12.99, date: new Date('2025-04-05') },
  { id: 'e13', description: 'Spotify', amount: 10.99, date: new Date('2025-04-06') },
  { id: 'e14', description: 'Mobile Recharge', amount: 20.0, date: new Date('2025-04-06') },
  { id: 'e15', description: 'Laundry', amount: 7.25, date: new Date('2025-04-06') },
  { id: 'e16', description: 'Cinema', amount: 14.0, date: new Date('2025-04-07') },
  { id: 'e17', description: 'Shoes', amount: 65.0, date: new Date('2025-04-07') },
  { id: 'e18', description: 'Cafe', amount: 9.0, date: new Date('2025-04-08') },
  { id: 'e19', description: 'Pet Food', amount: 18.75, date: new Date('2025-04-08') },
  { id: 'e20', description: 'Dinner', amount: 31.5, date: new Date('2025-04-08') },
  { id: 'e21', description: 'Bus Pass', amount: 45.0, date: new Date('2025-04-09') },
  { id: 'e22', description: 'Snacks', amount: 3.6, date: new Date('2025-04-09') },
  { id: 'e23', description: 'Groceries', amount: 38.9, date: new Date('2025-04-10') },
  { id: 'e24', description: 'Gas', amount: 50.0, date: new Date('2025-04-10') },
  { id: 'e25', description: 'Fast Food', amount: 13.4, date: new Date('2025-04-10') },
  { id: 'e26', description: 'Medicine', amount: 22.0, date: new Date('2025-04-11') },
  { id: 'e27', description: 'Uber', amount: 17.25, date: new Date('2025-04-11') },
  { id: 'e28', description: 'Clothes', amount: 74.99, date: new Date('2025-04-12') },
  { id: 'e29', description: 'Lunch', amount: 11.99, date: new Date('2025-04-12') },
  { id: 'e30', description: 'Snacks', amount: 5.5, date: new Date('2025-04-13') },
  { id: 'e31', description: 'Books', amount: 19.99, date: new Date('2025-04-13') },
  { id: 'e32', description: 'Gift', amount: 40.0, date: new Date('2025-04-13') },
  { id: 'e33', description: 'Groceries', amount: 60.25, date: new Date('2025-04-14') },
  { id: 'e34', description: 'Train Ticket', amount: 25.0, date: new Date('2025-04-14') },
  { id: 'e35', description: 'Dinner', amount: 26.3, date: new Date('2025-04-14') },
  { id: 'e36', description: 'Phone Accessories', amount: 15.0, date: new Date('2025-04-15') },
  { id: 'e37', description: 'Ice Cream', amount: 3.75, date: new Date('2025-04-15') },
  { id: 'e38', description: 'Pet Care', amount: 29.5, date: new Date('2025-04-16') },
  { id: 'e39', description: 'Laptop Bag', amount: 45.0, date: new Date('2025-04-16') },
  { id: 'e40', description: 'Breakfast', amount: 8.6, date: new Date('2025-04-16') },
];

// ---------- TYPES ----------
type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expenseData: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: Omit<Expense, 'id'>) => void;
};

type ExpensesAction =
  | { type: 'ADD'; payload: Omit<Expense, 'id'> }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'UPDATE'; payload: { id: string; data: Omit<Expense, 'id'> } };

type ExpensesProviderProps = {
  children: ReactNode;
};

// ---------- REDUCER ----------
function expensesReducer(state: Expense[], action: ExpensesAction): Expense[] {
  switch (action.type) {
    case 'ADD':
      const newExpense: Expense = {
        id: Math.random().toString(),
        ...action.payload,
      };
      return [newExpense, ...state];

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload.id);

    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );

    default:
      return state;
  }
}

// ---------- CONTEXT ----------
export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => { },
  deleteExpense: () => { },
  updateExpense: () => { },
});

// ---------- PROVIDER ----------
const ExpensesContextProvider = ({ children }: ExpensesProviderProps) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const updateExpense = (id: string, expenseData: Omit<Expense, 'id'>) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  };

  const value: ExpensesContextType = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
