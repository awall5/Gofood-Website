import './App.css';
import Home from './screen/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import Login from './screen/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screen/Signup.js';
import { CartProvider } from './components/ContextReducer.js';


function App() {
  return (
    <CartProvider>
      <Router>

        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/login' element={<Login />} />

          </Routes>
        </div>

      </Router>
    </CartProvider>
  );
}

export default App;
