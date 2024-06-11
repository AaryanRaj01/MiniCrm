import React, { useState, useContext } from 'react';
import NameContext from '../ContextHook/NameContext';

const SendMessageToCampaign = () => {
  const { name } = useContext(NameContext);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/customerlog/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, message })
      });

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error('Error sending message:', error);
      setResult('Error sending message. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white"> {/* Use secondary color */}
      <div className="w-full max-w-md bg-fourthCustomColor shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Send Message to Campaign Audience</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">Message:</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" required className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="bg-CustomButtonCOlor hover:bg-navBarcolor text-black font-bold py-2 px-4 rounded  focus:outline-none focus:bg-blue-700">Send Message</button>
        </form>
        {result && <div className="mt-4 text-center text-green-600">{result}</div>}
      </div>
    </div>
  );
};

export default SendMessageToCampaign;
