import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

// custom routing components

import Header from './components/header';
import Footer from './components/footer';
import LandingPage from './pages/landingPage';
import RestaurantList from './pages/restaurantList';
import UserAuthentication from './pages/userAuthentication';
import RestaurantAuthentication from './pages/RestaurantAuthentication';
import RestaurantLogin from './pages/restaurantLogin';
import UserLogin from './pages/userLogin';
import CreateItem from './pages/createItem';
import Allitems from './pages/allitems';

function App() {
  return (
   <>
      <BrowserRouter>
          <Routes>
            <Route path='/header' element={<Header/>} />
            <Route path='/footer' element={<Footer/>} />
            <Route path='/' element={<LandingPage/>} />
            <Route path='/landingpage' element={<LandingPage/>} />
            <Route path='/restaurants' element={<RestaurantList/>}/>
            <Route path='/userAuthentication' element={<UserAuthentication/>}/>
            <Route path='/restaurantAuthentication' element={<RestaurantAuthentication/>}/>
            <Route path='/restaurantLogin' element={<RestaurantLogin/>}/>
            <Route path='/userlogin' element={<UserLogin/>}/>
            <Route path='/createitem' element={<CreateItem/>}/>
            <Route path='/allitems' element={<Allitems/>}/>


          </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
