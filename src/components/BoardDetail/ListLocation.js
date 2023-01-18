import WorkflowList from "./WorkflowList"
import {useDrop} from 'react-dnd'
import {useDispatch, useSelector} from 'react-redux'
import {reOrderLists} from '../../actions'

function ListLocation({boardId, setIsPostingCardDetails, workflows, listOrder }) {

    const dispatch = useDispatch();

    const [, drop] = useDrop({
        accept: 'list',
        drop: (list) => {
            const selected=list.id
            const fromOrder=list.listOrder
            const newLists=workflows.map((i)=>{
            if(i.id===selected){
                return {
                    ...i,
                    order: listOrder
                }
            }
            else if(i.id!==selected && i.order===listOrder){
                
                if(fromOrder>i.order) return {...i, order: i.order+1}
                if(fromOrder<i.order) return {...i, order: i.order-1}
            }
            else if (i.id!==selected && i.order!==listOrder){
                if(fromOrder>i.order&&listOrder<i.order) return {...i, order: i.order+1}
                if(fromOrder<i.order&&listOrder>i.order) return {...i, order: i.order-1}
            }
            return i
        })
        console.log(newLists)
        dispatch(reOrderLists(newLists))
        }
    })

return (
<div ref={drop} className="list-location">
{workflows?.map((i)=>{
if(i.order===listOrder){
 return <WorkflowList listOrder={i.order} boardId={boardId} key={i.id} id={i.id} cardItems={i.cards} description={i.description} setIsPostingCardDetails={setIsPostingCardDetails}/>
}

})}
 </div>
)
}

export default ListLocation