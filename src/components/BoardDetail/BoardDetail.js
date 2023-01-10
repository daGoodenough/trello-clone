import WorkflowList from './WorkflowList';
import {useParams} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function BoardDetail() {
  let  {boardId}  = useParams();

  const workflows = [{id: 1, title: 'To Do'}, {id: 2, title: 'Doing'},{id: 3, title: 'Done'}]
  

    return (
      <div>
        <h1>Board {boardId} page</h1>
        <DndProvider backend={HTML5Backend}>
        <div className='workflow-box'>
        {workflows.map((i=> <WorkflowList key={i.id} title={i.title}/>))}
        </div>
        </DndProvider>
      </div>
    );
  }
  
  export default BoardDetail;