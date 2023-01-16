import Card from './Card';
import CardLocation from './CardLocation'
import { useEffect, useState, useRef } from 'react';
import { Backspace, Trash3Fill } from 'react-bootstrap-icons';
import {useDrop} from 'react-dnd'
import { postCard } from '../../helpers/postData'

function WorkflowList({setCards, setCardIsDeleting, cards, description, id, cardItems, setIsPostingCardDetails, setListExists, setListId}) {
  const [currentValue, setCurrentValue] = useState('')
  const [newCard, setNewCard] = useState('')
  const [isComposingCard, setIsComposingCard] = useState(false)
  const locationRef = useRef(null);


  useEffect(()=>{
    async function postData(){
      try{
        setIsPostingCardDetails(true)
        await postCard(id, newCard)
      }
      catch(e){
        console.error(e)
      }
      finally{
      setCurrentValue('')
      setIsComposingCard(false)
      setIsPostingCardDetails(false)
      }
    }
    if(newCard?.length<1) return
    postData()
  },[newCard])

  

  const emptyArr = []
  for (let i = 0; i < cards.length; i++) {
    emptyArr.push(i)
  }

 
    return (
      <div className="workflow-item">
        <div className='workflow-wrapper'>
        <h5>{description}</h5>
        <Trash3Fill onClick={()=>setListId(id)} className="icn delete-list-icn"/>
        <ul className="list-ul" >
  {emptyArr.map(index => (
    <CardLocation setCardIsDeleting={setCardIsDeleting} index={index} setCards={setCards} cards={cards} listName={description} setIsPostingCardDetails={setIsPostingCardDetails} listId={id}/>))}
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