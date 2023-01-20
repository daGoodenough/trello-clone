import { useDrag } from 'react-dnd'
import { Pencil, Backspace, Chat, Trash3Fill } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CardDetail from './CardDetail/CardDetail'
import { deleteCard } from '../../actions/delete-actions'
import { updateCard } from '../../helpers/postData'
import { ThreeDots } from 'react-loader-spinner'


const Card = ({ order, title, cardId, listId, description, listName, setIsPostingCardDetails }) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState(title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [existsTitleToChange, setExistsTitleToChange] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [thisCardId, setThisCardId] = useState('')

  //make card draggable
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'card',
      item: { title, cardId, listId, description, order },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  // DELETE card
  const handleCardDelete = () => {
    try {
      setIsPostingCardDetails(true)
      setIsDeleting(true)
      dispatch(deleteCard(cardId, order));
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setIsPostingCardDetails(false)
      setIsDeleting(false)
    }
  }

  //UPDATE card title
  useEffect(() => {
    async function postData() {
      try {
        setIsPostingCardDetails(true)
        setIsUpdating(true)
        await updateCard(cardId, cardTitle)
      }
      catch (e) {
        console.error(e)
      }
      finally {
        setIsEditingTitle(false)
        setIsUpdating(false)
        setIsPostingCardDetails(false)
        setExistsTitleToChange(false)
      }
    }
    if (cardTitle.length < 1) return
    if (!existsTitleToChange) return
    postData()
  }, [existsTitleToChange])


  return (
    <div className="card-item" ref={dragRef} style={{ opacity }}>
      <div style={{ display: isEditingTitle ? 'none' : 'block', }}>
        <div className='open-card-detail-target' onClick={() => setIsOpen(true)}>
          <div  >
            {cardTitle}
          </div>
          {isDeleting || isUpdating ? null : <div>
            <Pencil onClick={(e) => {
              e.stopPropagation();
              setIsEditingTitle(true)
            }} className="icn edit-card-icn card-icn" />
            <Trash3Fill onClick={(e) => {
              e.stopPropagation();
              handleCardDelete()
            }} className="icn delete-card-icn card-icn" />
          </div>}
          {isDeleting || isUpdating ? <div className='loader'><ThreeDots color="black" /></div> : null}
          <div className='comments-length'><Chat /><span></span></div>
        </div>
      </div>
      <CardDetail isOpen={isOpen} setIsOpen={setIsOpen} cardId={cardId} listName={listName} />
      <div className='card-title-editor' style={{ display: isEditingTitle ? 'flex' : 'none', }}>
        <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}></input>
        <button className='btn btn-primary' onClick={() => setExistsTitleToChange(true)}>Save</button>
        <Backspace className="close-title-editor" onClick={() => setIsEditingTitle(false)} />
      </div>
    </div>
  );
}


export default Card;