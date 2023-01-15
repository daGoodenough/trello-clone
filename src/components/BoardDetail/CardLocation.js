import Card from './Card';
import {useDrop} from 'react-dnd'

function CardLocation ({index, cards, setCards, description, setIsPostingCardDetails, listId}){

    const [, drop] = useDrop({
        accept: 'card',
        drop: (card, monitor) => {
          const locationId = monitor
          const selected = card.title
          const nextCards = cards.map((i)=>{
            if(i.title===selected) return{
              ...i,
              listId: listId,
              order: index
            }
            else return i
          })
          setCards(nextCards)
        },
      })


return (
    <div ref={drop} className='card-location' id={index}>
    {cards.map((i) => {
      if (i.listId === listId && i.order === index) {
        return <Card key={i.id} title={i.title} id={i.id} listId={i.listId} description={i.description} workflow={description} comments={i.comments} setIsPostingCardDetails={setIsPostingCardDetails}/>
      }
      if(i.order === index){
      return <div className='empty-div'></div>
      }
    })}
  </div>
)
}

export default CardLocation