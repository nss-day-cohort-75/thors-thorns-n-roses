import { Routes, Route } from "react-router-dom";
import { NurseryList } from "../NurseryList";
// import retailers
//import distributors

export const ApplicationView = () => {
    return (
        <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/nurseries" element={<NurseryList />} />
            <Route path="/retailers" element={<div><h1>Retailers</h1></div>} />
            <Route path="/distributors" element={<div><h1>Distributors</h1></div>} />
        </Routes>
    );
};
