import CardLocation from './CardLocation'
import { useDrag } from 'react-dnd'
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Backspace, Trash3Fill } from 'react-bootstrap-icons';
import { postCard } from '../../helpers/postData'
import { deleteList } from '../../helpers/deleteData'
import { addCard } from '../../actions';

function WorkflowList({ description, listOrder, id, setIsPostingCardDetails, setListId, boardId }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state?.boardDetails?.cards)
  const [newCard, setNewCard] = useState('')
  const [newCardOrder, setNewCardOrder] = useState(0)
  const [isComposingCard, setIsComposingCard] = useState(false)


  async function postNewCard() {
    try {
      // setIsPostingCardDetails(true)

      const numCardsInList = cards.reduce((count, card) => {
        if (card.listId === id) {count ++};
        return count;
      }, 0)
      console.log(numCardsInList)
      dispatch(addCard(id, newCard, boardId, numCardsInList))
      //use redux-thunk to first dispatch the created card, 
      //then make POST to api, then dispatch again

      await postCard(id, newCard, boardId, numCardsInList)
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setNewCard('')
      setIsComposingCard(false)
      // setIsPostingCardDetails(false)
    }
  }

  async function deleteThisList() {
    try {
      setIsPostingCardDetails(true)
      await deleteList(id)
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setIsPostingCardDetails(false)
      setListId('')
    }
  }



  // const emptyArr = []
  // for (let i = 0; i < cards?.length; i++) {
  //   emptyArr.push(i)
  //   // if(cards[i].listId===id) {
  //   //   setNewCardOrder(newCardOrder+1)
  //   // }
  // }

  // console.log(newCardOrder)


  //make list draggable
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'list',
      item: { id, description, listOrder },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  //  console.log('cards', cards)
  return (
    <div ref={dragRef} className="workflow-item">
      <div className='workflow-wrapper'>
        <h5>{description}</h5>
        <Trash3Fill onClick={() => deleteThisList()} className="icn delete-list-icn" />
        <ul className="list-ul" >
          {cards?.map((element, index) => {
            return <CardLocation index={index} listName={description} setIsPostingCardDetails={setIsPostingCardDetails} listId={id} />
          })}
        </ul>
      </div>
      <div className="add-card-section" >
        <div className='add-card-btn' style={{ display: isComposingCard ? 'none' : 'block' }} onClick={() => setIsComposingCard(true)}>+ Add a card</div>
        <div className='card-composer' style={{ display: isComposingCard ? 'block' : 'none' }}>
          <input type="text" placeholder='Enter a title for this card' value={newCard} onChange={(e) => setNewCard(e.target.value)}></input>
          <button className='btn btn-primary' onClick={() => postNewCard()}>Add card</button>
          <Backspace className="close-composer" onClick={() => setIsComposingCard(false)} />
        </div>
      </div>
    </div>
  );
}

export default WorkflowList;