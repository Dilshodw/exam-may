import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import Logo from "../assets/logo.svg"
import SearchIcon from "../assets/search.png";
import React from "react";  

const Header = ({ updateSearchTitle }) => {
    const [searchInput, setSearchInput] = useState("");
    const { setAuth } = useContext(AuthContext);

    const onInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        updateSearchTitle(value);
    };


    return (
        <header className="text-white flex items-center px-6 py-3 rounded-bl-[80px] justify-between">
            <div className="flex gap-[24px] items-center">
                <div className="flex items-center space-x-2">
                    <img src={Logo} alt="logo" className="w-[150px] h-[36px]" />
                </div>

                <div className="flex items-center px-3 py-1.5 w-80 bg-[#000]">
                    <img src={SearchIcon} alt="search" className="w-4 h-4 mr-2" />
                    <input
                        type="text"
                        placeholder="Search for any training you want"
                        className="bg-transparent outline-none text-sm text-white w-full placeholder-gray-400"
                        value={searchInput}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            
        </header>
    );
};

export default Header;
