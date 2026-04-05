 

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-3/12 my-8">
            <p className ="text-2xl text-yellow-600 mb-2">---{subHeading}---</p>
            <h3 className="text-3xl font-bold uppercase text-center text-green-700 mt-6 mb-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;