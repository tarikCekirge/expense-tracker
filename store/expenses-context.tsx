import React, { createContext, useReducer, ReactNode } from 'react';
import { Expense } from 'types/expensesTypes';

// ---------- TYPES ----------
type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expenseData: Omit<Expense, 'id'>) => void;
  setExpenses: (expenses: Expense[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: Omit<Expense, 'id'>) => void;
};

type ExpensesAction =
  | { type: 'ADD'; payload: Omit<Expense, 'id'> }
  | { type: 'SET'; payload: Expense[] }
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
    case 'SET':
      return action.payload;
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
  setExpenses: () => { },
  deleteExpense: () => { },
  updateExpense: () => { },
});

// ---------- PROVIDER ----------
const ExpensesContextProvider = ({ children }: ExpensesProviderProps) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: 'SET', payload: expenses });
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
    setExpenses,
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
