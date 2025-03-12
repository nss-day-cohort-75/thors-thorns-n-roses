import { Routes, Route } from "react-router-dom";
import { NurseryList } from "../components/NurseryList";

import {RetailerList} from "../components/retailers/RetailerList";
// import retailers
//import distributors

export const ApplicationViews = () => {
    return (
        <Routes>
            
            <Route path="/" element={<div></div>} />
            <Route path="/Nurseries" element={<NurseryList />} />
            <Route path="/retailers" element={<RetailerList />} />
            <Route path="/Distributors" element={<div><h1>Distributors</h1></div>} />
        </Routes>
    );
};
