import '../pageCSS/allitems.css'

import { useEffect,useRef, useState } from "react"
import Footer from "../components/footer";
import Header from "../components/header";
import { Link } from 'react-router-dom';


function Allitems()
{
    let loginDetails = useRef(JSON.parse(localStorage.getItem('rest_login_details')));
    
    let [items,setItems] = useState([]);

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
                setItems(data.items)
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
                <div className='all_items'>
                    <h3>Your Restaurant items</h3>
                    <Link to='/createitem'><button>additems</button></Link>
                </div>
                    <div className='item_container'>
                        
                        {
                            items.length!==0?
                                items.map((items,index)=>{
                                    return(
                                        <div className='item_details' key={index}>

                                            <div className='image_container'>
                                                <img src={items.picture[0]} alt='food_item'/>
                                            </div>

                                            <div className='item_description'>

                                                <div className='item_name'>
                                                    {items.name}
                                                </div>
                                                <div className='item_quantity'>
                                                available quantity {items.quantity} 
                                                </div>
                                                <div className='item_price'>
                                                price of each {items.price}
                                                </div>

                                                <div className='feature_buttons'>
                                                    <button>edit</button>
                                                    <button>delete</button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }):
                                (
                                    <div className='add_items_container'>
                                       
                                        <div className='add_items_image'>
                                            
                                            <img src="../assets/start_cooking.svg" alt='uploadimage'/>

                                            <div>
                                               
                                                <Link to='/createitem'><button>additems</button></Link>
                                            </div>
                                        </div>
                                       
                                    </div>
                                )
                        }
                         
                    </div>

                </div>

            <Footer/>
        </>

    )
}

export default Allitems