import axios from "axios"
import { API_URL } from '@env';
import { Expense } from "types/expensesTypes";

export const storeExpense = async (  expenseData: Omit<Expense, 'id'> ): Promise<string> => {
    const response = await axios.post<{ name: string }>(
      `${API_URL}/expenses.json`,
      expenseData
    );

    const id  = response.data.name
    return id;  
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
  

  export const updateExpense = async ( id: string,  expenseData: Omit<Expense, 'id'> ): Promise<Expense> => {
    await axios.put(`${API_URL}/expenses/${id}.json`, expenseData);
    return { id, ...expenseData };
  };
  

  export const deleteExpense = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/expenses/${id}.json`);
  };