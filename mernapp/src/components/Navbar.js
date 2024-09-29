import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Modal } from 'react-bootstrap'; // Ensure Modal is imported from the correct package
import Cart from '../screen/Cart';  



import { useCart } from '../components/ContextReducer'; // Assuming you have this

export default function Navbar() {
  const [cartView, setCartView] = useState(false); 
  const navigate = useNavigate();
  const cartData = useCart(); // Assuming you have cart context or hook
  const cartCount = cartData.length;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") &&
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/orders">My Orders</Link>
                </li>
              }
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                  My Cart <Badge pill bg="danger">{cartCount}</Badge>
                </div>
                {cartView && (
                  <Modal show={cartView} onHide={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
