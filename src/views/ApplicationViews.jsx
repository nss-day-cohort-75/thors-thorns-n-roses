import { Routes, Route } from "react-router-dom";
import { NurseryList } from "../components/NurseryList";
import { DistributorList } from "../components/DistributorList";
import {RetailerList} from "../components/retailers/RetailerList";
import { CartList } from "../components/CartList";

export const ApplicationViews = () => {
    return (
        <Routes>
            
            <Route path="/" element={<div></div>} />
            <Route path="/Nurseries" element={<NurseryList />} />
            <Route path="/retailers" element={<RetailerList />} />
            <Route path="/Distributors" element={<DistributorList />} />
            <Route path="/ShoppingCart" element={<CartList />} />
        </Routes>
    );
};
