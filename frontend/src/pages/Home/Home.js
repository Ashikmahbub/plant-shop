import React from 'react';
import { Link } from 'react-router-dom';
import Banner from "../Banner/Banner";
import Bonsai from "../Categories/Bonsai";
import Flower from "../Categories/Flower";
import Indoor from "../Categories/Indoors";
import Outdoor from "../Categories/Outdoor";
import Packages from "../Categories/Packages";
import SemiIndoor from "../Categories/Semi-Indoors";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="text-center mt-10">
        <Link
          to="/shop"
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Shop Now
        </Link>
      </div>
      <Indoor />
      <SemiIndoor />
      <Flower />
      <Bonsai />
      <Outdoor />
      <Packages />

      {/* Shop Now Button */}
    
    </div>
  );
};

export default Home;
