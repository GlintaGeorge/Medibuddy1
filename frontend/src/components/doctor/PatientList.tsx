import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosJWT from "../../utils/axiosService";
import { DOCTOR_API } from "../../constants";
import { RootState } from "../../redux/reducer/reducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

interface BookingDetail {
  _id: string;
  patientName: string;
  patientAge: number;
  date: string;
  timeSlot: string;
}

const AppointmentDetails: React.FC = () => {
  const id = useSelector((state: RootState) => state.DoctorSlice.id);

  const [bookingDetails, setBookingDetails] = useState<BookingDetail[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosJWT.get(`${DOCTOR_API}/bookingdetails/${id}`);
        const bookingData = response.data.data.bookingDetails;
        const sortedBookingData = bookingData.sort(
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBookingDetails(sortedBookingData);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
  }, [id]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const filteredAppointments = bookingDetails.filter((bookingDetail) => {
    if (!selectedDate) return true;
    return (
      new Date(bookingDetail.date).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
    );
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Appointment List</h1>

      <div className="flex justify-start mb-4">
        <div className="w-full max-w-xs relative">
          <div className="border border-gray-500 shadow-lg rounded-md relative">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="rounded-md px-4 py-2 w-full pl-10"
              placeholderText="Select Date"
            />
            <div className="absolute top-3 left-2 text-gray-700">
              <FaCalendarAlt />
            </div>
          </div>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-xl text-center">You have no appointments booked.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAppointments.map((bookingDetail) => (
            <div
              key={bookingDetail._id}
              className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-200 cursor-pointer transition duration-300"
              onClick={() => (window.location.href = `/patient-details/${bookingDetail._id}`)}
            >
              <h2 className="text-xl font-bold mb-2">{bookingDetail.patientName}</h2>
              <p className="text-gray-700 mb-1">Age: {bookingDetail.patientAge}</p>
              <p className="text-gray-700 mb-1">Date: {formatDate(bookingDetail.date)}</p>
              <p className="text-gray-700">Time Slot: {bookingDetail.timeSlot}</p>
              <Link
                to={`/patient-details/${bookingDetail._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {filteredAppointments.length > itemsPerPage && (
        <div className="mt-8 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1 ? "bg-fuchsia-800 text-white" : "bg-gray-300"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;
