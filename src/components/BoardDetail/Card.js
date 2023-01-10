import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'

const Card = ({item}) => {

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { item },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
        <li className="card-item" ref={dragRef} style={{ opacity }}>{item}</li>
    );
  }

  
  export default Card;