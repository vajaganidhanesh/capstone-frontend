import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

// custom routing components

import LandingPage from './pages/landingPage';
import RestaurantList from './pages/restaurantList';
import UserAuthentication from './pages/userAuthentication';
import RestaurantAuthentication from './pages/RestaurantAuthentication';
import RestaurantLogin from './pages/restaurantLogin';
import UserLogin from './pages/userLogin';
import CreateItem from './pages/createItem';
import Allitems from './pages/allitems';
import Menu from './pages/menu';
import Cart from './pages/cart';
import Protect from './pages/protect';
import Order from './pages/order';
import { ItemsProvider } from './context/itemsContext';
function App() {
  return (
   <ItemsProvider>
      <BrowserRouter>
          <Routes>

            <Route path='/' element={<LandingPage/>} />

            <Route path='/landingpage' element={<LandingPage/>} />

            <Route path='/restaurants' element={
            <Protect>
              <RestaurantList/>
            </Protect>}/>

            <Route path='/userAuthentication' element={<UserAuthentication/>}/>

            <Route path='/restaurantAuthentication' element={<RestaurantAuthentication/>}/>

            <Route path='/restaurantLogin' element={<RestaurantLogin/>}/>

            <Route path='/userlogin' element={<UserLogin/>}/>

            <Route path='/createitem' element={

           
              <CreateItem/>
           }/>

            <Route path='/allitems' element={
            
              <Allitems/>
            }/>

            <Route path='/menu' element={
              
              <Protect>
                <Menu/>
              </Protect>}/>
            
          
            <Route path='/cart' element={
              
            <Protect>
              <Cart/>
            </Protect>}/>

            <Route path='/order' element={
              
              <Protect>
                <Order/>
            </Protect>}/>

        


          </Routes>
      </BrowserRouter>
   </ItemsProvider>
  );
}

export default App;
