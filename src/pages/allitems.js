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
                <h3>Your Restaurant items</h3>
                    <div className='item_container'>
                        <div className='item_details'>

                            <div className='image_container'>

                            </div>

                            <div className='item_description'>

                                <div className='item_name'>
                                    biriyani
                                </div>
                                <div className='item_quantity'>
                                   pack of 1kg 
                                </div>
                                <div className='item_price'>
                                   price of 200
                                </div>

                                <button>ADD TO CART</button>
                            </div>


                        </div>
                         <div className='item_details'>

                        </div>
                         <div className='item_details'>

                        </div>
                        <div className='item_details'>

                        </div>
                        <div className='item_details'>

                        </div>
                        <div className='item_details'>

                        </div>
                    </div>

                </div>

            <Footer/>
        </>

    )
}

export default Allitems