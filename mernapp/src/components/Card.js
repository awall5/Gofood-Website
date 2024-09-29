import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

  const { foodName, options } = props;
  let foodItem = props.foodItem; 

  const dispatch = useDispatchCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD",
      item: {
        id: foodItem.id,
        name: foodItem.name,
        price: validOptions[selectedPrice],
        quantity: quantity,
        totalPrice: totalPrice
      }
    });
  };

  // Check if options is valid and set a default
  const validOptions = options && typeof options === 'object' && Object.keys(options).length > 0
    ? options
    : {};

  const priceOptions = Object.keys(validOptions);

  // State for quantity and selected price
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(priceOptions[0]);

  // Calculate total price
  const totalPrice = selectedPrice ? quantity * validOptions[selectedPrice] : 0;

  return (
    <div className="card mt-3" style={{ width: '100%', maxHeight: '360px', backgroundColor: "lightcoral" }}>
      <img src={props.foodItem.img} className="card-img-top" alt="Food Item" style={{ height: "150px", objectFit: "fill", border: "3px", borderBlockColor: "black" }} />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className='container w-100'>
          <select className='m-2 h-100 bg-success rounded' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select className='m-2 h-100 bg-success rounded' value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
            {priceOptions.map((data) => (
              <option key={data} value={data}>{data}</option>
            ))}
          </select>
          <div className='d-inline h-100 fs-5'>₹{totalPrice}/-</div>
          <hr></hr>
          <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
