import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import FAQsAccordion from '../components/FAQsAccordion';
import SuccessStoriesNumbers from '../components/Success';


const Home = () => {
  const faqData = [
    { question: 'How do I book an appointment with a doctor?', answer: 'You can easily book an appointment by browsing our list of doctors, selecting the desired doctor, choosing an available time slot, and confirming your booking. You may need to create an account or log in to proceed.' },
    { question: 'What payment methods do you accept?', answer: 'We currently accept payments via credit card, debit card, and popular online wallets. More payment options may be added in the future.' },
    { question: 'Is my personal and payment information secure?', answer: 'Yes, we take your security very seriously. All personal and payment information is encrypted and processed through secure gateways to ensure your privacy and safety.' },
    { question: 'Can I reschedule or cancel my appointment?', answer: 'Yes, you can reschedule or cancel your appointment through your account on our platform. Please note that cancellations made within a certain timeframe before the appointment may be subject to a fee. Refer to our cancellation policy for more details.' },
    { question: 'How can I find a doctor that specializes in a specific condition?', answer: 'You can use our search filters to find doctors based on their specialization, location, and availability. You can also browse doctors by medical specialty.' },
    { question: 'What if I have an emergency?', answer: 'Our platform is designed for scheduling routine appointments. In case of a medical emergency, please contact your local emergency services immediately.' },
  ];



  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <SuccessStoriesNumbers/>
      <Banner />
      <FAQsAccordion faqs={faqData} />
      
    </div>
  );
};

export default Home;