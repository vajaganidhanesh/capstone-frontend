import { useEffect,useRef, useState } from "react"
import Footer from "../components/footer";
import Header from "../components/header";

function Cart()
{

    let loginDetails = useRef(JSON.parse(localStorage.getItem('rest_login_details')));
    
    useEffect(()=>{
        fetch(`http://localhost:8000/items/allcartitems/${loginDetails.current.userid}`,{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            },
        })
        .then((res)=>res.json())
        .then((data=>{

            if(data.success=true)
            { 
                console.log(data);
                // setItems(data.items)
            }
        }))
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return(
        <>
            <Header/>
            <Footer/>
        </>
    )
}

export default Cart