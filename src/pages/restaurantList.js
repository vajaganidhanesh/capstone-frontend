import { useEffect,useRef, useState } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import '../pageCSS/restaurantList.css'

function RestaurantList()
{

    let loginDetails = useRef(JSON.parse(localStorage.getItem('login_details')));

    let [restaurants,setRestaurants] = useState([])

    
    useEffect(()=>{
        fetch('http://localhost:8000/restaurant/allrestaurant',{
            headers:{
                "authorization":`Bearer ${loginDetails.current.token}`
            }
        })
        .then((res)=>res.json())
        .then((data=>{

            if(data.success=true)
            { 
                console.log(data);
                setRestaurants(data.data)
            }
        }))
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return(
        <>
            <Header/>
            

            <div className="restaurantList_container">
                {
                    restaurants.map((value,index)=>{

                        return(

                            
                            
                                <div className="restaurant_details_container" key={index}>
                                        <h2 className="rest_heading">{value.name}</h2>
                                    
                                    <div className="rest_details" >

                                            <div className="rest_header_detail">special about restaurant</div>
                                            
                                            <div className="header_sec">
                                                <div className="section_rest_cont">
                                                    
                                                        <div className="section_img">
                                                            <i className="fa-solid fa-clock"></i>
                                                        </div>

                                                        <ul className="section_option">
                                                        
                                                        <li>{value.opening_time}</li>
                                                            <li>{value.closing_time}</li>
                                                        </ul>
                                                </div>

                                

                                                <div className="section_rest_cont">
                                                    
                                                        <div className="section_img">
                                                        <i className="fa-solid fa-envelope"></i>
                                                        </div>

                                                        <ul className="section_option">
                                                        
                                                            <li> {value.email}</li>
                                                            
                                                        </ul>
                                                </div>


                                                <div className="section_rest_cont">
                                                    
                                                    <div className="section_img">
                                                    <i className="fa-solid fa-phone"></i>
                                                    </div>

                                                    <ul className="section_option">
                                                    
                                                        <li>{value.mobile}</li>
                                                    
                                                    </ul>
                                                </div>

                                                <div className="section_rest_cont">
                                                    
                                                    <div className="section_img">
                                                        <i className="fa-sharp fa-solid fa-location-dot"></i>
                                                    </div>

                                                    <ul className="section_option">
                                                    
                                                        <li>{value.address}</li>
                                                    
                                                    </ul>
                                                </div>
                                            </div>

                                         
                                                <button>visit</button>
                                          
                                    </div>
                                </div>
                            
                            
                        )
                    })
                }
            </div>

            <Footer/>
        </>
    )
}

export default RestaurantList