import Card from './Card';
import {useDrop} from 'react-dnd'

function CardLocation ({index, cards, setCards, description, setIsPostingCardDetails, listId}){

    const [, drop] = useDrop({
        accept: 'card',
        drop: (card) => {
          const selected = card.title
          const fromListId = card.listId
          const nextCards = cards.map((i)=>{
            if(i.title === selected){
                let highestOrder;
                if (index === 0) {
                    highestOrder = -1;
                } else {
                    highestOrder = cards.reduce((highest, card) => {
                        if (card.listId === listId && card.order >= index) {
                            return card.order;
                        }
                        return highest;
                    }, -1);
                }
                return {
                    ...i,
                    listId: listId,
                    order: highestOrder + 1
                }
            }
            else if(i.listId === listId && i.order >= index){
                return {...i, order: i.order+1}
            }
            else if(i.listId === fromListId && i.order > index){
                return {...i, order: i.order-1}
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