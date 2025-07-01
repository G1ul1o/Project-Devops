import { useState } from "react";
import "./Predict.css";
import Header from "../component/header.js";

export default function Predict() {
  const [showPopup, setShowPopup] = useState(false);

  const handlePredictClick = (e) => {
    e.preventDefault();
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
        <input className="input" type="number" name="hp-base" placeholder="Enter HP base" required min="0" />

        <label className="label">Magic damage base:</label>
        <input className="input" type="number" name="mp-base" placeholder="Enter MP base" required min="0" />

        <label className="label">Physical damage base:</label>
        <input className="input" type="number" name="attack-base" placeholder="Enter Attack base" required min="0" />

        <label className="label">Armor base:</label>
        <input className="input" type="number" name="armor-base" placeholder="Enter Armor base" required min="0" />

        <label className="label">Magic resist base:</label>
        <input className="input" type="number" name="magic-resist-base" placeholder="Enter Magic Resist base" required min="0" />

        <label className="label">Range type:</label>
        <input className="input" type="text" name="range" placeholder="Enter Range type 'melee' or 'ranged'" pattern="melee|ranged" required />

        <label className="label">Movement speed base:</label>
        <input className="input" type="number" name="movement-speed-base" placeholder="Enter Movement Speed base" required min="0" />

        <button type="submit" className="button">Predict</button>
      </form>

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
