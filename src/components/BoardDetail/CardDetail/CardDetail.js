import { Backspace, CardText, CardList, CaretRightSquare, Trash3Fill } from "react-bootstrap-icons";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { fetchCardDetails } from '../../../helpers/fetchData'
import { postComment, updateCardDescription } from '../../../helpers/postData'
import {storeCardDetails} from '../../../actions'
import { ThreeDots } from 'react-loader-spinner'
import { deleteComment } from "../../../helpers/deleteData";

function CardDetail({ isOpen, setIsOpen, cardId, listName}) {

  const userId = 'ccf964bc-d992-4bb8-9fa1-ffcb38487179'
  const [isLoading, setIsLoading] = useState(true)
  const [currentComment, setCurrentComment] = useState('')
  const [existsCommentToAdd, setExistsCommentToAdd] = useState(false)
  const [isPostingComment, setIsPostingComment] = useState(false)
  const [isDeletingComment, setIsDeletingComment] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [existsDescriptionToAdd, setExistsDescriptionToAdd] = useState(false)
  const [isPostingDescription, setIsPostingDescription] = useState(false)
  const [commentId, setCommentId] = useState('')
  const cardDetails = useSelector((state)=> state.cardDetails)
  const comments = useSelector((state)=> state.cardDetails.comments)
  const desc = useSelector((state)=> state.cardDetails.description)
  const [description, setDescription] = useState(desc)
  const dispatch = useDispatch()

//GET card details
useEffect(()=>{
  async function fetchData() {
    try{
      const cardDetails = await fetchCardDetails(cardId)
      dispatch(storeCardDetails(cardDetails))
    }
    catch (error) {
      console.log(error)
  } finally {
      console.log('done')
  }
}
  fetchData()
},[isOpen, isPostingComment, isDeletingComment, isPostingDescription])

//POST comment
useEffect(()=>{
  async function postData(){
    try{
      setIsPostingComment(true)
      await postComment(cardId, currentComment, userId) 
    }
    catch(e) {
      console.error(e)
    }
    finally{
      setExistsCommentToAdd(false)
      setIsPostingComment(false)
      setCurrentComment('')
      setIsEditingComment(false)
    }
  }
  if(currentComment?.length<1) return
  if(!existsCommentToAdd) return
  postData()
}, [existsCommentToAdd])

//POST description

useEffect(()=>{
  async function postData(){
    try{
      setIsPostingDescription(true)
      await updateCardDescription(cardId, description) 
    }
    catch(e) {
      console.error(e)
    }
    finally{
      setExistsDescriptionToAdd(false)
      setIsPostingDescription(false)
      setIsEditingDescription(false)
    }
  }
  if(description?.length<1) return
  if(!existsDescriptionToAdd) return
  postData()
}, [existsDescriptionToAdd])

//DELETE comment
  useEffect(()=>{
   async function deleteData(){
    try{
      setIsDeletingComment(true)
      await deleteComment(commentId)
    }
    catch(e){
      console.error(e)
    }
    finally{
      setIsDeletingComment(false)
      setCommentId('')
    }
   }
   if(commentId?.length<2)return 
   deleteData()
  },[commentId])


  if(!isOpen) return(
    <div></div>
  )

    return (
      <div className="card-detail-box">
        <h5><CaretRightSquare className="card-icons"/>{cardDetails.title}</h5>
        <p>in list <span className="card-detail-workflow">{listName}</span></p>
        <label>Members:</label>
        <div className="card-detail-circles">
          <div className="card-detail-members">M</div>
          <div className="card-detail-add-members">+</div>
          </div>
        <Backspace className="close-card-detail icn" onClick={()=>setIsOpen(false)}/>
        <h5><CardText className="card-icons"/>Description
        <button className="btn edit-description-button" onClick={()=>setIsEditingDescription(true)}>Edit</button></h5>
        <p className="card-description" style={{display: isEditingDescription ? 'none' : 'block'}}>{cardDetails?.description}</p>
        <div className="description-editor" style={{display: isEditingDescription ? 'block' : 'none'}}>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button className="save-description btn btn-success" onClick={()=>setExistsDescriptionToAdd(true)}>Save</button>
        </div>
        <h5><CardList className="card-icons"/>Activity</h5>
        <div className="comment-editor">
          <textarea placeholder="Write a comment.." value={currentComment} onChange={(e)=>setCurrentComment(e.target.value)} onFocus={()=>setIsEditingComment(true)}>
          </textarea>
          <button className="save-comment btn" onClick={()=>setExistsCommentToAdd(true)} style={{display: isEditingComment ? 'block' : 'none',}}>
            {isPostingComment ? null : <span>Save</span>}{isPostingComment ? <div className='loader'><ThreeDots color="black"/></div> : null}</button>
        </div>
        {comments.map((i)=>{
          return <div className="comment" key={i.id}>{isDeletingComment ? null : <span>{i.text}</span>}
          {isDeletingComment ? <div className='loader'><ThreeDots color="black"/></div> : null}
          <span data-key={i.id} className="delete-comment icn" onClick={(e)=>setCommentId(e.currentTarget.dataset.key)}>
            <Trash3Fill/></span></div>
        })}
      </div>
    );
  }
  
  export default CardDetail;
  