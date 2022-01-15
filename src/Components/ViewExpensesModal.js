import React from 'react';
import { Button, Modal } from "react-bootstrap";
import { useBudgets } from "../Contexts/BudgetContext";
import { currencyFormatter } from "../utils";
import { useTheme } from "../Contexts/ThemeContext";


export default function ViewExpensesModal({show, handleClose, ViewBudegetExpensesId, onAddExpenseClick, onDeleteConfirmationModal}){

    const {darkMode, setOutlineDarkMode} = useTheme();

    const {budgets, getBudgetExpenses, deleteExpense} = useBudgets();

    const budget = budgets.find(budget => budget.id === ViewBudegetExpensesId);
    const expenses = getBudgetExpenses(ViewBudegetExpensesId);

return(
    <>{budget&&(
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className={(darkMode?'bg-dark text-light':'bg-white')}>
            <Modal.Title>{budget.name}</Modal.Title>
            <Button variant={darkMode?'dark':'light'} onClick={handleClose} >&#9587;</Button>
        </Modal.Header>
        <Modal.Body className={(darkMode?'bg-dark text-light':'bg-white')}>

        <div className="d-flex flex-column justify-content-between">
            {expenses.map(expense => (
                <>
                <div key={'exp'+budget.id+expense.id} className="d-flex flex-row justify-content-between align-items-center mb-2">
                <span key={'desc'+budget.id+expense.id}>{expense.description} - {currencyFormatter.format(expense.amount)}</span>
                <Button size="sm" key={'delete'+budget.id+expense.id} variant={setOutlineDarkMode('warning')} onClick={() => deleteExpense(expense.id)}>&#10799;</Button>
                </div>
                </>
            ))}
        </div>
        
            <div className='d-flex flex-column justify-content-center'>
                <Button variant={setOutlineDarkMode('primary')} className='mb-2' onClick={()=>onAddExpenseClick()}>Ajouter une dépense</Button>
                <Button variant='danger' onClick={()=>onDeleteConfirmationModal(budget.id)}>Supprimer ce budget</Button>
                </div>
        </Modal.Body>
    </Modal>
    )}</>
)
}