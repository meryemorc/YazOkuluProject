import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          {[1, 2, 3].map((col) => (
            <div key={col} className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                {["First Link", "Second Link", "Third Link", "Fourth Link"].map((link, index) => (
                  <li key={index}>
                    <a className="text-gray-400 hover:text-white" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </nav>
            </div>
          ))}

          {/* E-Posta Alanı */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">SUBSCRIBE</h2>
            <div className="flex flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-40 sm:w-auto mr-2">
                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-400">Email</label>
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  className="w-full bg-gray-800 rounded border border-gray-700 focus:bg-transparent focus:ring-2 focus:ring-yellow-900 focus:border-yellow-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="flex-shrink-0 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded mt-2">
                Gönder
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-2 md:text-left text-center">
              Geliştirme aşamasındaki sistem hakkında güncellemeleri almak için abone olabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 bg-opacity-75">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">SummerSchool</span>
          </a>
          <p className="text-sm text-gray-400 sm:ml-6 sm:mt-0 mt-4">
            © 2025 SummerSchool —
            <a href="#" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@yourteam</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            {["facebook", "twitter", "instagram", "linkedin"].map((item, index) => (
              <a key={index} className="text-gray-400 ml-3" href="#">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
