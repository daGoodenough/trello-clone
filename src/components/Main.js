import { Routes, Route } from 'react-router-dom';
import Homescreen from './Homescreen/Homescreen'
import BoardDetail from './BoardDetail/BoardDetail'
import Login from './Login';

const Main = ()=>(
    <Routes>
    <Route
      exact
      path="/" element={<Homescreen />}
      />
       <Route
      exact
      path="/board/:boardId"
      element={<BoardDetail />}
    />
    <Route 
      exact
      path="/login" element={<Login />}
    />
    </Routes>
   
)

export default Main;