import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'
import { Pencil, Backspace } from 'react-bootstrap-icons'
import { useState } from 'react'

const Card = ({title}) => {

  const [isHovering, setIsHovering] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { title },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
      <div className="card-item">
        <div  ref={dragRef} style={{ opacity, display: isEditingTitle ? 'none' : 'block', }} onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)}>
          {title}
          <div className='card-pencil'>
            <Pencil style={{display: isHovering ? 'inline-flex' : 'none',}} onClick={() => setIsEditingTitle(true)}/>
            </div>
            </div>
            <div className='card-title-editor' style={{display: isEditingTitle ? 'flex' : 'none',}}>
              <input type="text" value={title}></input>
              <button className='btn btn-primary'>Save</button>
              <Backspace className="close-title-editor" onClick={() => setIsEditingTitle(false)}/>
            </div>
            </div>
    );
  }

  
  export default Card;