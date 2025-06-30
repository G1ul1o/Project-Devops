import { useState } from "react";
import "./Predict.css";
import Header from "../component/header.js";

export default function ChampionSelect() {
  const [showPopup, setShowPopup] = useState(false);

  const handlePredictClick = (e) => {
    e.preventDefault(); // Empêche le rechargement
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

      <form className="form">
        <label className="label">HP base:</label>
        <input className="input" type="text" name="hp-base" placeholder="Enter HP base" />

        <label className="label">Magic damage base:</label>
        <input className="input" type="text" name="mp-base" placeholder="Enter MP base" />

        <label className="label">Physical damage base:</label>
        <input className="input" type="text" name="attack-base" placeholder="Enter Attack base" />

        <label className="label">Armor base:</label>
        <input className="input" type="text" name="armor-base" placeholder="Enter Armor base" />

        <label className="label">Magic resist base:</label>
        <input className="input" type="text" name="magic-resist-base" placeholder="Enter Magic Resist base" />

        <label className="label">Range type:</label>
        <input className="input" type="text" name="range" placeholder="Enter Range type" />

        <label className="label">Movement speed base:</label>
        <input className="input" type="text" name="movement-speed-base" placeholder="Enter Movement Speed base" />

      </form>
      <button type="submit" className="button" onClick={handlePredictClick}>Predict</button>


      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Prediction</h2>
            <p>This is where the prediction result will appear!</p>
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
