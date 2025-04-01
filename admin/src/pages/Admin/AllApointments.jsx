import React, { useEffect, useState, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  useEffect(() => {
    let filtered = [...appointments];

    if (filterDate) {
      const filterDateObj = new Date(filterDate); // Convert the input string to a Date object
      filtered = filtered.filter(appointment => {
        // Assuming slotDate is in the format "DD_MM_YYYY"
        const [day, month, year] = appointment.slotDate.split('_').map(Number);
        // Month in JavaScript Date object is 0-indexed, so subtract 1
        const appointmentDateObj = new Date(year, month - 1, day);

        // Compare the dates (ignoring time)
        return appointmentDateObj.toDateString() === filterDateObj.toDateString();
      });
    }

    if (filterDoctor) {
      filtered = filtered.filter(appointment =>
        appointment.docData.name.toLowerCase().includes(filterDoctor.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [appointments, filterDate, filterDoctor]);

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='mb-4 flex gap-4'>
        <div>
          <label htmlFor="filterDate" className="block text-gray-700 text-sm font-bold mb-2">Filter by Date:</label>
          <input
            type="date"
            id="filterDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="filterDoctor" className="block text-gray-700 text-sm font-bold mb-2">Filter by Doctor:</label>
          <input
            type="text"
            id="filterDoctor"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
          />
        </div>
      </div>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {filteredAppointments.reverse().map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-18 cursor-pointer' src={assets.cancel_icon} alt='' />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments