// import React from "react";
import "./Header.css";
import React, { useState, useEffect } from "react";
const Header = ({ setListedCars }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [carData, setCarData] = useState({});
  const [selectedMake, setSelectedMake] = useState(""); // State to track selected make
  const [selectedModel, setSelectedModel] = useState(""); // State to track selected model
  const [maxSpeed, setMaxSpeed] = useState(0);

  useEffect(() => {
    const fetchedCarData = {
      Toyota: ["Camry", "Corolla", "Rav4"],
      Honda: ["Civic", "Accord", "CR-V"],
      Tesla: ["Model 3", "Model X", "Model Y"],
    };
    setCarData(fetchedCarData);

    // displayListedCars();
  }, []);
  const fuels = {
    Diesel: "",
    Petrol: "",
    LPG: "",
    Electric: "",
  };
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
    setSelectedModel(""); // Reset selected model when a new make is selected
  };

  const handleMaxSpeedChange = (event) => {
    const currentMaxSpeed = parseInt(event.target.value);
    setMaxSpeed(currentMaxSpeed);
  };

  const [transmitionOptions, setTransmitionOptions] = useState([]);
  const [gearOptions, setGearOptions] = useState([]);

  const transmitions = {
    Automatic: [4, 5, 6, 7, 8, 9],
    Manual: [4, 5, 6, 7],
    Tiptronic: [4, 5, 6, 7, 8, 9],
  };

  const handleFuelChange = (event) => {
    const selectedFuel = event.target.value;
    const availableTransmitions = Object.keys(transmitions);
    const transmitionOptions = availableTransmitions.map((transmition) => (
      <option key={transmition} value={transmition}>
        {transmition}
      </option>
    ));
    setTransmitionOptions(transmitionOptions);
    setGearOptions([]);
  };

  const handleTransmitionChange = (event) => {
    const selectedTransmition = event.target.value;
    const availableGears = transmitions[selectedTransmition] || [];
    const gearOptions = availableGears.map((gear) => (
      <option key={gear} value={gear}>
        {gear}
      </option>
    ));
    setGearOptions(gearOptions);
  };
  // Other event handlers and logic...

  const displayListedCars = () => {
    const storedListedCars =
      JSON.parse(localStorage.getItem("listedCars")) || [];
    setListedCars(storedListedCars);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const carMake = document.getElementById("make").value;
    const carModel = document.getElementById("model").value;
    const carFuel = document.getElementById("fuel").value;
    const carMaxSpeed = document.getElementById("maxSpeed").value;
    const carTransmition = document.getElementById("transmition").value;
    const carGears = document.getElementById("gears").value;

    const uniqueID = Math.random().toString(36).substring(7);
    const newCar = {
      uniqueID: uniqueID,
      carmake: carMake,
      carmodel: carModel,
      carengine: "",
      carfuel: carFuel,
      cartopspeed: carMaxSpeed,
      cartransmition: carTransmition,
      cargears: carGears,
    };
    let storedListedCars = JSON.parse(localStorage.getItem("listedCars")) || [];
    storedListedCars.push(newCar);

    localStorage.setItem("listedCars", JSON.stringify(storedListedCars));

    // Update the listedCars state in App.js
    setListedCars(storedListedCars);
    // const updatedCars = [...listedCars, newCar];
    // setListedCars(updatedCars);
    // localStorage.setItem("listedCars", JSON.stringify(updatedCars));
  };

  return (
    <header>
      <div className="container">
        <div className="navbar">
          <div className="logoFrame">
            <img src="images/cardealer.svg" alt="" />
          </div>
          <ul className="navul">
            <li className="navli">
              <a href="">Home</a>
            </li>
            <li className="navli">
              <a href="">Listing</a>
            </li>
            <li className="navli">
              <a href="">On Sale</a>
            </li>
            <li className="navli">
              <a href="">Contact</a>
            </li>
          </ul>
          <div className="listing">
            <button id="formActivating" onClick={toggleForm}>
              List Car
            </button>
            <div
              id="hiddenform"
              className={isFormVisible ? "showform" : "hiddenform"}
            >
              <form id="carListingForm">
                <input type="file" id="fileInput" />
                <div className="formrow">
                  <label htmlFor="make">Make:</label>
                  <select
                    id="make"
                    required
                    value={selectedModel}
                    onChange={handleMakeChange}
                  >
                    <option defaultValue="">Select Make</option>
                    {Object.keys(carData).map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formrow">
                  <label htmlFor="model">Model:</label>
                  <select id="model" required>
                    <option defaultValue="">Select Model</option>
                    {carData[selectedMake]?.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formrow">
                  <label htmlFor="fuel">Select Fuel</label>
                  <select name="" id="fuel" onChange={handleFuelChange}>
                    <option defaultValue="">Select Fuel</option>
                    {Object.keys(fuels).map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>
                </div>
                <label htmlFor="maxSpeed">
                  Max Speed <span id="carmaxspeed">{maxSpeed}</span>(Kmh):
                </label>
                <div id="formmaxspeed">
                  <span>100</span>
                  <span>450</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="450"
                  defaultValue="0"
                  onInput={handleMaxSpeedChange}
                  id="maxSpeed"
                />
                <div className="formrow">
                  <label htmlFor="transmition">Transmition</label>
                  <select
                    name=""
                    id="transmition"
                    onChange={handleTransmitionChange}
                  >
                    <option defaultValue="">Select transmition</option>
                    {transmitionOptions}
                  </select>
                </div>
                <div className="formrow">
                  <label htmlFor="gears">Gears</label>
                  <select name="" id="gears">
                    <option defaultValue="">Select Gears</option>
                    {gearOptions}
                  </select>
                </div>
                <button type="submit" onSubmit={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
