import { Backspace, CardText, CaretDownSquare, CaretRightSquare } from "react-bootstrap-icons";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { fetchCardDetails } from '../../../helpers/fetchData'
import {storeCardDetails} from '../../../actions'

function CardDetail({isOpen, setIsOpen, cardId, workflow, isEditingDescription, setIsEditingDescription}) {

  const [isLoading, setIsLoading] = useState(true)
  const [description, setDescription] = useState('')
  const cardDetails = useSelector((state)=> state.cardDetails)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isLoading) return
    const desc = cardDetails?.description
    setDescription(desc)
  },[isLoading])

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
        <p>in list <span class="card-detail-workflow">{workflow}</span></p>
        <label>Members:</label>
        <div className="card-detail-circles">
          <div className="card-detail-members">M</div>
          <div className="card-detail-add-members">+</div>
          </div>
        <Backspace className="close-card-detail" onClick={()=>setIsOpen(false)}/>
        <h5><CardText className="card-icons"/>Description
        <button className="btn edit-description-button" onClick={()=>setIsEditingDescription(true)}>Edit</button></h5>
        <p style={{display: isEditingDescription ? 'none' : 'block'}}>{cardDetails?.description}</p>
        <div className="description-editor" style={{display: isEditingDescription ? 'block' : 'none'}}>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button className="save-description btn btn-success" onClick={()=>setIsEditingDescription(false)}>Save</button>
        </div>
      </div>
    );
  }
  
  export default CardDetail;
  