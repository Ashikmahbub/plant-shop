import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/ui/Banner";
import Bonsai from "../Categories/Bonsai";
import Flower from "../Categories/Flower";
import Indoor from "../Categories/Indoors";
import Outdoor from "../Categories/Outdoor";
import Packages from "../Categories/Packages";
import SemiIndoor from "../Categories/SemiIndoors";

const CategorySection = ({ to, children }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(to)}
      className="cursor-pointer hover:opacity-90 transition-opacity duration-200"
    >
      {children}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Banner />
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/shop")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Shop Now
        </button>
      </div>

      <CategorySection to="/shop?category=indoor">
        {" "}
        <Indoor />{" "}
      </CategorySection>
      <CategorySection to="/shop?category=semi-indoor">
        {" "}
        <SemiIndoor />{" "}
      </CategorySection>
      <CategorySection to="/shop?category=flower">
        {" "}
        <Flower />{" "}
      </CategorySection>
      <CategorySection to="/shop?category=bonsai">
        {" "}
        <Bonsai />{" "}
      </CategorySection>
      <CategorySection to="/shop?category=outdoor">
        {" "}
        <Outdoor />{" "}
      </CategorySection>
      <CategorySection to="/shop?category=packages">
        {" "}
        <Packages />{" "}
      </CategorySection>
    </div>
  );
};

export default Home;
