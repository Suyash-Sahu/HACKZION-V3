import Welcome from "./components/Welcome";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import About from "./components/About";
import Tracks from "./components/Tracks";
import Timeline from "./components/Timeline";
import Prize from "./components/Prize";
import Rules from "./components/Rules";
import Sponsors from "./components/Sponsors";
import HackZionTeam from "./components/HackZionTeam";
import Footer from "./components/Footer";



function App() {
  return (
    <main id="home" className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <Welcome />
      <About />
      <Tracks />
      <Timeline />
      <Prize/>
      <Rules/>
      <Sponsors />
      <HackZionTeam />
      <Footer />
    </main>
  );
}

export default App;
