import React, { useEffect, useState } from 'react';
import BoardItem from './BoardItem'
import { Backspace } from 'react-bootstrap-icons';
import { postBoard } from '../../helpers/postData';
import { useNavigate } from 'react-router-dom';

const BoardList = ({boards, userId, setIsPosting}) => {

  const [isCreating, setIsCreating] = useState(false)
  const [newBoard, setNewBoard] = useState('')
  const [newBoardValue, setNewBoardValue] = useState('')
  const orgId = '6cdbf98a-12c1-4d1b-83b4-863e8fca8224'
  const navigate = useNavigate();


  useEffect(()=>{
    async function postData(){
      try{
        setIsPosting(true)
       const response = await postBoard(userId, newBoard, orgId)
       navigate(`/board/${response.id}`);
      }
      catch (error) {
        console.log(error)
    } finally {
      setIsPosting(false)
      setNewBoardValue('')
    }
    }
    if (newBoard?.length>1){
    postData()
    }
    
  },[newBoard])


  return (
    <div>
     <h5 id='board-list-title'>Boards</h5>
     <div className='flex-container'>
     <div className='board-list'>
      {boards.map(item=>(<BoardItem key={item.id} id={item.id} title={item.title}  /> ))}
      <div className='board-item new-board-trigger'><button className="open-board-creator" onClick={()=>setIsCreating(true)}>Create new board</button>
      <div className='new-board-box' style={{display: isCreating ? 'block' : 'none',}}>
        <input placeholder='Board Title' type='text' value={newBoardValue} onChange={(e)=>setNewBoardValue(e.target.value)}></input>
        <button className='btn btn-primary create-board-button' onClick={()=>setNewBoard(newBoardValue)}>Create</button>
        <Backspace className='close-board-creator' onClick={()=>setIsCreating(false)}/>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default BoardList;
