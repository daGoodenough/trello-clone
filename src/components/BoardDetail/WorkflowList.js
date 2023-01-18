import Card from './Card';
import CardLocation from './CardLocation'
import { useEffect, useState, useRef } from 'react';
import { useSelector  } from 'react-redux';
import { Backspace, Trash3Fill } from 'react-bootstrap-icons';
import { postCard } from '../../helpers/postData'
import { deleteList } from '../../helpers/deleteData'

function WorkflowList({setCardIsDeleting, description, id, setIsPostingCardDetails, setListId, boardId}) {
  const cards = useSelector((state) => state?.boardDetails?.cards)
  const [newCard, setNewCard] = useState('')
  const [newCardOrder, setNewCardOrder] = useState(0)
  const [isComposingCard, setIsComposingCard] = useState(false)


async function postNewCard(){
    try{
        setIsPostingCardDetails(true)
        await postCard(id, newCard, boardId)
      }
    catch(e){
        console.error(e)
      }
    finally{
      setNewCard('')
      setIsComposingCard(false)
      setIsPostingCardDetails(false)
      }
    }

async function deleteThisList(){
  try{
      setIsPostingCardDetails(true)
      await deleteList(id)
    }
  catch(e){
      console.error(e)
    }
  finally{
      setIsPostingCardDetails(false)
      setListId('')
    }
  }



  const emptyArr = []
  for (let i = 0; i < cards?.length; i++) {
    emptyArr.push(i)
    if(cards[i].listId===id) {
      setNewCardOrder(newCardOrder+1)
    }
  }

  console.log(newCardOrder)

 
    return (
      <div className="workflow-item">
        <div className='workflow-wrapper'>
        <h5>{description}</h5>
        <Trash3Fill onClick={()=>deleteThisList()} className="icn delete-list-icn"/>
        <ul className="list-ul" >
  {emptyArr.map(index => (
    <CardLocation setCardIsDeleting={setCardIsDeleting} index={index} listName={description} setIsPostingCardDetails={setIsPostingCardDetails} listId={id}/>))}
</ul>
        </div>
        <div className="add-card-section" >
          <div className='add-card-btn' style={{display: isComposingCard ? 'none' : 'block'}} onClick={() => setIsComposingCard(true)}>+ Add a card</div>
          <div className='card-composer' style={{display: isComposingCard ? 'block' : 'none'}}>
          <input type="text" placeholder='Enter a title for this card' value={newCard} onChange={(e)=> setNewCard(e.target.value)}></input>
          <button className='btn btn-primary' onClick={()=> postNewCard()}>Add card</button>
         <Backspace className="close-composer" onClick={() => setIsComposingCard(false)}/>
            </div>
          </div>
      </div>
    );
  }
  
  export default WorkflowList;