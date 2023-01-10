import { useNavigate } from 'react-router-dom';

const BoardItem = ({title, id}) => {

  const navigate = useNavigate();

  const clickHandler = () => {
   console.log('hello')
   navigate(`/board/${id}`);
  };


return(
      <div className="board-item" onClick={clickHandler} >
      <h5>{title}</h5>
      </div>
    );
}
  
  export default BoardItem;