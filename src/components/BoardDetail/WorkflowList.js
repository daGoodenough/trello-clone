import Card from './Card';
import { useEffect, useState } from 'react';
import { Backspace } from 'react-bootstrap-icons';
import {useDrop} from 'react-dnd'

function WorkflowList({title}) {
  const [workflow, setWorkflow] = useState('To Do')
  const [currentValue, setCurrentValue] = useState('')
  const [cards, setCards] = useState([{id: 1, title: 'butter', workflow: workflow},{id: 2, title: 'milk', workflow: workflow},{id: 3, title: 'eggs', workflow: workflow}])
  const [newCard, setNewCard] = useState({id: null, title: ''})
  const [isComposingCard, setIsComposingCard] = useState(false)
  

  useEffect(()=>{
    setCards([...cards, newCard])
    setCurrentValue('')
    setIsComposingCard(false)
  },[newCard])


  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (card) => {
      console.log(card.title, ' dropped!')
      const selected = card.title
      console.log(selected)
      const nextCards = cards.map((i)=>{
        if(i.title===selected) return{
          ...i,
          workflow: title
        }
        else return i
      })
      setCards(nextCards)
    },
  })
  
    return (
      <div ref={drop} className="workflow-item">
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
          <div className='add-card-btn' style={{display: isComposingCard ? 'none' : 'block'}} onClick={() => setIsComposingCard(true)}>+ Add a card</div>
          <div className='card-composer' style={{display: isComposingCard ? 'block' : 'none'}}>
          <input type="text" placeholder='Enter a title for this card' value={currentValue} onChange={(e)=> setCurrentValue(e.target.value)}></input>
          <button className='btn btn-primary' onClick={()=> setNewCard({id: cards.length+1, title: currentValue, workflow: title})}>Add card</button>
         <Backspace className="close-composer" onClick={() => setIsComposingCard(false)}/>
            </div>
          </div>
      </div>
    );
  }
  
  export default WorkflowList;