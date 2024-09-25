

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';



import Home from './components/home/landing'; // Import your Home component
import Navbars from './components/navbar/navbar';
import Register from './components/signup/signup';
import Login from './components/login/login';
import Admin from './components/admin/admin';
import Support from './components/support/support';
import Predict from './components/prediction/prediction';
import Footers from './components/footer/footer';
import Contact from './components/contact/contact';
import About from './components/about/about';
import History from './components/history/history'





const App = () => {
  return (
<Router>
     <Navbars/>
      <Routes>
      <Route exact path="/" element={<Home/>}></Route>
<Route path="/signup" element={<Register/>}></Route>
<Route path="/signin" element={<Login/>}></Route>
<Route path="/admin" element={<Admin/>}></Route>
<Route path="/support" element={<Support/>}></Route>
<Route path="/predict" element={<Predict/>}></Route>
<Route path="/contact" element={<Contact/>}></Route>
<Route path="/about" element={<About/>}></Route>
<Route path="/history" element={<History/>}></Route>


</Routes>
<Footers />
    </Router>
    
  );
};

export default App;



