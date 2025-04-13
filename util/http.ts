import axios from "axios"
import { API_URL } from '@env';
import { Expense } from "types/expensesTypes";

export const storeExpense =(expenseData:Omit<Expense, 'id'>)=>{
    axios.post(API_URL+'/expenses.json',expenseData)
}