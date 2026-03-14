const Footer = () => {
  return (
    <footer className="w-screen bg-black py-4 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="tel:7760012827" className="text-sm font-light hover:text-violet-300 transition-colors">
          Aditya: 7760012827
        </a>

        <p className="text-center text-sm font-light">
          ©HACKZION 2026. <br />All rights reserved
        </p>

        <a href="tel:7587312915" className="text-sm font-light hover:text-violet-300 transition-colors">
          Shreevant: 7587312915
        </a>
      </div>
    </footer>
  );
};

export default Footer;
