import { useDrag } from 'react-dnd'
import { Pencil, Backspace, Chat } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import CardDetail from './CardDetail/CardDetail'


const Card = ({title, id, listId, description, workflow, comments}) => {
  const [cardTitle, setCardTitle] = useState(title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const cardId = id
  
  //make card draggable
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "card",
      item:  {title, id, listId, description} ,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )


 
  return (
      <div className="card-item">
        <div className='open-card-detail-target' onClick={()=>setIsOpen(true)}>
        <div  ref={dragRef} style={{ opacity, display: isEditingTitle ? 'none' : 'block', }} >
          {cardTitle}
          </div>
          <div className='card-pencil'>
            <Pencil onClick={(e) => {
              e.stopPropagation();
              setIsEditingTitle(true)}}/>
            </div>
            <div className='comments-length'><Chat/><span>{comments?.length}</span></div>
            </div>
            <CardDetail comments={comments} isOpen={isOpen} setIsOpen={setIsOpen} cardId={cardId} workflow={workflow} isEditingDescription={isEditingDescription} setIsEditingDescription={setIsEditingDescription}/>
            <div className='card-title-editor' style={{display: isEditingTitle ? 'flex' : 'none',}}>
              <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}></input>
              <button className='btn btn-primary' onClick={() => setIsEditingTitle(false)}>Save</button>
              <Backspace className="close-title-editor" onClick={() => setIsEditingTitle(false)}/>
            </div>
            </div>
    );
  }

  
  export default Card;