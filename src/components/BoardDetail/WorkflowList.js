import Card from './Card';
import { useState } from 'react';
import { Backspace } from 'react-bootstrap-icons';

function WorkflowList({title}) {

  const cards = [{id: 1, title: 'butter'},{id: 2, title: 'milk'},{id: 3, title: 'eggs'}]
  const [isEditingCard, setIsEditingCard] = useState(false)
  const handleAddCard =() =>{
    console.log('hi')
    setIsEditingCard(true)
  }
  
    return (
      <div className="workflow-item">
        <div className='workflow-wrapper'>
        <h5>{title}</h5>
        <ul className="list-ul">
        {cards.map((i => <Card title={i.title}/>))}
        </ul>
        </div>
        <div className="add-card-section" >
          <div className='add-card-btn' style={{display: isEditingCard ? 'none' : 'block'}} onClick={() => handleAddCard()}>+ Add a card</div>
          <div className='card-composer' style={{display: isEditingCard ? 'block' : 'none'}}>
          <input type="text" placeholder='Enter a title for this card'></input>
          <button className='btn btn-primary'>Add card</button>
         <Backspace className="close-composer" onClick={() => setIsEditingCard(false)}/>
            </div>
          </div>
      </div>
    );
  }
  
  export default WorkflowList;