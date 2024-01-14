// CarListing.js
import React from "react";

const CarListing = ({ listedCars }) => {
  return (
    <div className="carsGrid">
      {listedCars.map((car) => (
        <div key={car.uniqueID} className="car">
          <div className="carimgframe">
            <img src="uploads/img.jpg" alt="" />
          </div>
          <div className="carcardbody">
            <p>Make: {car.carmake}</p>
            <p>Model: {car.carmodel}</p>
            <p>Fuel: {car.carfuel}</p>
            <p>Max Speed: {car.cartopspeed}</p>
            <p>Transmission: {car.cartransmition}</p>
            <p>Gears: {car.cargears}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarListing;
