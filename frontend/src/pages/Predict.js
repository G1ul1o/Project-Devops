import { useState } from "react";
import "./Predict.css";
import Header from "../component/header.js";

export default function Predict() {
  const [showPopup, setShowPopup] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [formData, setFormData] = useState({
    hp_base: "550.0",
    mp_base: "495.0",
    dam_base: "51.0",
    arm_base: "21.0",
    mr_base: "30.0",
    range: "ranged",
    mobility: "100.0"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePredictClick = async (e) => {
    e.preventDefault();
    console.log(formData)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          hp_base: parseFloat(formData.hp_base),
          mp_base: parseFloat(formData.mp_base),
          dam_base: parseFloat(formData.dam_base),
          arm_base: parseFloat(formData.arm_base),
          mr_base: parseFloat(formData.mr_base),
          range: formData.range,
          mobility: parseFloat(formData.mobility)
        }),
       
      });
    const data = await response.json();
    setPredictionResult(data.prediction);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Header />
      <h1>Welcome to the Predict Page</h1>
      <h2 className="paraph">Enter the champion's base stats to predict their type:</h2>
      <p className="paraph">Feel free to input values and test it to see the result !</p>

      <form className="form" onSubmit={handlePredictClick}>
        <label className="label">HP base:</label>
        <input id="hp_base" className="input" type="number" name="hp_base" placeholder="Enter HP base" onChange={handleChange} required min="0" />

        <label className="label">Magic damage base:</label>
        <input id="mp_base" className="input" type="number" name="mp_base" placeholder="Enter MP base" onChange={handleChange} required min="0" />

        <label className="label">Physical damage base:</label>
        <input id="dam_base" className="input" type="number" name="dam_base" placeholder="Enter Attack base" onChange={handleChange} required min="0" />

        <label className="label">Armor base:</label>
        <input id="arm_base" className="input" type="number" name="arm_base" placeholder="Enter Armor base" onChange={handleChange} required min="0" />

        <label className="label">Magic resist base:</label>
        <input id="mr_base" className="input" type="number" name="mr_base" placeholder="Enter Magic Resist base" onChange={handleChange} required min="0" />

        <label className="label">Range type:</label>
        <input id="range" className="input" type="text" name="range" placeholder="Enter Range type 'melee' or 'ranged'" onChange={handleChange} pattern="melee|ranged" required />

        <label className="label">Movement speed base:</label>
        <input id="mobility" className="input" type="number" name="mobility" placeholder="Enter Movement Speed base" onChange={handleChange} required min="0" />

        <button id="predict_btn" type="submit" className="button">Predict</button>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Prediction</h2>
           <p id="predict_result">Champion type predicted: <strong>{predictionResult}</strong></p>
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
