import React, {createContext, useContext, useState} from 'react';
import {v4 as uuidV4} from 'uuid';

const BudgetsContext = createContext();

export function useBudgets(){
    return useContext(BudgetsContext);
}

export const BudgetProvider = ({ children }) => {
  
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);;
    
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addBudget({name, max}){
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) return prevBudgets;
            return [...prevBudgets, {id: uuidV4(), name, max}]
        })
    } 

    function addExpense({description, amount, budgetId}){
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidV4(), description, amount, budgetId}]
        })
    }
    
    function deleteBudget(id){
        const expenses = getBudgetExpenses(id);
        expenses.forEach(expense => deleteExpense(expense.id))
        setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id))
    } 
    
    function deleteExpense(id){
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id))

    }

    return (
        <BudgetsContext.Provider
        value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addBudget, 
            addExpense,
            deleteBudget, 
            deleteExpense,
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}