import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{backgroundColor: "lightyellow"}}>
            <Navbar />

            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousale'>
                    <div className="carousel-caption " style={{ zIndex: 10 }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control text-black me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg" alt="First slide" style={{ filter: "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-craig-122861-376464.jpg&fm=jpg" alt="Second slide" style={{ filter: "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="Third slide" style={{ filter: "brightness(30%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
            </div>

            <div className='container'>
                {foodCat.length === 0 ? (
                    <div>No categories available</div>
                ) : (
                    foodCat.map((data) => (
                        <div key={data._id} className="row mb-3">
                            <div className='fs-3 m-3'>{data.CategoryName}</div>
                            <hr />
                            {foodItem.length === 0 ? (
                                <div>No food items available</div>
                            ) : (
                                foodItem
                                    .filter(item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map(filterItems => (
                                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                            <Card
                                                foodItem = {filterItems}
                                                options={filterItems.options[0]} 
                                                
                                            />
                                        </div>
                                    ))
                            )}
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}
