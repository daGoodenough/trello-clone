import WorkflowList from './WorkflowList';
import {useParams, useNavigate} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useEffect, useState} from 'react'
import {fetchBoardDetails} from '../../helpers/fetchData'
import {postList} from '../../helpers/postData'
import {useDispatch, useSelector} from 'react-redux'
import {storeBoardDetails} from '../../actions'
import { Trash3Fill, PatchPlus, Pencil, Backspace } from 'react-bootstrap-icons';
import { deleteBoard, deleteList } from '../../helpers/deleteData';
import { Modal } from 'react-bootstrap'


function BoardDetail() {
  const  {boardId}  = useParams();
  const dispatch = useDispatch();
  const title = useSelector((state) =>state.boardDetails.title)
  const workflows = useSelector((state) =>state.boardDetails.lists)
  const state = useSelector((state) =>state.boardDetails)
  const [isLoading, setIsLoading] = useState(true)
  const [exists, setExists] = useState(true)
  const [listExists, setListExists] = useState(true)
  const [show, setShow] = useState(false);
  const [isEditingBoardName, setIsEditingBoardName] = useState(false)
  const [currentTitle, setCurrentTitle] = useState(title)
  const [existsTitleToUpdate, setExistsTitleToUpdate] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [newListValue, setNewListValue] = useState('')
  const [newList, setNewList] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [isPostingCardDetails, setIsPostingCardDetails] = useState(false)
  const [listId, setListId] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const[unorderedCards, setUnorderedCards] = useState([])
  const [cards, setCards] = useState([])

  useEffect(()=>{
    if(isLoading) return
    setUnorderedCards(workflows[0].cards)
  },[workflows, isLoading])

  useEffect(()=>{
    if (unorderedCards.length<1) return
    const updatedCards = unorderedCards.map((card, index) => {
      return {
        ...card,
        order: index 
      }
    });
    setCards(updatedCards);
  },[unorderedCards])


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
  },[isPostingCardDetails, isPosting])

  useEffect(()=>{
    if(!existsTitleToUpdate) return
    setIsEditingBoardName(false)
    console.log(currentTitle)
  },[existsTitleToUpdate])

  useEffect(()=>{
    if(!isEditingBoardName) return
    setExistsTitleToUpdate(false)
  },[isEditingBoardName])

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

  useEffect(()=>{
    if(listId?.length<2) return
    async function deleteData(){
      try{
        setIsPosting(true)
        await deleteList(listId)
      }
      catch(e){
        console.error(e)
      }
      finally{
        setIsPosting(false)
        setListId('')
      }
    }
    deleteData()
  },[listId])

  useEffect(()=>{
    async function postData(){
      try{
        setIsPosting(true)
       await postList(boardId, newList)
      }
      catch (error) {
        console.log(error)
    } finally {
      setIsPosting(false)
      setNewListValue('')
    }
    }
    if (newList?.length>1){
    postData()
    }
    
  },[newList])



  if (isLoading) {
    return <div>Loading...</div>
}
    return (
      <div className='board-detail'>
        <button className='btn btn-warning back-button' onClick={()=>navigate(`/`)}>Back</button>
        <div className='board-detail-header'>
        <h1 style={{display: isEditingBoardName ? 'none' : 'inline-flex'}}>{title}</h1>
        <input style={{display: isEditingBoardName ? 'inline-flex' : 'none'}} value={currentTitle} onChange={(e)=>setCurrentTitle(e.target.value)} onBlur={()=>setExistsTitleToUpdate(true)}>

        </input>
        <Pencil className="pencil-icon icn" onClick={()=>setIsEditingBoardName(true)}/>
        <Trash3Fill onClick={()=>setShow(true)} className="delete-board-icon icn"/>
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
        {workflows.map((i=> <WorkflowList setCards={setCards} cards={cards} key={i.id} id={i.id} cardItems={i.cards} description={i.description} setIsPostingCardDetails={setIsPostingCardDetails} setListExists={setListExists} setListId={setListId}/>))}
        <div className='new-workflow-trigger'><button className="btn new-workflow-btn" onClick={()=>setIsCreating(true)} style={{display: isCreating ? 'none' : 'block'}}>Create new list<PatchPlus className="icn add-list-icon"/></button>
        <div className='new-workflow-box' style={{display: isCreating ? 'block' : 'none',}}>
        <input placeholder='List name' type='text' value={newListValue} onChange={(e)=>setNewListValue(e.target.value)}></input>
        <button className='btn btn-primary' onClick={()=>setNewList(newListValue)}>Create</button>
        <Backspace className='close-new-workflow icn' onClick={()=>setIsCreating(false)}/>
      </div>
      </div>
        </div>
        </DndProvider>
      </div>
    );
  }
  
  export default BoardDetail;