import { Routes, Route } from "react-router-dom";
import { NurseryList } from "../components/NurseryList";
import { DistributorList } from "../components/DistributorList";


// import retailers
//import distributors

export const ApplicationViews = () => {
    return (
        <Routes>
            
            <Route path="/" element={<div></div>} />
            <Route path="/nurseries" element={<NurseryList />} />
            <Route path="/retailers" element={<div><h1>Retailers</h1></div>} />
            <Route path="/distributors" element={<DistributorList />} />
        </Routes>
    );
};
