import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'upcoming', 'cancelled', 'completed'
  const [showCancelConfirm, setShowCancelConfirm] = useState(null); // Holds appointment ID for confirmation
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const navigate = useNavigate();

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        const reversedAppointments = data.appointments.reverse();
        setAppointments(reversedAppointments);
        setFilteredAppointments(reversedAppointments); // Initialize filtered appointments
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleInitiateCancel = (appointmentId, isPaid) => {
    if (isPaid) {
      setShowCancelConfirm({ id: appointmentId, isPaid: true });
    } else {
      cancelAppointment(appointmentId);
    }
  };

  const handleConfirmCancel = (appointmentId) => {
    cancelAppointment(appointmentId);
    setShowCancelConfirm(null);
  };

  const handleCloseCancelConfirm = () => {
    setShowCancelConfirm(null);
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Payment for appointment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  useEffect(() => {
    // Apply filter whenever appointments or filterStatus changes
    let filtered = [...appointments];

    switch (filterStatus) {
      case "upcoming":
        filtered = appointments.filter(
          (appointment) => !appointment.cancelled && !appointment.isCompleted
        );
        break;
      case "cancelled":
        filtered = appointments.filter(
          (appointment) => appointment.cancelled && !appointment.isCompleted
        );
        break;
      case "completed":
        filtered = appointments.filter(
          (appointment) => appointment.isCompleted
        );
        break;
      default:
        break;
    }
    setFilteredAppointments(filtered);
  }, [appointments, filterStatus]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700">My appointments</p>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            filterStatus === "all"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            filterStatus === "upcoming"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleFilterChange("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            filterStatus === "cancelled"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleFilterChange("cancelled")}
        >
          Cancelled
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filterStatus === "completed"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </button>
      </div>

      <div className="">
        {filteredAppointments.length === 0 ? (
          <p className="text-gray-500">
            No appointments found for the selected filter.
          </p>
        ) : (
          filteredAppointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b relative" // Added relative for positioning confirm box
            >
              {showCancelConfirm?.id === item._id && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-10">
                  <div className="bg-white p-6 rounded-md shadow-md">
                    <p className="text-lg font-semibold mb-2">Confirm Cancellation</p>
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to cancel this appointment?
                      {item.payment && (
                        <>
                          {" "}
                          Your payment will be returned within 3 business days.
                        </>
                      )}
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleCloseCancelConfirm}
                        className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConfirmCancel(item._id)}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}{" "}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && !item.payment && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => handleInitiateCancel(item._id, item.payment)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Appointment completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;