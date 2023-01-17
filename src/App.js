import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { fetchUser } from './actions';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {auth} = useSelector(state => state)

  useEffect(() => {
    if (!auth.authenticated) {
      navigate("/login");
    } else {
      dispatch(fetchUser());
    }
  }, [auth.authenticated]);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
