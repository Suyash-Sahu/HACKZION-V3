import Welcome from "./components/Welcome";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import About from "./components/About";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import Tracks from "./components/Timeline";
import Prize from "./components/Prize";
import Rules from "./components/Rules";
import HackZionTeam from "./components/HackZionTeam";



function App() {
  return (
    <main id="home" className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <Welcome />
      <About />
      <Tracks />
      <Prize/>
      <Rules/>
      <Sponsors />
      <HackZionTeam />
      <Footer />
    </main>
  );
}

export default App;
