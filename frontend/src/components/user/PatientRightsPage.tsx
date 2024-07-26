import React from 'react';

const PatientRights: React.FC = () => {
  return (
    <div className="container mx-auto px-20 py-8">
      <h1 className="text-3xl text-fuchsia-800 font-bold mb-8 text-center">Patient Rights and Responsibilities</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl text-fuchsia-700 font-bold mb-3">Patient Rights</h2>
          <ul className="list-disc pl-5">
            <li>Right to get considerate and respectful care.</li>
            <li>Right to information.</li>
            <li>Right to give informed consent.</li>
            <li>Right to privacy.</li>
            <li>Right to confidentiality.</li>
            <li>Right to obtain reasonable care and treatment.</li>
            <li>Right to get copies of all medical records.</li>
            <li>Right to know whether the patient is part of any trial or clinical research.</li>
            <li>Right to get details of treatment cost/payments.</li>
            <li>Right to expect continuity of care.</li>
            <li>Right to obtain a second opinion.</li>
            <li>Right to refuse treatment.</li>
            <li>To prompt resolution of complaints and to be informed about the complaint resolution process.</li>
            <li>To be free from all forms of abuse or harassment.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-fuchsia-700 font-bold mb-3 ">Patient Responsibilities</h2>
          <ul className="list-disc pl-5 ">
            <li>Provide accurate, relevant information for proper diagnosis, treatment, rehabilitation, and counseling purposes.</li>
            <li>Comply and follow doctors' instructions diligently.</li>
            <li>Inform the physician in case of any problems.</li>
            <li>Take preventive measures in case of infectious diseases.</li>
            <li>Enquire about the costs of treatment.</li>
            <li>Make payment of bills.</li>
            <li>Take care and protect the hospital environment.</li>
            <li>Utilize the health system properly and do not abuse/monopolize it.</li>
            <li>Respect the autonomy of doctors, nurses, and other staff.</li>
            <li>Treat doctors and nurses with respect.</li>
            <li>Follow the “NO SMOKING POLICY” of the hospital.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientRights;
