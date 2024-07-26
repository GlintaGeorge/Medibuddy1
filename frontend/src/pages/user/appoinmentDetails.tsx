import React, { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar/Navbar";
import axiosJWT from "../../utils/axiosService";
import { CHAT_API, USER_API } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import showToast from "../../utils/toaster";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import axios from "axios";
import { useAppSelector } from "../../redux/store/Store";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { jsPDF } from "jspdf";
import { DoctorInterface } from "../../types/DoctorInterface"; // Adjust the path accordingly

// Define the Prescription and Medicine interfaces
interface Medicine {
  name: string;
  dosage: string | number; // Dosage can be string or number
  instructions: string;
}

interface Prescription {
  prescriptionDate: string | Date; // Date can be string or Date object
  medicines: Medicine[];
}

const AppointmentDetails: React.FC = () => {
  const user = useAppSelector((state) => state.UserSlice);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [doctorDetails, setDoctorDetails] = useState<DoctorInterface | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const userID = user.id;
  const userName = user.name;
  const appID = 776225947;
  const serverSecret = "2c92722a5b1c4470fd0709decb137d9b";
  //@ts-ignore
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);

  const zp = ZegoUIKitPrebuilt.create(TOKEN);
  zp.addPlugins({ ZIM });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/bookingdetails/${id}`);
        const bookingData = response.data.data.bookingDetails;
        console.log(bookingData,'This is the Booking details.....................')
        setBookingDetails(bookingData);

        const doctorResponse = await axiosJWT.get(`${USER_API}/doctors/${bookingData.doctorId}`);
        setDoctorDetails(doctorResponse.data.doctor);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        
      }
    };
    fetchBookingDetails();
  }, [id]);

  const handleCancelAppointment = async () => {
    try {
      await axiosJWT.put(`${USER_API}/bookingdetails/${id}`, {
        appoinmentStatus: "Cancelled",
        cancelReason,
      });
      setBookingDetails((prevState: any) => ({
        ...prevState,
        appoinmentStatus: "Cancelled",
      }));
      showToast("Appointment Cancelled", "success");
      setShowModal(false);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleReschedule = () => {
    // if (bookingDetails.consultationType === "Online") {
      navigate(`/appoinmentOnline/${bookingDetails.doctorId}`);
    // } 
  };

  const renderStatus = () => {
    if (bookingDetails.appoinmentStatus === "Booked") {
      return (
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-5"
        >
          Cancel Appointment
        </button>
      );
    } else if (bookingDetails.appoinmentStatus === "Cancelled") {
      return (
        <div className="flex justify-between items-center">
          <p className="text-red-500">Appointment Cancelled</p>
          <button
            onClick={handleReschedule}
            className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded"
          >
            Reschedule Appointment
          </button>
        </div>
      );
    } else if (bookingDetails.appoinmentStatus === "Consulted") {
      return <p className="text-green-500">Consultation Completed</p>;
    }
  };

  const showPrescription = async (appoinmentId: string) => {
    const data = { appoinmentId };
    const response = await axiosJWT.post(`${USER_API}/fetchPrescription`, data);

    if (response.data && response.data.response) {
      setPrescription(response.data.response);
      setShowPrescriptionModal(true);
    } else {
      showToast("No prescription added by the doctor", "error");
    }
  };

  const downloadPrescription = () => {
  if (!prescription) {
    showToast("No prescription available to download", "error");
    return;
  }

  // Create PDF document using jsPDF
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("MEDIBUDDY",20,20)
  doc.setFontSize(10);
  
  doc.text( "Your Trusted Health Partner", 20, 25);
  doc.setFontSize(12);
  doc.text( `Doctor Name: ${doctorDetails?.doctorName}`,20 , 40  );
  doc.text( `Prescription Date: ${String(prescription.prescriptionDate)}`,20, 50);

  doc.text( "Medicines:",20 , 60 );
  let y = 70;
  prescription.medicines?.forEach((medicine: Medicine) => {
    doc.text(`Name: ${medicine.name}`,20 , y  );
    doc.text(`Dosage: ${String(medicine.dosage)}`,70  , y  );
    doc.text(`Instructions: ${medicine.instructions}`,120 , y );
    y += 20;
  });

  // Save the PDF
  doc.save("prescription.pdf");
};

  const closeModal = () => {
    setShowPrescriptionModal(false);
    setPrescription(null);
  };

  const handleChat = () => {
    axios
      .post(CHAT_API + `/conversations`, {
        senderId: user.id,
        recieverId: doctorDetails?._id,
      })
      .then(() => {
        navigate("/chat");
      })
      .catch(() => {
        console.log("error in sending chat");
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Booking Details</h1>

        {bookingDetails && doctorDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-fuchsia-50 p-6 rounded-lg shadow-md border border-fuchsia-200">
              <div className="flex items-center mb-4">
                <img
                  src={doctorDetails.profileImage}
                  alt={doctorDetails.doctorName}
                  className="w-40 h-40 rounded mr-4"
                />
                <div>
                  <h2 className="text-2xl font-bold">
                    {doctorDetails.doctorName}
                  </h2>
                  <p>{doctorDetails.department}</p>
                  <p className="text-green-600 font-semibold">Verified</p>
                  <div className="flex">
                    <button
                      onClick={() => handleChat()}
                      className="bg-fuchsia-800 flex hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded mt-3"
                    >
                      <FiMessageSquare className="mr-2 mt-1" />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-fuchsia-50 p-6 rounded-lg shadow-md border border-fuchsia-200">
              <h2 className="text-2xl font-bold mb-4">Scheduled Appointment</h2>
              <div>
                <p className="font-medium">
                  Date: {new Date(bookingDetails.date).toLocaleDateString()}
                </p>
                <p className="font-medium">Time: {bookingDetails.timeSlot}</p>
                <p className="font-medium">
                  Patient Name: {bookingDetails.patientName}
                </p>
                <p className="font-medium">
                  Patient Age: {bookingDetails.patientAge}
                </p>
                <p className="font-medium">
                  Patient Gender: {bookingDetails.patientGender}
                </p>
                {renderStatus()}
              </div>
            </div>

            <div className="bg-fuchsia-50 p-6 rounded-lg shadow-md border border-fuchsia-200">
              <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
              <p className="font-medium">
                Consultation Type: {bookingDetails.consultationType}
              </p>
              <p className="font-medium">
                Booking Time:{" "}
                {new Date(bookingDetails.createdAt).toLocaleString()}
              </p>
              <p className="font-medium">
                Booking Status: {bookingDetails.appoinmentStatus}
              </p>
              
              <p className="font-medium">
                Payment Amount: ₹ {bookingDetails.fee}
              </p>
              <button
                className="bg-fuchsia-800 flex hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded mt-5"
                onClick={() => showPrescription(bookingDetails._id)}
              >
                <FaFilePdf className="mr-2 mt-1" />
                View Prescription
              </button>
            </div>

            
          </div>
        )}

        {showModal && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Cancel Appointment
                      </h3>
                      <div className="mt-2">
                        <textarea
                          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                          rows={4}
                          placeholder="Enter cancellation reason"
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCancelAppointment}
                  >
                    Cancel Appointment
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showPrescriptionModal && prescription && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Prescription
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Prescription Date:{" "}
                          {new Date(prescription.prescriptionDate).toLocaleDateString()}
                        </p>
                        <ul>
                          {prescription.medicines?.map((medicine, index) => (
                            <li key={index}>
                              <p>
                                Name: {medicine.name}, Dosage: {medicine.dosage}, Instructions:{" "}
                                {medicine.instructions}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={downloadPrescription}
                  >
                    <FaDownload className="mr-2" />
                    Download Prescription
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppointmentDetails;
