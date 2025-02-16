import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "All Books", path: "/all-books" },
    { name: "Cart", path: "/cart" },
    { name: "Profile", path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          className="h-12 w-12 rounded-full border-2 border-white shadow-md"
          src="https://i.ibb.co/rRK2Vwnr/bookpoka.png"
          alt="boipoka"
        />
        <h1 className="text-2xl font-bold tracking-wide drop-shadow-md text-purple-100">
          Boipoka
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-lg font-semibold">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`cursor-pointer transition duration-300 hover:scale-105 ${
                location.pathname === item.path
                  ? "text-orange-600"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
        {/* Mode Toggle Button */}
        <ModeToggle />
      </ul>

      {/* Buttons */}
      <div className="hidden md:flex gap-3">
        <Button
          variant="outline"
          className="border-white text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
          onClick={() => handleNavigation("/login")}
        >
          Login
        </Button>
        <Button
          className="bg-purple-600 text-white hover:bg-purple-800 shadow-lg transition-all"
          onClick={() => handleNavigation("/signup")}
        >
          Sign Up
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <Menu
          className="h-7 w-7 cursor-pointer hover:scale-110 transition-all text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 md:hidden">
          <ul className="space-y-4 text-lg font-semibold">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`cursor-pointer transition duration-300 hover:scale-105 ${
                    location.pathname === item.path
                      ? "text-orange-600"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <ModeToggle />
            </li>
            <li className="space-x-3">
              <Button
                variant="outline"
                className="border-white text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-purple-600 text-white hover:bg-purple-800 shadow-lg transition-all"
                onClick={() => handleNavigation("/signup")}
              >
                Sign Up
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
