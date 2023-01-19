import Card from './Card';
import {useDrop} from 'react-dnd'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {reOrderCards} from '../../actions'

function CardLocation ({index, setIsPostingCardDetails, listId, listName}){

  const {cards, id} = useSelector((state) =>state?.boardDetails)
  const dispatch = useDispatch();


   
    const [, drop] = useDrop({
        accept: 'card',
        drop: (card) => {
          const selected = card.title
          const fromListId = card.listId
          const fromOrder = card.order
          let highestOrder = -1;
          const nextCards = cards.map((i)=>{
            //set highest order
          if(i.listId===listId && i.order<index && listId!==fromListId && i.title !== selected){
            if(i.order>highestOrder){
            highestOrder=i.order
            console.log(highestOrder)
            }
            return i
              }
            if(i.title===selected && listId !== fromListId){
                return {
                  ...i,
                  listId: listId,
                  order: highestOrder+1
              }
              }
            else if(i.title === selected && listId===fromListId){
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
            //decrement items in the fromList
            else if(i.listId === fromListId && fromListId !== listId){
              if(i.order>fromOrder) return {...i, order: i.order-1}
              if(i.order<fromOrder) return i
            }
            else if(i.listId === listId && i.order >= index){
                return {...i, order: i.order+1}
            }
            else return i
        })
        console.log(nextCards)
        dispatch(reOrderCards(nextCards, id))
        // setCards(nextCards)
        },
      })

    


return (
    <div ref={drop} className='card-location' id={index}>
    {cards?.map((i) => {
      if (i?.listId === listId && i?.order === index) {
        return <Card order={index} key={i.id} title={i.title} cardId={i.id} listId={i.listId} description={i.description} listName={listName} comments={i.comments} setIsPostingCardDetails={setIsPostingCardDetails}/>
      }
      if(i?.order === index){
      return <div className='empty-div'></div>
      }
    })}
  </div>
)
}

export default CardLocation