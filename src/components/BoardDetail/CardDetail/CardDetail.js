import { Backspace } from "react-bootstrap-icons";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { fetchCardDetails } from '../../../helpers/fetchData'
import {storeCardDetails} from '../../../actions'

function CardDetail({isOpen, closeState, cardId}) {

  const [isLoading, setIsLoading] = useState(true)
  const cardDetails = useSelector((state)=> state.cardDetails)
  const dispatch = useDispatch()

  console.log('this cardId', cardId)
  console.log('cardDetails', cardDetails)

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
    return <div>Loading..</div>
  }
    return (
      <div className="card-detail-box">
        <h5>CARD DETAIL</h5>
        <Backspace className="close-card-detail" onClick={closeState}/>
        <p>{cardDetails.description}</p>
      </div>
    );
  }
  
  export default CardDetail;
  