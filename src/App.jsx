import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
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
import Register from "./components/Register";

function LandingPage() {
  return (
    <main id="home" className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <Welcome />
      <About />
      <Tracks />
      <Timeline />
      <Prize />
      <Rules />
      <Sponsors />
      <HackZionTeam />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
