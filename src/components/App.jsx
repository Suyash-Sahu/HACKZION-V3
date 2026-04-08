import Welcome from "./Welcome";
import Hero from "./Hero";
import NavBar from "./Navbar";
import About from "./About";
import Sponsors from "./Sponsors";
import Footer from "./Footer";
import Tracks from "./Timeline";
import Prize from "./Prize";
import Rules from "./Rules";
import Faculty from "./Faculty";




function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <Welcome />
      <About />
      <Tracks />
      <Prize/>
      <Rules/>
      <Sponsors />
      <Faculty/>
      <Footer />
    </main>
  );
}

export default App