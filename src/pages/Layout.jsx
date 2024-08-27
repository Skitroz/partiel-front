import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="sm:flex-1 flex flex-col sm:flex-row mx-auto items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold">
                  <span>Partiel FrontEnd</span>
                </Link>
              </div>
              <div className="sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Rechercher un film
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;