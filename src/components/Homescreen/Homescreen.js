
import HomeHeader from "./HomeHeader";
import BoardList from "./BoardList";
import { useSelector, useDispatch } from "react-redux";
import { fetchHomescreen } from '../../helpers/fetchData';
import { storeHomescreen } from '../../actions';
import { useEffect, useState } from "react";


const Homescreen = () => {
  const userId = 'ccf964bc-d992-4bb8-9fa1-ffcb38487179'
  const [isLoading, setIsLoading] = useState(true)
  const [isPosting, setIsPosting] = useState(0)
  const [postResponse, setPostResponse] = useState({})
  const data = useSelector((state) =>state.homescreen)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function fetchData(){
      try{
      const homescreen = await fetchHomescreen(userId)
      dispatch(storeHomescreen(homescreen))
    }
    catch (error) {
      console.log(error)
  } finally {
      setIsLoading(false);
  }
}
    fetchData()
  },[isPosting])



if (isLoading){
  return <div>Loading..</div>
}
return (
      <div>
      <HomeHeader title={data.org.name}/>
      <BoardList boards={data.org.boards} userId={userId} setIsPosting={setIsPosting}/>
      </div>
    );
}
  
  export default Homescreen;
  