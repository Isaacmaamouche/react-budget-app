import React from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import {useRef} from 'react'
import { useBudgets } from "../Contexts/BudgetContext";
import { useTheme } from "../Contexts/ThemeContext";


export default function AddExpenseModal({show, handleClose, DefaultBudgetId}){

    const {darkMode, setOutlineDarkMode} = useTheme();

    const descriptionRef = useRef();
    const amountRef = useRef();
    const idRef = useRef()

    const {budgets, addExpense} = useBudgets()

    function handleSubmit(e){
        e.preventDefault();
    
        addExpense({
            description:descriptionRef.current.value,
            amount:parseFloat(amountRef.current.value),
            budgetId:idRef.current.value
        });
        handleClose(false);
    }

return(
    <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit} className={(darkMode?'bg-dark text-light':'bg-white')}>
            <Modal.Header>
                <Modal.Title>Ajouter une dépense</Modal.Title>
                <Button variant={darkMode?'dark':'light'} onClick={handleClose} >&#9587;</Button>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type='text' required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='amount'>
                    <Form.Label>Montant de la dépense</Form.Label>
                    <Form.Control ref={amountRef} type='number' min={0} step={0.01} required />
                </Form.Group>

                
                {DefaultBudgetId?(
                <Form.Group className='mb-3' controlId='budgetId' hidden>
                    <Form.Label>Budget</Form.Label>
                    <Form.Select ref={idRef} defaultValue={DefaultBudgetId} required >                        
                    {budgets.map(budget => (
                        <option key={budget.id} value={budget.id} >{budget.name}</option>
                    ))}
                    </Form.Select>
                </Form.Group>
                ):(
                <Form.Group className='mb-3' controlId='budgetId'>
                    <Form.Label>Budget</Form.Label>
                    <Form.Select ref={idRef} defaultValue={DefaultBudgetId} required >                        
                    {budgets.map(budget => (
                        <option key={budget.id} value={budget.id} >{budget.name}</option>
                    ))}
                    </Form.Select>
                </Form.Group>
                )}

                <div className="d-flex justify-content-end">
                    <Button variant='primary' type='submit' >Ajouter</Button>
                    <Button variant={setOutlineDarkMode('warning')} onClick={handleClose} className='ms-2' >Annuler</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
)
}