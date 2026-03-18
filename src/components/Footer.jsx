const Footer = () => {
  return (
    <footer className="w-screen bg-black py-4 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-light">AMC Engineering College</p>
          <a
            href="https://maps.app.goo.gl/eaSeU516noKWrEgD6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-light hover:text-violet-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 3.834 3.025ZM12 12.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            Directions
          </a>
        </div>

        <div className="flex flex-col items-end gap-1">
          <a href="tel:7760012827" className="text-sm font-light hover:text-violet-300 transition-colors">
            Aditya Kulkarni: 7760012827
          </a>
          <a href="tel:7587312915" className="text-sm font-light hover:text-violet-300 transition-colors">
            Shreevant: 7587312915
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
