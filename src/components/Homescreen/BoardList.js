import React, { useEffect, useState } from 'react';
import BoardItem from './BoardItem'
import { Backspace } from 'react-bootstrap-icons';

const BoardList = ({boards}) => {

  const [isCreating, setIsCreating] = useState(false)
  const [newBoard, setNewBoard] = useState('')
  const [newBoardValue, setNewBoardValue] = useState('')

  useEffect(()=>{
    createNewBoard()
  },[newBoard])

  const createNewBoard = () =>{
    setIsCreating(false)
  }

  return (
    <div>
     <h5 id='board-list-title'>Boards</h5>
     <div className='flex-container'>
     <div className='board-list'>
      {boards.map(item=>(<BoardItem id={item.id} title={item.title}  /> ))}
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
