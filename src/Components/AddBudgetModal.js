import { Button, Form, Modal } from "react-bootstrap";
import {useRef} from 'react'
import { useBudgets } from "../Contexts/BudgetContext";
import { useTheme } from "../Contexts/ThemeContext";


export default function AddBudgetModal({show, handleClose}){

    const {darkMode, setOutlineDarkMode} = useTheme();
    
    const nameRef = useRef();
    const maxRef = useRef();

    const {addBudget} = useBudgets()

    function handleSubmit(e){
        e.preventDefault();
        addBudget({
            name:nameRef.current.value,
            max:parseFloat(maxRef.current.value),
        });
        handleClose(false);
    }

return(
    <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit} className={(darkMode?'bg-dark text-light':'bg-white')}>
            <Modal.Header>
                <Modal.Title>Nouveau Budget</Modal.Title>
                <Button variant={darkMode?'dark':'light'} onClick={handleClose} >&#9587;</Button>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control ref={nameRef} type='text' required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='max'>
                    <Form.Label>Montant du budget</Form.Label>
                    <Form.Control ref={maxRef} type='number' min={0} step={0.01} required />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant='primary' type='submit' >Ajouter</Button>
                    <Button variant={setOutlineDarkMode('warning')} onClick={handleClose} className='ms-2' >Annuler</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
)
}