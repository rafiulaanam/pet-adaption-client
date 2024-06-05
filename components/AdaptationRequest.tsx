// pages/adoption-request.js
"use client"
import { useState } from 'react';
import toast from 'react-hot-toast';

const AdoptionRequestForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      phone,
      additionalInfo,
      termsAndConditions,
    };
  
    try {
      const response = await fetch(`/api/adaption-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Adoption request submitted successfully!")
        console.log('Adoption request submitted successfully!');
      } else {
        console.error('Error submitting adoption request:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting adoption request:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 mb-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Pet Adoption Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additional-info">
            Additional Information
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="additional-info"
            value={additionalInfo}
            onChange={(event) => setAdditionalInfo(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="terms-and-conditions">
            I agree to the terms and conditions
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="terms-and-conditions"
            type="checkbox"
            checked={termsAndConditions}
            onChange={(event) => setTermsAndConditions(event.target.checked)}
            required
          />
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdoptionRequestForm;