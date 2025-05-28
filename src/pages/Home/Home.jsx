import { useState } from "react";
import Header from "../../components/Header";
import Books from "../../components/Books";
import React from "react";

const Home = () => {
    const [searchTitle, setSearchTitle] = useState("");


    return (
        <>
            <Header updateSearchTitle={setSearchTitle}  />
            <Books searchTitle={searchTitle} />
        </>
    );
};

export default Home;
