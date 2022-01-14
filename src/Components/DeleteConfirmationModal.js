import { Button, Modal } from "react-bootstrap";
import { useBudgets } from "../Contexts/BudgetContext";
import { useTheme } from "../Contexts/ThemeContext";


export default function DeleteConfirmationModal({show, handleClose, id, openViewExpenseModal}){

    const {darkMode, setOutlineDarkMode} = useTheme();

    const {deleteBudget, getBudgetExpenses} = useBudgets();

    function onCancel(id){
        handleClose();
        if(getBudgetExpenses(id).lentgh > 0) openViewExpenseModal(id);
    }

    function onDelete(id){
        deleteBudget(id);
        handleClose();
    }

return(
    <>{id&&(
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header  className={(darkMode?'bg-dark text-light':'bg-white')}>
            <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body  className={(darkMode?'bg-dark text-light':'bg-white')}>
            <p>La suppression est irréversible</p>
            <p>Toutes les dépenses liées à ce budget seront perdues.</p>
            <div className='d-flex flex-column justify-content-center'>
                <Button variant='danger' className='mb-2' onClick={()=>onDelete(id)}>Valider la suppression</Button>
                <Button variant={setOutlineDarkMode('warning')} onClick={()=>onCancel(id)}>Annuler la suppression</Button>
            </div>
        </Modal.Body>
    </Modal>
    )}</>
)
}