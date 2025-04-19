import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from 'react-toastify';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } =
    useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  useEffect(() => {
    let filtered = [...doctors];

    // Filter by availability
    if (availabilityFilter === "available") {
      filtered = filtered.filter((doctor) => doctor.available);
    } else if (availabilityFilter === "unavailable") {
      filtered = filtered.filter((doctor) => !doctor.available);
    }

    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(lowerCaseQuery) ||
        doctor.speciality.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredDoctors(filtered);
  }, [doctors, availabilityFilter, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAvailabilityFilterChange = (e) => {
    setAvailabilityFilter(e.target.value);
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      const response = await deleteDoctor(doctorId);
      if (response?.success) {
        toast.success(response.message);
        getAllDoctors(); // Refresh the doctor list
      } else {
        toast.error(response?.message || "Failed to delete doctor");
      }
    }
  };

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex items-center mb-4'>
        <input
          type="text"
          placeholder="Search Doctor Name or Speciality"
          className='border rounded py-2 px-3 mr-4'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className='border rounded py-2 px-3'
          value={availabilityFilter}
          onChange={handleAvailabilityFilterChange}
        >
          <option value="all">All Availability</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {filteredDoctors.map((item, index) => (
          <div
            className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden group relative'
            key={index}
          >
            <img
              className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500 w-full h-32 object-cover'
              src={item.image}
              alt={item.name}
            />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center justify-between text-sm'>
                <div className='flex items-center gap-1'>
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p>Available</p>
                </div>
                <button
                  onClick={() => handleDeleteDoctor(item._id)}
                  className='text-blue-500 hover:text-red-700 focus:outline-none'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;