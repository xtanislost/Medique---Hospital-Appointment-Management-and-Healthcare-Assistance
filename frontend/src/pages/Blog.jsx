import React from 'react';
import { assets } from '../assets/assets';

const Blog = () => {
    const blogPosts = [
        {
          id: 1,
          title: 'Tips for a Balanced Life',
          description: 'Maintaining a healthy lifestyle involves a balanced diet, regular exercise, and stress management. Eating fresh fruits and vegetables, staying hydrated, and ensuring quality sleep can greatly improve overall well-being.',
          image: assets.food,
        },
        {
          id: 2,
          title: 'The Power of Regular Checkups',
          description: 'Routine medical checkups can help detect health issues early, making treatment more effective. Regular screenings, vaccinations, and doctor consultations ensure long-term well-being and disease prevention.',
          image: assets.checkup,
        },
        {
          id: 3,
          title: 'Exercise: A Key to Mental and Physical Health',
          description: 'Engaging in physical activities like walking, yoga, or strength training not only improves fitness but also boosts mental health. Exercise releases endorphins, reducing stress and enhancing mood.',
          image: assets.healthy,
        },
      ];
    
      return (
        <div className='px-6 py-10'>
          <div className='text-center text-3xl font-semibold text-navy-700 mb-10'>
            <p>OUR <span className='text-black'>BLOG</span></p>
          </div>
    
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {blogPosts.map((post) => (
              <div key={post.id} className='bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300'>
                <img className='w-full h-56 object-cover rounded-xl' src={post.image} alt={post.title} />
                <h3 className='mt-4 text-xl font-bold text-gray-800'>{post.title}</h3>
                <p className='mt-2 text-gray-600'>{post.description}</p>
                <button className='mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all duration-300'>Read More</button>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default Blog;
    