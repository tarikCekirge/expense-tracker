import axios from "axios"
import { API_URL } from '@env';
import { Expense } from "types/expensesTypes";

export const storeExpense = async (  expenseData: Omit<Expense, 'id'> ): Promise<string> => {
    const response = await axios.post<{ name: string }>(
      `${API_URL}/expenses.json`,
      expenseData
    );
    return response.data.name;  
  };

  export const fetchExpenses = async (): Promise<Expense[]> => {
    const response = await axios.get<{ [key: string]: Omit<Expense, 'id'> }>(
      `${API_URL}/expenses.json`
    );
  
    const expenses: Expense[] = Object.keys(response.data).map((key) => ({
      id: key,
      ...response.data[key],
      date: new Date(response.data[key].date),  
    }));
    return expenses;
  };
  