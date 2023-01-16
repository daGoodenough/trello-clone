import { useDrag } from 'react-dnd'
import { Pencil, Backspace, Chat, Trash3Fill } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import CardDetail from './CardDetail/CardDetail'
import { deleteCard } from '../../helpers/deleteData'


const Card = ({order, title, id, listId, description, workflow, comments, setIsPostingCardDetails, isPostingCardDetails}) => {
  const [cardTitle, setCardTitle] = useState(title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [thisCardId, setThisCardId] = useState('')
  const cardId = id
  
  //make card draggable
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'card',
      item:  {title, id, listId, description, order} ,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )


  useEffect(()=>{
    async function deleteData(){
      try {
      setIsPostingCardDetails(true)
       await deleteCard(thisCardId)
      }
      catch(e) {
        console.error(e)
      }
      finally{
        setIsPostingCardDetails(false)
      }
    }
    if(thisCardId.length<1) return
    deleteData()
  },[thisCardId])
 
  return (
      <div className="card-item"  ref={dragRef} style={{ opacity, display: isEditingTitle ? 'none' : 'block', }}>
        <div className='open-card-detail-target' onClick={()=>setIsOpen(true)}>
        <div  >
          {cardTitle}
          </div>
          <div className='card-icn'>
            <Pencil onClick={(e) => {
              e.stopPropagation();
              setIsEditingTitle(true)}} className="icn edit-card-icn"/>
              <Trash3Fill onClick={(e)=>{
                e.stopPropagation();
                setThisCardId(cardId)}} className="icn delete-card-icn"/>
            </div>
            <div className='comments-length'><Chat/><span>{comments?.length}</span></div>
            </div>
            <CardDetail comments={comments} isOpen={isOpen} setIsOpen={setIsOpen} cardId={cardId} workflow={workflow} isEditingDescription={isEditingDescription} setIsEditingDescription={setIsEditingDescription} setIsPostingCardDetails={setIsPostingCardDetails} isPostingCardDetails={isPostingCardDetails}/>
            <div className='card-title-editor' style={{display: isEditingTitle ? 'flex' : 'none',}}>
              <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}></input>
              <button className='btn btn-primary' onClick={() => setIsEditingTitle(false)}>Save</button>
              <Backspace className="close-title-editor" onClick={() => setIsEditingTitle(false)}/>
            </div>
            </div>
    );
  }

  
  export default Card;