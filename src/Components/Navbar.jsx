import React, { useState } from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const auth = getAuth();
    const logout = async () => {
        await auth.signOut();
        navigate("/");
    };

    const placeholderImageUrl = "https://via.placeholder.com/150"; // Placeholder image URL

    const user = {
        name: auth?.currentUser?.displayName || 'Guest',
        email: auth?.currentUser?.email || 'guest@example.com',
        imageUrl: auth?.currentUser?.photoURL || placeholderImageUrl,
    };

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-opacity-10 z-40 backdrop-filter backdrop-blur-lg bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center relative">
            {/* Left Section */}
            <div className="flex items-center">
                <Link to={"/blogs"}>
                    <img
                        src={user.imageUrl}
                        alt="User"
                        className="w-10 h-10 rounded-full mr-2 shadow-lg"
                    />
                </Link>
                <Link to={"/blogs"} className="text-white">{user.name}</Link>
            </div>

            {/* Hamburger Menu for md and below */}
            <div className="block md:hidden z-50"> {/* Adjusted z-index */}
                <button
                    className="text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)} // Toggle menuOpen state
                >
                    <svg
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                    >
                        {menuOpen ? (
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 6h16a1 1 0 110 2H4a1 1 0 110-2zm0 5h16a1 1 0 110 2H4a1 1 0 110-2zm0 5h16a1 1 0 110 2H4a1 1 0 110-2z"
                            />
                        ) : (
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 6h16a1 1 0 110 2H4a1 1 0 110-2zm0 5h16a1 1 0 110 2H4a1 1 0 110-2zm0 5h16a1 1 0 110 2H4a1 1 0 110-2z"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menu Box */}
            {menuOpen && (
                <div className="absolute md:hidden top-14 right-3 bg-opacity-100 bg-zinc-900 px-5 text-center py-3 rounded-xl shadow-lg z-40"> {/* Adjusted z-index */}
                    <ul>
                        <li className="py-2">
                            <span className="text-white hover:opacity-100 hover:text-blue-500 hover:text-lg hover:font-semibold">{user.email}</span>
                        </li>
                        <hr className="border-gray-400 my-2" />
                        <li className="py-2">
                            {location.pathname === "/blogs" ?
                            (<Link to={"/addblogs"} className="text-white focus:outline-none hover:opacity-100 hover:text-yellow-500 hover:text-lg hover:font-semibold">
                                Add Blog
                            </Link>)
                            :
                            (<Link to={"/blogs"} className="text-white focus:outline-none hover:opacity-100 hover:text-yellow-500 hover:text-lg hover:font-semibold">
                                All Blog
                            </Link>)
                        }
                        </li>
                        <hr className="border-gray-400 my-2" />
                        <li className="py-2">
                            <button className="text-white focus:outline-none hover:opacity-100 hover:text-red-500 hover:text-lg hover:font-semibold" onClick={()=>logout()}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {/* Right Section Hidden on md and below */}
            <div className="hidden md:flex items-center">
                {/* Add Blog Button */}
                {location.pathname === "/blogs" ?
                            (<Link to={"/addblogs"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Add Blog
                            </Link>)
                            :
                            (<Link to={"/blogs"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Back to Blogs
                            </Link>)
                }
                {/* User Email */}
                <span className="text-white mr-4">{user.email}</span>
                {/* Logout Button */}
                <button onClick={()=>logout()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
