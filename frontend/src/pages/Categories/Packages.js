import slide1 from "../../assets/package/01.jpg";
import slide2 from "../../assets/package/02.jpg";
import slide3 from "../../assets/package/03.jpg";
import slide4 from "../../assets/package/04.jpg";
import slide5 from "../../assets/package/05.jpg";
import slide6 from "../../assets/package/06.jpg";
import SectionTitle from "../../components/SectionTitle";

const Packages = () => {
  return (
    <section className="px-4 lg:px-12">
      <SectionTitle
        subHeading={"Make Your Home a Green Haven"}
        heading={"Plants For Indoors"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={slide1}
            alt="Indoor Plant 1"
            className="w-full h-60 object-cover group-hover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
            <p className="text-white text-lg font-semibold">Beautiful Indoor Plant</p>
          </div>
        </div>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={slide2}
            alt="Indoor Plant 2"
            className="w-full h-60 object-cover group-hover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
            <p className="text-white text-lg font-semibold">Bring Nature Indoors</p>
          </div>
        </div>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={slide3}
            alt="Indoor Plant 3"
            className="w-full h-60 object-cover group-hover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
            <p className="text-white text-lg font-semibold">Green Your Space</p>
          </div>
        </div>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={slide4}
            alt="Indoor Plant 4"
            className="w-full h-60 object-cover group-hover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
            <p className="text-white text-lg font-semibold">Indoor Plant Collection</p>
          </div>
        </div>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={slide5}
            alt="Indoor Plant 5"
            className="w-full h-60 object-cover group-hover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
            <p className="text-white text-lg font-semibold">Fresh & Green Plants</p>
          </div>
        </div>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={slide6}
            alt="Indoor Plant 6"
            className="w-full h-60 object-cover group-hover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
            <p className="text-white text-lg font-semibold">Fresh & Green Plants</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
