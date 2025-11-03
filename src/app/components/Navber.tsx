"use client"
"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-black text-white px-6 py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Side Logo */}
                <div className="text-2xl font-bold">PH</div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center">
                    <li className="relative group">
                        <button
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                            className="hover:text-gray-300 transition"
                        >
                            Items
                        </button>
                        {dropdownOpen && (
                            <ul
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                                className="absolute left-0 mt-2 bg-gray-900 text-sm rounded-lg shadow-lg py-2 w-40"
                            >
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                    Item 1
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                    Item 2
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                    Item 3
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="hover:text-gray-300 transition cursor-pointer">
                        About
                    </li>
                    <li className="hover:text-gray-300 transition cursor-pointer">
                        Contact
                    </li>
                </ul>

                {/* Right Side Buttons */}
                <div className="hidden md:flex gap-4">
                    <button className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
                        Login
                    </button>
                    <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                        Sign In
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden mt-4 space-y-4">
                    <ul className="flex flex-col gap-2">
                        <li className="hover:text-gray-300 cursor-pointer">Items</li>
                        <li className="hover:text-gray-300 cursor-pointer">About</li>
                        <li className="hover:text-gray-300 cursor-pointer">Contact</li>
                    </ul>
                    <div className="flex flex-col gap-2">
                        <button className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
                            Login
                        </button>
                        <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
