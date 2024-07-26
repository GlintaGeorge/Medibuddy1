import { useState, useEffect } from "react";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";

const AppointmentsListPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Fetch appointments data from API
    const fetchAppointments = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/allAppoinments`);
        const sortedAppointments = response.data.bookings.bookingDetails.sort(
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setAppointments(sortedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString: string) => {
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentAppointments = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-fuchsia-950">Appointments List</h1>

      {appointments.length === 0 ? (
        <p className="text-xl">You have no appointments booked.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAppointments.map((appointment: any) => (
            <div
              key={appointment._id}
              className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-200 cursor-pointer transition duration-300"
              onClick={() =>
                (window.location.href = `/appoinmentDetails/${appointment._id}`)
              }
            >
              <h2 className="text-xl font-bold mb-2">{appointment.patientName}</h2>
              <p className="text-gray-700 mb-1">Age: {appointment.patientAge}</p>
              <p className="text-gray-700 mb-1">Date: {formatDate(appointment.date)}</p>
              <p className="text-gray-700">Time Slot: {appointment.timeSlot}</p>
            </div>
          ))}
        </div>
      )}

      {appointments.length > itemsPerPage && (
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

export default AppointmentsListPage;
