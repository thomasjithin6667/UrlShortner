import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protect({ children }:any) {
  const navigate = useNavigate();
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])

  if (user) {
    console.log(user)
    return children;
  } else {
    navigate("/login");
  }
}

export default Protect;