import { useDrag } from 'react-dnd'
import { Pencil, Backspace, Chat, Trash3Fill } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import CardDetail from './CardDetail/CardDetail'
import { deleteCard } from '../../helpers/deleteData'
import { updateCard } from '../../helpers/postData'


const Card = ({order, setIsDeletingCard, title, cardId, listId, description, workflow, comments, setIsPostingCardDetails, isPostingCardDetails}) => {
  const [cardTitle, setCardTitle] = useState(title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [existsTitleToChange, setExistsTitleToChange] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [thisCardId, setThisCardId] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  //make card draggable
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'card',
      item:  {title, cardId, listId, description, order} ,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  useEffect(()=>{
    async function deleteData(){
      try {
      setIsDeletingCard(true)
      setIsDeleting(true)
      await deleteCard(thisCardId)
      }
      catch(e) {
        console.error(e)
      }
      finally{
        setIsDeletingCard(false)
        setIsDeleting(false)
      }
    }
    if(thisCardId.length<1) return
    deleteData()
  },[thisCardId])

  useEffect(()=>{
    async function postData(){
      try{
        setIsPostingCardDetails(true)
        await updateCard(cardId, cardTitle)
      }
      catch(e){
        console.error(e)
      }
      finally{
        setIsEditingTitle(false)
        setIsPostingCardDetails(false)
        setExistsTitleToChange(false)
      }
    }
    if(cardTitle.length<1) return
    if(!existsTitleToChange) return
    console.log('this got called')
    postData()
  },[existsTitleToChange])
 
  return (
      <div className="card-item"  ref={dragRef} style={{ opacity }}>
        <div style={{display: isEditingTitle ? 'none' : 'block',}}>
        <div className='open-card-detail-target' onClick={()=>setIsOpen(true)}>
        <div  >
          {cardTitle}
          </div>
            <Pencil onClick={(e) => {
              e.stopPropagation();
              setIsEditingTitle(true)}} className="icn edit-card-icn card-icn"/>
              <Trash3Fill onClick={(e)=>{
                e.stopPropagation();
                setThisCardId(cardId)}} className="icn delete-card-icn card-icn"/>
                {isDeleting && <div>Hold on!</div>}
            <div className='comments-length'><Chat/><span>{comments?.length}</span></div>
            </div>
            </div>
            <CardDetail comments={comments} isOpen={isOpen} setIsOpen={setIsOpen} cardId={cardId} workflow={workflow} isEditingDescription={isEditingDescription} setIsEditingDescription={setIsEditingDescription} setIsPostingCardDetails={setIsPostingCardDetails} isPostingCardDetails={isPostingCardDetails}/>
            <div className='card-title-editor' style={{display: isEditingTitle ? 'flex' : 'none',}}>
              <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}></input>
              <button className='btn btn-primary' onClick={() => setExistsTitleToChange(true)}>Save</button>
              <Backspace className="close-title-editor" onClick={() => setIsEditingTitle(false)}/>
            </div>
            </div>
    );
  }

  
  export default Card;