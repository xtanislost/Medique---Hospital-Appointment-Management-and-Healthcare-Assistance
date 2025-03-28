

import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Aarav Sharma',
    rating: 5,
    review: 'The doctors are highly professional and friendly. They take the time to explain everything and make patients feel comfortable.',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
  {
    id: 2,
    name: 'Priya Verma',
    rating: 4,
    review: 'Hospital management is well-organized. The staff ensures smooth appointments and quick responses to queries.',
    avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
  },
  {
    id: 3,
    name: 'Rohan Iyer',
    rating: 5,
    review: 'Booking appointments through the website was seamless. The interface is clean and easy to use.',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    id: 4,
    name: 'Ananya Gupta',
    rating: 3,
    review: 'The doctors are experienced, but sometimes there is a slight delay in consultation timings.',
    avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
  },
  {
    id: 5,
    name: 'Vikram Mehta',
    rating: 4,
    review: 'Hospital staff is polite and cooperative. They handle emergencies efficiently, making patients feel safe.',
    avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
  },
  {
    id: 6,
    name: 'Neha Joshi',
    rating: 5,
    review: 'The website provides accurate information about doctors and hospital services. It’s very user-friendly.',
    avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
  },
  {
    id: 7,
    name: 'Rajesh Patel',
    rating: 3,
    review: 'Overall, the website is helpful, but adding a live chat support option would improve user experience.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 8,
    name: 'Meera Nair',
    rating: 5,
    review: 'The hospital management is excellent. Appointments are well-scheduled, and patient care is prioritized.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 9,
    name: 'Siddharth Reddy',
    rating: 4,
    review: 'Doctors provide clear explanations and listen to patient concerns. A very professional and caring environment.',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
];

const Review = () => {
  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <div className="text-center text-3xl font-semibold text-navy-700 mb-10">
        <p>USER <span className="text-black">REVIEWS</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <img className="w-14 h-14 rounded-full border border-gray-300" src={user.avatar} alt={user.name} />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <div className="flex">
                  {Array.from({ length: user.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">"{user.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
