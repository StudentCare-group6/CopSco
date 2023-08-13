import React from 'react';


const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center'>KEY FEATURES</h1>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center py-8'>Report Violations</h2>
              <p className='text-center text-4xl font-bold'>$149</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Low data cost</p>
                  <p className='py-2 border-b mx-8'>User freindly UI</p>
                  <p className='py-2 border-b mx-8'>Track progress</p>
              </div>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center py-8'>Manage Fines</h2>
              <p className='text-center text-4xl font-bold'>$149</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>View fines</p>
                  <p className='py-2 border-b mx-8'>Accept or Appeal</p>
                  <p className='py-2 border-b mx-8'>View Legal Status</p>
              </div>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center py-8'>Pay Fines</h2>
              <p className='text-center text-4xl font-bold'>$149</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Online payments</p>
                  <p className='py-2 border-b mx-8'>Secure platform</p>
                  <p className='py-2 border-b mx-8'>View status</p>
              </div>
          </div>

      </div>
    </div>
  );
};

export default Cards;
