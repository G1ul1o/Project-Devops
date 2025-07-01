import Header from '../component/header';
import './home.css';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="home-container">
        <h1 className="home-title">Welcome to our Project to improve your comprehension of League of Legends</h1>
        <section className="home-section">
          <h2 className="section-title">What is League of Legends?</h2>
          <p className="home-description">
            League of Legends (LoL) is a multiplayer online battle arena (MOBA) game developed and published by Riot Games in 2009. In League, two teams of five champions battle to destroy the opposing team's Nexus, located at the heart of their base.
            <br /><br />
            The game is known for its fast-paced gameplay, diverse roster of champions, strategic depth, and competitive esports scene. Set in the fictional world of Runeterra, each champion comes with unique abilities, lore, and a distinct role on the battlefield.
          </p>
        </section>

        <section className="roles-section">
          <h2 className="section-title">Main Roles in League of Legends</h2>
          <ul className="roles-list">
            <li><strong>Top Lane:</strong> Durable fighters or tanks who dominate the upper lane.</li>
            <li><strong>Jungle:</strong> Roam between lanes, clear jungle camps, and support teammates with ambushes.</li>
            <li><strong>Mid Lane:</strong> Mages or assassins that deal high damage and control the map.</li>
            <li><strong>ADC (Bot Lane):</strong> Ranged damage dealers that scale into late game powerhouses.</li>
            <li><strong>Support:</strong> Assist and protect the ADC while providing utility to the team.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
