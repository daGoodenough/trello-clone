import WorkflowList from './WorkflowList';
import {useParams, useNavigate} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useEffect, useState} from 'react'
import {fetchBoardDetails} from '../../helpers/fetchData'
import {useDispatch, useSelector} from 'react-redux'
import {storeBoardDetails} from '../../actions'
import { Trash3Fill, PatchPlus, Pencil } from 'react-bootstrap-icons';
import { deleteBoard } from '../../helpers/deleteData';
import { Modal } from 'react-bootstrap'


function BoardDetail() {
  const  {boardId}  = useParams();
  const dispatch = useDispatch();
  const title = useSelector((state) =>state.boardDetails.title)
  const workflows = useSelector((state) =>state.boardDetails.lists)
  const state = useSelector((state) =>state.boardDetails)
  const [isLoading, setIsLoading] = useState(true)
  const [exists, setExists] = useState(true)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        <button className='btn btn-warning back-button' onClick={()=>navigate(`/`)}>Back</button>
        <div className='board-detail-header'>
        <h1>{title}</h1>
        <Pencil className="icn"/>
        <Trash3Fill onClick={()=>setShow(true)} className="delete-board-icon icn"/>
        <PatchPlus className="add-list-icon icn"/>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton><h4>Are you sure you want to delete this board?</h4></Modal.Header>
        <Modal.Footer>
          <button class="btn" onClick={handleClose}>
            Cancel
          </button>
          <button class="btn btn-danger" onClick={()=>setExists(false)}>
            Delete Board
          </button>
          </Modal.Footer>
      </Modal>
        <DndProvider backend={HTML5Backend}>
        <div className='workflow-box'>
        {workflows.map((i=> <WorkflowList key={i.id} id={i.id} cardItems={i.cards} description={i.description}/>))}
        </div>
        </DndProvider>
      </div>
    );
  }
  
  export default BoardDetail;