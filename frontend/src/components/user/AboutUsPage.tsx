import React from 'react';
import aboutimg from '../../assets/images/aboutus.jpg';
import { Transition } from '@headlessui/react';

const AboutPage: React.FC = () => {
  return (
    <>
      <div
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutimg})` }}
      >
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-between px-20 mx-20">
          
          <img
            src={aboutimg}
            alt="About img"
            className="w-1/2 h-auto hidden"
          />
        </div>
      </div>

      <section className="bg-gradient-to-r bg-gray-200 py-16 sm:px-8 lg:px-12 m-10 rounded-xl">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-700">
              Your Trusted Buddy For Better Health
            </h2>
            <p className="text-m text-gray-500 mt-4">
              Here are some of the ways that we enable our people to do their
              very best work
            </p>
            <div className="max-w-max">
            <h1 className="text-6xl font-medium text-black mb-10">About Us</h1>
            <h2 className="text-2xl font-semibold text-black mb-8">
              MediBuddy is India's largest and most trusted patient engagement
              platform with over 21,000 listed doctors and millions of active patients
            </h2>

            <p>
            WE ARE MEDIBUDDY. AN END-TO-END DIGITAL HEALTHCARE PLATFORM.
            </p>
            <p>
When the webslinger wears his red and blue suit, he's ready to save a life. Same rule applies to us at MediBuddy. We’re no fictional superhero, but we do know how to weave a web of doctors, hospitals, healthcare providers, pharmaceuticals, and insurance companies to create a world of possibilities for people looking for healthcare assistance.
            </p>
            
          </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Transition
              show={true}
              enter="transform transition duration-500"
              enterFrom="opacity-0 translate-y-10"
              enterTo="opacity-100 translate-y-0"
              leave="transform transition duration-500"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-10"
            >
              <div className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition duration-300">
                <div className="flex items-center mb-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8404/8404154.png"
                    alt="img"
                    className="w-8 h-8"
                  />
                  <h3 className="text-2xl font-semibold text-gray-900 ml-4">
                    Simplified Booking
                  </h3>
                </div>
                <p className="text-sm text-gray-700">
                  Our platform streamlines the appointment booking process,
                  allowing users to find and book appointments with doctors in
                  just a few clicks. Say goodbye to long waiting times and phone
                  calls.
                </p>
              </div>
            </Transition>

            <div className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition duration-300">
              <div className="flex items-center mb-3">
                <img
                  src="https://th.bing.com/th/id/OIP.UwQEQw1R7d2KeY6lQMv68wHaHa?w=680&h=680&rs=1&pid=ImgDetMain"
                  alt="img"
                  className="w-8 h-8"
                />
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">
                  Unique Features
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                We offer a range of unique features, including real-time
                availability of doctors, patient reviews and ratings,
                telemedicine options, and personalized recommendations based on
                user preferences.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition duration-300">
              <div className="flex items-center mb-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1247/1247720.png"
                  alt="img"
                  className="w-8 h-8"
                />
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">
                  Advantages
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                Our platform provides several advantages over traditional
                booking methods, such as 24/7 accessibility, comprehensive
                doctor profiles, appointment reminders, and easy rescheduling
                options.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative w-full h-[60vh] bg-gray-50 flex flex-col justify-center items-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-fuchsia-800 pt-10 pb-5">
            Our Mission
          </h2>
          <h1 className="text-5xl font-medium text-gray-700 py-5 mx-20">
            To enable the best healthcare <br />
            experience for everyone in
            <br />
            India
          </h1>
        </div>
        <img
          src="https://th.bing.com/th/id/OIP.mtk6_JOBVNCid9qUf3UG4QHaHa?pid=ImgDet&w=200&h=200&c=7&dpr=1.3"
          alt="img"
          className="w-1/20 h-1/3"
        />
      </div>
    </>
  );
};

export default AboutPage;
