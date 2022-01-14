import { Card, ProgressBar, Stack, Button, Badge } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { useTheme } from "../Contexts/ThemeContext";
import { useBudgets } from "../Contexts/BudgetContext";


export default function BudgetCard(props){

    const {darkMode, setOutlineDarkMode} = useTheme();
    const {deleteBudget} = useBudgets();
    const {id, name, amount, max, onAddExpenseClick, viewExpenseClick, onDeleteConfirmationModal} = props;
    const ratio = amount / max;

    const budgetLeft = currencyFormatter.format(max - amount);

    function bgColorPicker(){
        if(ratio<.5) return 'success';
        if(ratio<.75) return 'danger';
        return 'warning';
    }
    
    return(
        <Card className={(amount > max) ? 'bg-danger bg-opacity-10' : (darkMode?'bg-dark text-light':'bg-white')} >
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>

                    <div className='me-2'>{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}<span className='text-muted fs-6 ms-1'> / {currencyFormatter.format(max)}</span>
                    </div>

                </Card.Title>
                <ProgressBar className="rounded-pill" variant={bgColorPicker()} min={0} max={max} now={amount} label={(ratio>=.1)&&Math.floor(ratio*100) + '%'}></ProgressBar>
                
                <div className="mt-2">
                    {(amount < max) ? (
                        (amount===0)?(
                            <p>Votre budget est <Badge pill bg={'success'}>intacte 👍</Badge>.</p>
                        ):(
                            <p>Il vous reste <Badge pill bg={bgColorPicker()}>{budgetLeft}</Badge> de budget.</p>
                        )
                    ):(
                        <p>Vous avez dépassé votre budget !</p>

                    )}
                </div>

                <Stack direction='vertical' gap='2' className="mt-4">
                    <Button variant={setOutlineDarkMode('primary')} onClick={onAddExpenseClick} >Ajouter une dépense</Button>
                    {amount === 0? (
                        <Button variant={setOutlineDarkMode('danger')} onClick={()=>onDeleteConfirmationModal(id)}>Supprimer ce budget</Button>
                    ):(
                        <Button variant={setOutlineDarkMode('secondary')} active={false} onClick={viewExpenseClick}>Modifier le budget</Button>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    )
}