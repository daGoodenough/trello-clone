import WorkflowList from './WorkflowList';
import {useParams} from 'react-router-dom'


function BoardDetail() {
  let  {boardId}  = useParams();

    return (
      <div>
        <h1>Board {boardId} page</h1>
       <WorkflowList />
       
      </div>
    );
  }
  
  export default BoardDetail;