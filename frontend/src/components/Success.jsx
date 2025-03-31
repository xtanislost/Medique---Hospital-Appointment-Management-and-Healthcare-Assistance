import React, { useState } from 'react'; // Import useState
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer'; // Import useInView

const SuccessStoriesNumbers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once when the section enters the viewport
    threshold: 0.2, // Trigger when 20% of the section is visible
  });
  const [animationStarted, setAnimationStarted] = useState(false);

  // Start the animation when the section comes into view
  React.useEffect(() => {
    if (inView && !animationStarted) {
      setAnimationStarted(true);
    }
  }, [inView, animationStarted]);

  return (
    <div ref={ref} className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden">
      <div className="p-6 md:p-10 w-full">
        <h2 className="text-3xl font-semibold mb-8 text-white">Our Success By the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-md p-6 shadow-md hover:scale-105 transition-all">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faHeart} className="w-8 h-8 text-blue-500 mr-4" />
              <h3 className="text-xl font-semibold text-gray-700">Patient Satisfaction</h3>
            </div>
            <p className="text-3xl font-bold text-primary">
              {animationStarted && <CountUp end={98} suffix="%" duration={3} />}
              {!animationStarted && "0%"} {/* Display 0% initially */}
            </p>
            <p className="text-gray-600">Average satisfaction rate based on patient surveys.</p>
          </div>
          <div className="bg-white rounded-md p-6 shadow-md hover:scale-105 transition-all">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faClock} className="w-8 h-8 text-green-500 mr-4" />
              <h3 className="text-xl font-semibold text-gray-700">Reduced Wait Times</h3>
            </div>
            <p className="text-3xl font-bold text-green-500">
              {animationStarted && <CountUp end={70} suffix="%" duration={3} />}
              {!animationStarted && "0%"} {/* Display 0% initially */}
            </p>
            <p className="text-gray-600">Decrease in average wait time for appointments.</p>
          </div>
          <div className="bg-white rounded-md p-6 shadow-md hover:scale-105 transition-all">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-indigo-500 mr-4" />
              <h3 className="text-xl font-semibold text-gray-700">Successful Procedures</h3>
            </div>
            <p className="text-3xl font-bold text-indigo-500">
              {animationStarted && <CountUp end={1000} prefix="+" duration={3} separator="," />}
              {!animationStarted && "+0"} {/* Display +0 initially */}
            </p>
            <p className="text-gray-600">Successful surgical procedures performed last year.</p>
          </div>
          {/* Add more statistic cards here */}
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesNumbers;