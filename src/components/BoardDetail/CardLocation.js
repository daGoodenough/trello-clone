import Card from './Card';
import {useDrop} from 'react-dnd'

function CardLocation ({index, cards, setCards, description, setIsPostingCardDetails, listId}){

    const [, drop] = useDrop({
        accept: 'card',
        drop: (card) => {
          const selected = card.title
          const fromListId = card.listId
          const fromOrder = 2
          console.log(fromOrder)
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
        console.log(nextCards)
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