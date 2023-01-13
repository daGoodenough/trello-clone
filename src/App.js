import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';

function App() {
  const navigate = useNavigate();
  const loggedIn = useSelector(state => state.loggedIn)

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
