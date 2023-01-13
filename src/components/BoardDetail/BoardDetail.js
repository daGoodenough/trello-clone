import WorkflowList from './WorkflowList';
import {useParams, useNavigate} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useEffect, useState} from 'react'
import {fetchBoardDetails} from '../../helpers/fetchData'
import {useDispatch, useSelector} from 'react-redux'
import {storeBoardDetails} from '../../actions'
import { Trash3Fill } from 'react-bootstrap-icons';
import { deleteBoard } from '../../helpers/deleteData';


function BoardDetail() {
  const  {boardId}  = useParams();
  const dispatch = useDispatch();
  const title = useSelector((state) =>state.boardDetails.title)
  const workflows = useSelector((state) =>state.boardDetails.lists)
  const [isLoading, setIsLoading] = useState(true)
  const [exists, setExists] = useState(true)
  const navigate = useNavigate();


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

  useEffect(()=>{
    if(exists) return
    async function deleteData(){
      try{
        await deleteBoard(boardId)
        navigate(`/`);
      }
      catch (error) {
        console.log(error)
    } finally {
        console.log('done');
    }
    }
    deleteData();
  },[exists])


  if (isLoading) {
    return <div>Loading...</div>
}
    return (
      <div className='board-detail'>
        <h1>{title}<Trash3Fill onClick={()=>setExists(false)}/></h1>
        <DndProvider backend={HTML5Backend}>
        <div className='workflow-box'>
        {workflows.map((i=> <WorkflowList key={i.id} id={i.id} cardItems={i.cards} description={i.description}/>))}
        </div>
        </DndProvider>
      </div>
    );
  }
  
  export default BoardDetail;