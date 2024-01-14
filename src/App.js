import React, { useState } from "react";
import Header from "./Components/Header";
import CarListing from "./Components/CarListing";
// import CarListing from "./CarListing";

function App() {
  const [listedCars, setListedCars] = useState([]);

  const handleSubmit = (newCar) => {
    // Update listedCars state and local storage
    const updatedCars = [...listedCars, newCar];
    setListedCars(updatedCars);
    localStorage.setItem("listedCars", JSON.stringify(updatedCars));
  };
  return (
    <div className="App">
      <Header setListedCars={setListedCars} />
      <CarListing listedCars={listedCars} />
    </div>
  );
}

export default App;
