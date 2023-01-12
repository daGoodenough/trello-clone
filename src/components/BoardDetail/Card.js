import { useDrag } from 'react-dnd'
import { Pencil, Backspace } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { fetchCardDetails } from '../../helpers/fetchData'
import {storeCardDetails} from '../../actions'
import CardDetail from './CardDetail/CardDetail'


const Card = ({title, id, listId, description, workflow}) => {

  const [isHovering, setIsHovering] = useState(false)
  const [cardTitle, setCardTitle] = useState(title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [lengthOfComments, setLengthOfComments] = useState(0)
  
  const cardId = id
  
//  useEffect(()=>{
//     setLengthOfComments(cardDetails?.comments?.length)
//  },[])
   

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
        <div  ref={dragRef} style={{ opacity, display: isEditingTitle ? 'none' : 'block', }} onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)}>
          {cardTitle}
          </div>
          <div className='card-pencil'>
            <Pencil style={{display: isHovering ? 'inline-flex' : 'none',}} onClick={() => setIsEditingTitle(true)}/>
            </div>
            {/* <div>{lengthOfComments}</div> */}
            </div>
            <CardDetail isOpen={isOpen} setIsOpen={setIsOpen} cardId={cardId} workflow={workflow} isEditingDescription={isEditingDescription} setIsEditingDescription={setIsEditingDescription}/>
            <div className='card-title-editor' style={{display: isEditingTitle ? 'flex' : 'none',}}>
              <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}></input>
              <button className='btn btn-primary' onClick={() => setIsEditingTitle(false)}>Save</button>
              <Backspace className="close-title-editor" onClick={() => setIsEditingTitle(false)}/>
            </div>
            </div>
    );
  }

  
  export default Card;