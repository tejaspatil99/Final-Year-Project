import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const decodedSpeciality = speciality ? decodeURIComponent(speciality) : null;

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  // Normalize string for comparison and URL
  const normalizeString = (str) =>
  str ? str.toLowerCase().trim().replace(/\s+/g, "-") : "";


  // Converts a specialty to a proper route path
  const toRoute = (spec) =>
    spec ? `/doctors/${encodeURIComponent(normalizeString(spec))}` : "/doctors";

  const applyFilter = () => {
    if (decodedSpeciality) {
      const normalizedSpeciality = normalizeString(decodedSpeciality);
      setFilterDoc(
        doctors.filter(
          (doc) => normalizeString(doc.speciality) === normalizedSpeciality
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, decodedSpeciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary" : ""
          }`}
        >
          Filters
        </button>

        {/* Side Filters */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            "General physician",
            "Diabetologist",
            "Cardiologist",
            "Breast Cancer Specialist",
            "Hepatologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() =>
                normalizeString(decodedSpeciality) === normalizeString(spec)
                  ? navigate("/doctors")
                  : navigate(toRoute(spec))
              }
              className={`whitespace-nowrap w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                normalizeString(decodedSpeciality) === normalizeString(spec)
                  ? "bg-[#E2E5FF] text-black"
                  : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.length === 0 && (
            <p>No doctors found for this speciality.</p>
          )}

          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-[#EAEFFF]" src={item.image} alt={item.name} />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
