import WorkflowList from './WorkflowList';
import {useParams} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useEffect, useState} from 'react'
import {fetchBoardDetails} from '../../helpers/fetchData'
import {useDispatch, useSelector} from 'react-redux'
import {storeBoardDetails} from '../../actions'

function BoardDetail() {
  const  {boardId}  = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) =>state.boardDetails)
  const workflows = useSelector((state) =>state.boardDetails.lists)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(()=>{
    async function fetchData() {
      try{
        setIsLoading(true)
        const boardDetails = await fetchBoardDetails(boardId)
        dispatch(storeBoardDetails(boardDetails))
      }
      catch (error) {
        console.log(error)
    } finally {
    
        setIsLoading(false);
    }
  }
    fetchData()
  },[])


  if (isLoading) {
    return <div>Loading...</div>
}
    return (
      <div>
        <h1>{details.title}</h1>
        <DndProvider backend={HTML5Backend}>
        <div className='workflow-box'>
        {workflows.map((i=> <WorkflowList key={i.id} id={i.id} cardItems={i.cards} description={i.description}/>))}
        </div>
        </DndProvider>
      </div>
    );
  }
  
  export default BoardDetail;