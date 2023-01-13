import { Backspace, CardText, CardList, CaretRightSquare } from "react-bootstrap-icons";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { fetchCardDetails } from '../../../helpers/fetchData'
import { postComment } from '../../../helpers/postData'
import {storeCardDetails} from '../../../actions'
import { setCommentRange } from "typescript";

function CardDetail({isOpen, setIsOpen, cardId, workflow, isEditingDescription, setIsEditingDescription}) {

  const [isLoading, setIsLoading] = useState(true)
  const [description, setDescription] = useState('')
  const [currentComment, setCurrentComment] = useState('lean')
  const [commentIsSaved, setCommentIsSaved] = useState(false)
  const [existsCommentToAdd, setExistsCommentToAdd] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)
  const cardDetails = useSelector((state)=> state.cardDetails)
  const comments = useSelector((state)=> state.cardDetails.comments )
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isLoading) return
    const desc = cardDetails?.description
    const comm = cardDetails?.comment
    if(comm?.length>1){
      setCommentIsSaved(true)
    }
    setCurrentComment(comm)
    setDescription(desc)
  },[isLoading])

useEffect(()=>{
console.log('post comment called')
console.log(cardId)
// postComment(cardId, currentComment)
}, [existsCommentToAdd])

  useEffect(()=>{
    async function fetchData() {
      try{
        setIsLoading(true)
        const cardDetails = await fetchCardDetails(cardId)
        dispatch(storeCardDetails(cardDetails))
      }
      catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false);
    }
  }
    fetchData()
  },[isOpen])


  if(!isOpen) return(
    <div></div>
  )

  if (isLoading){
    return (
    <div className="card-detail-box">
    <h5>Loading..</h5>
    <Backspace className="close-card-detail" onClick={()=>setIsOpen(false)}/>
    <p>Loading..</p>
    </div>
    )
  }
    return (
      <div className="card-detail-box">
        <h5><CaretRightSquare className="card-icons"/>{cardDetails.title}</h5>
        <p>in list <span className="card-detail-workflow">{workflow}</span></p>
        <label>Members:</label>
        <div className="card-detail-circles">
          <div className="card-detail-members">M</div>
          <div className="card-detail-add-members">+</div>
          </div>
        <Backspace className="close-card-detail" onClick={()=>setIsOpen(false)}/>
        <h5><CardText className="card-icons"/>Description
        <button className="btn edit-description-button" onClick={()=>setIsEditingDescription(true)}>Edit</button></h5>
        <p className="card-description" style={{display: isEditingDescription ? 'none' : 'block'}}>{cardDetails?.description}</p>
        <div className="description-editor" style={{display: isEditingDescription ? 'block' : 'none'}}>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button className="save-description btn btn-success" onClick={()=>setIsEditingDescription(false)}>Save</button>
        </div>
        <h5><CardList className="card-icons"/>Activity</h5>
        <div className="comment-editor">
          <textarea placeholder="Write a comment.." value={currentComment} onChange={(e)=>setCurrentComment(e.target.value)} onFocus={()=>setIsEditingComment(true)}>
          </textarea>
          <button className="save-comment btn" onClick={()=>setExistsCommentToAdd(true)} style={{display: isEditingComment ? 'block' : 'none',}}>
            Save</button>
        </div>
        {comments.map((i)=>{
          return <p className="comment">{i.text}</p>
        })}
      </div>
    );
  }
  
  export default CardDetail;
  