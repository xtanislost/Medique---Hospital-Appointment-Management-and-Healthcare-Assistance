import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const DoctorAppointments = () => {
    const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
    const { slotDateFormat, calculateAge, currency } = useContext(AppContext);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    useEffect(() => {
        let filtered = [...appointments];

        if (filter === 'cancelled') {
            filtered = filtered.filter(item => item.cancelled);
        } else if (filter === 'completed') {
            filtered = filtered.filter(item => item.isCompleted);
        } else if (filter === 'upcoming') {
            filtered = filtered.filter(item => !item.cancelled && !item.isCompleted);
        }

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                item.userData.name.toLowerCase().includes(lowerCaseQuery)
            );
        }

        setFilteredAppointments(filtered.reverse());
    }, [appointments, filter, searchQuery]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className='w-full max-w-6xl m-5 '>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>

            <div className='flex items-center mb-4'>
                <select
                    className='border rounded py-2 px-3 mr-4'
                    value={filter}
                    onChange={handleFilterChange}
                >
                    <option value="all">All</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
                <input
                    type="text"
                    placeholder="Search Patient Name"
                    className='border rounded py-2 px-3 w-64'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                    <p>Prescription</p>
                </div>
                {filteredAppointments.map((item, index) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
                        </div>
                        <div>
                            <p className='text-xs inline border border-primary px-2 rounded-full'>
                                {item.payment ? 'Online' : 'CASH'}
                            </p>
                        </div>
                        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                        <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                        <p>{currency}{item.amount}</p>
                        {item.cancelled
                            ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                            : item.isCompleted
                                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                                : <div className='flex'>
                                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                </div>
                        }
                        <div>
                            <Link to={`/prescription/${item._id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'>
                                Prescription
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointments;