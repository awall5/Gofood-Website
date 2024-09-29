import React from 'react';

export default function Carousale() {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>

      <div className="carousel-inner" id='carousale'>
        <div className="carousel-caption " style={{zIndex:10}}>
          <form className="d-flex">
            <input className="form-control text-black me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
          </form>
        </div>

        <div className="carousel-item active">
          <img className="d-block w-100" src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg" alt="First slide" style={{filter: "brightness(30%"}}/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-craig-122861-376464.jpg&fm=jpg" alt="Second slide" style={{filter: "brightness(30%"}}/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="Third slide" style={{filter: "brightness(30%"}}/>
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
  );
}
