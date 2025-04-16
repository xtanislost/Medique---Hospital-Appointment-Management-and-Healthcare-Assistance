import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { doctors as allDoctorsData } from '../assets/assets'; // Renamed to avoid confusion with context

const Doctors = () => {
  const { speciality: urlSpeciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [activeSpeciality, setActiveSpeciality] = useState(urlSpeciality || 'all');

  const applyFilters = () => {
    let filteredDoctors = [...doctors];

    // Filter by speciality
    if (activeSpeciality !== 'all') {
      filteredDoctors = filteredDoctors.filter(
        (doc) => doc.speciality.toLowerCase() === activeSpeciality.toLowerCase()
      );
    }

    // Filter by doctor name
    if (searchQuery) {
      filteredDoctors = filteredDoctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by availability
    if (availabilityFilter !== 'all') {
      const isAvailable = availabilityFilter === 'available';
      filteredDoctors = filteredDoctors.filter((doc) => doc.available === isAvailable);
    }

    setFilterDoc(filteredDoctors);
  };

  useEffect(() => {
    applyFilters();
  }, [doctors, activeSpeciality, searchQuery, availabilityFilter]);

  const handleSpecialityChange = (spec) => {
    if (activeSpeciality === spec) {
      setActiveSpeciality('all');
      navigate('/doctors');
    } else {
      setActiveSpeciality(spec);
      navigate(`/doctors/${spec}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAvailabilityFilterChange = (e) => {
    setAvailabilityFilter(e.target.value);
  };

  return (
    <div>
      <p className='text-gray-600'> Browse through the doctors speciality </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <p
            onClick={() => handleSpecialityChange('General Physician')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              activeSpeciality === 'General Physician' ? 'bg-[#E2E5FF] text-black ' : ''
            }`}
          >
            General Physician
          </p>
          <p
            onClick={() => handleSpecialityChange('Gynecologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              activeSpeciality === 'Gynecologist' ? 'bg-[#E2E5FF] text-black ' : ''
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => handleSpecialityChange('Dermatologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              activeSpeciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black ' : ''
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() => handleSpecialityChange('Pediatrician')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              activeSpeciality === 'Pediatrician' ? 'bg-[#E2E5FF] text-black ' : ''
            }`}
          >
            Pediatrician
          </p>
          <p
            onClick={() => handleSpecialityChange('Neurologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              activeSpeciality === 'Neurologist' ? 'bg-[#E2E5FF] text-black ' : ''
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() => handleSpecialityChange('Gastroenterologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              activeSpeciality === 'Gastroenterologist' ? 'bg-[#E2E5FF] text-black ' : ''
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className='w-full'>
          <div className='flex items-center gap-4 mb-4'>
            <input
              type="text"
              placeholder="Search Doctor Name"
              className='border rounded py-2 px-3 w-full sm:w-64'
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select
              className='border rounded py-2 px-3 w-full sm:w-32'
              value={availabilityFilter}
              onChange={handleAvailabilityFilterChange}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Not Available</option>
            </select>
          </div>
          <div className='grid grid-cols-auto gap-4 gap-y-6'>
            {filterDoc.map((item, index) => (
              <div
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                key={index}
              >
                <img className='bg-[#EAEFFF]' src={item.image} alt='' />
                <div className='p-4'>
                  <div
                    className={`flex items-center gap-2 text-sm text-center ${
                      item.available ? 'text-green-500' : 'text-gray-500'
                    }`}
                  >
                    <p
                      className={`w-2 h-2 rounded-full ${
                        item.available ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    ></p>
                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                  <p className='text-[#262626] text-sm font-medium'>{item.doctorLicenseNumber}</p>

                  <p className='text-gray-900 text-sm'>{item.experience}</p>
                  <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;