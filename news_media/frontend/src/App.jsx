import { Outlet , Link , useNavigate } from "react-router-dom";
import { useContext } from "react";
import axiosAPI from '../api/axios';
import NavBar from './components/NavBar';
import { UserContext } from "./context/UserContext";

export default function App() {
  
  let { user , dispatch  } = useContext(UserContext)

  let navigate = useNavigate();

  let logout = async() => {

    let res = await axiosAPI.post('/api/users/logout');
    
    if(res.status==200){
      dispatch({ type : 'LOGOUT' }),
      navigate('/signIn')
    }

  }

  return (
    <>
     <NavBar logout={logout} />
     <div className="p-5 h-screen" >
      <Outlet/>
     </div>
    </>
  );
}
