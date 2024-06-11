import React, { useState, useEffect, useContext, useRef } from 'react';
import TopNavigationBar from '../component/TopNavbar';
import SendMessageToCampaign from '../component/Createmessage';
import NameContext from '../ContextHook/NameContext';

const FetchCustomers = () => {
  const { name, setName } = useContext(NameContext);

  const [criteria, setCriteria] = useState([]);
  const [logic, setLogic] = useState('and');
  const [result, setResult] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track form submission status

  const sendMessageRef = useRef(null); // Ref for SendMessageToCampaign component

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://minicrm.onrender.com/api/customerlog/fetch-customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, criteria, logic })
      });

      const data = await response.json();
      setResult(data.message);
      setSubmitted(true); // Set submitted to true after successful form submission
    } catch (error) {
      console.error('Error fetching customers:', error);
      setResult('Error fetching customers. Please try again later.');
    }
  };

  const handleAddCriteria = () => {
    setCriteria([...criteria, { field: 'total_spends', operator: '>', value: 0 }]);
  };

  useEffect(() => {
    // Scroll to SendMessageToCampaign component if form is submitted successfully
    if (submitted && sendMessageRef.current) {
      sendMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [submitted]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigationBar />
      <div className="flex flex-grow justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl bg-fourthCustomColor shadow-lg rounded-lg p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 text-center">Create Campaign</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="logic" className="block text-gray-700 font-bold mb-2">Logic:</label>
              <select
                id="logic"
                value={logic}
                onChange={(e) => setLogic(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="and">AND</option>
                <option value="or">OR</option>
              </select>
            </div>

            {criteria.map((criteriaItem, index) => (
              <div key={index} className="mb-4 grid sm:grid-cols-3 gap-4">
                <select
                  value={criteriaItem.field}
                  onChange={(e) =>
                    setCriteria((prevCriteria) => {
                      const updatedCriteria = [...prevCriteria];
                      updatedCriteria[index].field = e.target.value;
                      return updatedCriteria;
                    })
                  }
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="total_spends">Total Spends</option>
                  <option value="visits">Visits</option>
                  <option value="last_visited">Last Visited</option>
                </select>
                <select
                  value={criteriaItem.operator}
                  onChange={(e) =>
                    setCriteria((prevCriteria) => {
                      const updatedCriteria = [...prevCriteria];
                      updatedCriteria[index].operator = e.target.value;
                      return updatedCriteria;
                    })
                  }
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value=">">Greater Than</option>
                  <option value="<">Less Than</option>
                  <option value="=">Equal To</option>
                </select>
                <input
                  type="number"
                  value={criteriaItem.value}
                  onChange={(e) =>
                    setCriteria((prevCriteria) => {
                      const updatedCriteria = [...prevCriteria];
                      updatedCriteria[index].value = e.target.value;
                      return updatedCriteria;
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddCriteria}
              className="bg-CustomButtonCOlor hover:bg-navBarcolor text-black font-bold py-2 px-4 rounded"
            >
              Add Criteria
            </button>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-CustomButtonCOlor hover:bg-navBarcolor text-black font-bold py-2 px-4 rounded"
              >
                Add Campaign
              </button>
            </div>
          </form>

          {result && <div className="mt-4 text-center">{result}</div>}
        </div>
      </div>
      {/* Render SendMessageToCampaign only when the form is submitted */}
      {submitted && (
        <div className="mt-6 flex justify-center" ref={sendMessageRef}>
          <SendMessageToCampaign />
        </div>
      )}
    </div>
  );
};

export default FetchCustomers;
