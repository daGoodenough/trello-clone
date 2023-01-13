import Card from './Card';
import { useEffect, useState } from 'react';
import { Backspace } from 'react-bootstrap-icons';
import {useDrop} from 'react-dnd'
import { postCard } from '../../helpers/postData'

function WorkflowList({description, id, cardItems}) {
  const [currentValue, setCurrentValue] = useState('')
  const [newCard, setNewCard] = useState('')
  const [isComposingCard, setIsComposingCard] = useState(false)

  useEffect(()=>{
    // postCard(id, newCard)
    setCurrentValue('')
    setIsComposingCard(false)
  },[newCard])

  
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (card) => {
      const selected = card
      console.log(selected)
      console.log(description)
      const nextCards = cardItems.map((i)=>{
        if(i.title===selected) return{
          ...i,
          listId: id
        }
        else return i
      })
      console.log('nextcards', nextCards)
      //api request to change cards to nextCards
    },
  })

    return (
      <div ref={drop} className="workflow-item">
        <div className='workflow-wrapper'>
        <h5>{description}</h5>
        <ul className="list-ul">
        {cardItems.map((i) => {
          if (i.listId === id){
            return <Card key={i.id} title={i.title} id={i.id} listId={i.listId} description={i.description} workflow={description} comments={i.comments}/>
        }})}
        </ul>
        </div>
        <div className="add-card-section" >
          <div className='add-card-btn' style={{display: isComposingCard ? 'none' : 'block'}} onClick={() => setIsComposingCard(true)}>+ Add a card</div>
          <div className='card-composer' style={{display: isComposingCard ? 'block' : 'none'}}>
          <input type="text" placeholder='Enter a title for this card' value={currentValue} onChange={(e)=> setCurrentValue(e.target.value)}></input>
          <button className='btn btn-primary' onClick={()=> setNewCard(currentValue)}>Add card</button>
         <Backspace className="close-composer" onClick={() => setIsComposingCard(false)}/>
            </div>
          </div>
      </div>
    );
  }
  
  export default WorkflowList;