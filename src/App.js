import { useState } from "react";
import { Container, Stack, Button} from "react-bootstrap";
import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal";
import ViewExpensesModal from "./Components/ViewExpensesModal";
import DeleteConfirmationModal from "./Components/DeleteConfirmationModal";
import BudgetCard from "./Components/BudgetCard";
import MyGrid from "./Components/MyGrid";
import {useBudgets} from './Contexts/BudgetContext';
import {useTheme} from './Contexts/ThemeContext';

function App() {

  const {budgets, getBudgetExpenses} = useBudgets();

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewBudgetExpensesId, setViewBudgetExpensesId] = useState();
  const [deleteConfirmationId, setDeleteConfirmationId] = useState({});

  function openAddExpenseModal(budgetId){
    setAddExpenseModalBudgetId(budgetId)
    setShowAddExpenseModal(true)
  }

  function openViewExpenseModal(budgetId){
    setViewBudgetExpensesId(budgetId)
    setShowViewExpenseModal(true)
  }

  function openDeleteConfirmationModal(id){
    setShowViewExpenseModal(false)
    setDeleteConfirmationId(id)
    setShowDeleteConfirmationModal(true)
  }

  const {darkMode, setDarkMode} = useTheme();

  if(darkMode){
    document.body.classList.remove('bg-light');
    document.body.classList.add('bg-dark', 'text-light');
  }else{
    document.body.classList.remove('bg-dark', 'text-light');
    document.body.classList.add('bg-light');
  }

  return (
    <>
          <Container className='my-4'>
            <Stack direction='horizontal' gap='2' className="mb-2">
              <h1 className="me-auto">BUDGETS</h1>
              <Button size="sm" variant={darkMode?'outline-light':'outline-secondary'} onClick={()=>setDarkMode(!darkMode)}>{darkMode?'🌞':'🌙'}</Button>
            </Stack>
              {(budgets.length<0)&&(
                <>
                <Stack direction='horizontal' gap='2' className="mb-4 ">
                  <Button variant="primary" className='' onClick={()=>setShowAddBudgetModal(true)}>Ajouter un Budget</Button>
                  <Button variant="outline-primary" onClick={() => openAddExpenseModal()} >Ajouter une dépense</Button>
                </Stack>
                </>
              )}
            <MyGrid>
              {budgets.length>0?(
                <>
                {budgets.map(budget => {
                  const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total+expense.amount, 0)
                  return (
                    <BudgetCard
                    key={budget.id}
                    id={budget.id}
                    name={budget.name}
                    amount={amount}
                    max={budget.max}
                    onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
                    viewExpenseClick={()=>openViewExpenseModal(budget.id)}
                    onDeleteConfirmationModal={()=>openDeleteConfirmationModal(budget.id)}
                    />)
                })}
                <div className='d-flex' style={{gridColumn:'1 / -1'}}><Button className='mx-auto' variant="primary" onClick={()=>setShowAddBudgetModal(true)}> &#10010; </Button></div>
                </>
              ):(
                <div className='d-flex' style={{gridColumn:'1 / -1'}}><Button className='mx-auto' variant="primary" onClick={()=>setShowAddBudgetModal(true)}>Créer votre premier budget</Button></div>
              )}

            </MyGrid>
          
          </Container>
          <AddBudgetModal show={showAddBudgetModal} handleClose={()=>setShowAddBudgetModal(false)} />
          <AddExpenseModal show={showAddExpenseModal} handleClose={()=>setShowAddExpenseModal(false)} DefaultBudgetId={addExpenseModalBudgetId} />
          <ViewExpensesModal show={showViewExpenseModal} handleClose={()=>setShowViewExpenseModal(false)} ViewBudegetExpensesId={viewBudgetExpensesId} onAddExpenseClick={()=>openAddExpenseModal(viewBudgetExpensesId)} onDeleteConfirmationModal={()=>openDeleteConfirmationModal(viewBudgetExpensesId)}/>
          <DeleteConfirmationModal show={showDeleteConfirmationModal} handleClose={()=>setShowDeleteConfirmationModal(false)} id={deleteConfirmationId} openViewExpenseModal={openViewExpenseModal} />
    </>
  )
}

export default App;
