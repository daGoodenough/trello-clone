import Card from './Card';
import { useEffect, useState } from 'react';
import { Backspace } from 'react-bootstrap-icons';
import {useDrop} from 'react-dnd'

function WorkflowList({title}) {
  const [workflow, setWorkflow] = useState('To Do')
  const [cards, setCards] = useState([{id: 1, title: 'butter', workflow: workflow},{id: 2, title: 'milk', workflow: workflow},{id: 3, title: 'eggs', workflow: workflow}])
  const [newCard, setNewCard] = useState({id: null, title: ''})
  const [isEditingCard, setIsEditingCard] = useState(false)

  useEffect(()=>{
    setCards([...cards, newCard])
  },[newCard])

  const handleAddCard =() =>{
    setIsEditingCard(false)
  }

  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (card) => {
      console.log(card.title, ' dropped!')
      setNewCard({id: 6, title: card.title, workflow: title})
    },
  })
  
    return (
      <div ref={drop} className="workflow-item" id={title}>
        <div className='workflow-wrapper'>
        <h5>{title}</h5>
        <ul className="list-ul">
        {cards.map((i) => {
          if (i.workflow === title){
            return <Card key={i.id} title={i.title} id={i.id}/>
        }})}
        </ul>
        </div>
        <div className="add-card-section" >
          <div className='add-card-btn' style={{display: isEditingCard ? 'none' : 'block'}} onClick={() => setIsEditingCard(true)}>+ Add a card</div>
          <div className='card-composer' style={{display: isEditingCard ? 'block' : 'none'}}>
          <input type="text" placeholder='Enter a title for this card' value={newCard} onChange={(e)=>setNewCard({id: cards.length+1, title: e.target.value})}></input>
          <button className='btn btn-primary'>Add card</button>
         <Backspace className="close-composer" onClick={() => setIsEditingCard(false)}/>
            </div>
          </div>
      </div>
    );
  }
  
  export default WorkflowList;