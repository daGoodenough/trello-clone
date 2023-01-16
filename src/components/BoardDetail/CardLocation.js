import Card from './Card';
import {useDrop} from 'react-dnd'

function CardLocation ({setCardIsDeleting, index, cards, setCards, description, setIsPostingCardDetails, listId, listName}){

    const [, drop] = useDrop({
        accept: 'card',
        drop: (card) => {
          const selected = card.title
          const fromListId = card.listId
          const fromOrder = card.order
          const nextCards = cards.map((i)=>{
            if(i.title === selected){
                return {
                    ...i,
                    listId: listId,
                    order: index
                }
            }
            else if(listId===fromListId && i.title !== selected){
                if(i.order>index){
                    if(i.order>fromOrder) return i
                    if(i.order<fromOrder) return {...i, order: i.order+1}
                }
                if(i.order<index) {
                   if(i.order<fromOrder) return i
                   if(i.order>fromOrder) return {...i, order: i.order-1}
                }
                if(i.order===index){
                    if(i.order>fromOrder) return {...i, order: i.order-1}
                    if(i.order<fromOrder) return {...i, order: i.order+1}
                    else return i
                }
            }
            else if(i.listId === listId && i.order >= index){
                return {...i, order: i.order+1}
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
        return <Card setCardIsDeleting={setCardIsDeleting} order={index} key={i.id} title={i.title} cardId={i.id} listId={i.listId} description={i.description} listName={listName} comments={i.comments} setIsPostingCardDetails={setIsPostingCardDetails}/>
      }
      if(i.order === index){
      return <div className='empty-div'></div>
      }
    })}
  </div>
)
}

export default CardLocation