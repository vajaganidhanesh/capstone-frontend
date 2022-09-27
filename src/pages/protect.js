import { Navigate } from "react-router-dom";

function Protect(props)
{
    let usertoken = JSON.parse(localStorage.getItem("login_details"));
    let admintoken = JSON.parse(localStorage.getItem("rest_login_details"));

    return usertoken || admintoken !==null ? props.children : <Navigate to={'/userlogin'}/>
}

export default Protect 