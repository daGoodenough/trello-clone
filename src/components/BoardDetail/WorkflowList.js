import Card from './Card';

function WorkflowList({title}) {

  const cards = ['butter', 'milk', 'eggs']
  
    return (
      <div className="workflow-item">
        <div className='workflow-wrapper'>
        <h5>{title}</h5>
        <ul className="list-ul">
        {cards.map((i => <Card item={i}/>))}
        </ul>
        </div>
        <div className='add-card-btn'>+ Add a card</div>
      </div>
    );
  }
  
  export default WorkflowList;