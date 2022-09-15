import '../pageCSS/allitems.css'

import { useEffect,useRef } from "react"
import Footer from "../components/footer";
import Header from "../components/header";


function Allitems()
{
    let loginDetails = useRef(JSON.parse(localStorage.getItem('rest_login_details')));

    useEffect(()=>{

        fetch(`http://localhost:8000/items/getitems/${loginDetails.current.userid}`,{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{

            if(data.success === true)
            {
                
                console.log(data);
            }
        })
        .catch((err)=>{
            console.log(err);
        })

    },[])
    return(
        
        <>
            <Header/>
                <div className="allitems">
                <h3>All food items</h3>

                </div>

            <Footer/>
        </>

    )
}

export default Allitems