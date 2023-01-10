import { useDrag } from 'react-dnd'
import { Pencil, Backspace } from 'react-bootstrap-icons'
import { useState } from 'react'

const Card = ({title, id}) => {

  const [isHovering, setIsHovering] = useState(false)
  const [cardTitle, setCardTitle] = useState(title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "card",
      item:  {title, id} ,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
      <div className="card-item">
        <div  ref={dragRef} style={{ opacity, display: isEditingTitle ? 'none' : 'block', }} onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)}>
          {cardTitle}
          <div className='card-pencil'>
            <Pencil style={{display: isHovering ? 'inline-flex' : 'none',}} onClick={() => setIsEditingTitle(true)}/>
            </div>
            </div>
            <div className='card-title-editor' style={{display: isEditingTitle ? 'flex' : 'none',}}>
              <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}></input>
              <button className='btn btn-primary' onClick={() => setIsEditingTitle(false)}>Save</button>
              <Backspace className="close-title-editor" onClick={() => setIsEditingTitle(false)}/>
            </div>
            </div>
    );
  }

  
  export default Card;