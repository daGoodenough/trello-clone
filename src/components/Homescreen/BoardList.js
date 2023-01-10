import React from 'react';
import BoardItem from './BoardItem'

const BoardList = () => {

  const boards = [{id: 1, title: 'Board One'}, {id: 2, title: 'Board Two'},{id: 3, title: 'Board Three'}, {id: 4, title: 'Board Four'},{id: 5, title: 'Board Five'}, {id: 6, title: 'Board Six'}, {id: 7, title: 'Board Seven'}];
  
  return (
    <div>
     <h5 id='board-list-title'>Boards</h5>
     <div className='flex-container'>
     <div className='board-list'>
      {boards.map(item=>(<BoardItem id={item.id} title={item.title}  /> ))}
      </div>
      </div>
    </div>
  );
}

export default BoardList;
