import "./Predict.css";
import Header from "../component/header.js";

export default function ChampionSelect() {
  return (
    <div>
      <Header />   
      <h1>Welcome to the predict Page</h1>
      <form className="form">
        <label className="label">HP base:</label>
        <input className="input" type="text" id="hp-base" name="hp-base" placeholder="Enter HP base" />
        <label className="label">Magic damage base:</label>
        <input className="input" type="text" id="mp-base" name="mp-base" placeholder="Enter MP base" />
        <label className="label">Physic damage base:</label>
        <input className="input" type="text" id="attack-base" name="attack-base" placeholder="Enter Attack base" />
        <label className="label">Range type:</label>
        <input className="input" type="text" id="range" name="range" placeholder="Enter Range type" />
        <label className="label">Armor base:</label>
        <input className="input" type="text" id="armor-base" name="armor-base" placeholder="Enter Armor base" />
        <label className="label">Magic resist base:</label>
        <input className="input" type="text" id="magic-resist-base" name="magic-resist-base" placeholder="Enter Magic Resist base" />
        <label className="label">Movement speed base:</label>
        <input className="input" type="text" id="movement-speed-base" name="movement-speed-base" placeholder="Enter Movement Speed base" />
      </form>
      <button type="submit" className="button">Predict</button>

    </div>
  );
}


