import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../component/TopNavbar'; // Ensure the correct import path

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(5); // Number of campaigns per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://minicrm.onrender.com/api/fetchcustomerloglist/fetchcommunicationloglist');
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        setCampaigns(data.campaigns);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCampaigns();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);
  const maxPagesToShow = 4;

  const getPageNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= maxPagesToShow - 1) {
      return Array.from({ length: maxPagesToShow }, (_, i) => i + 1);
    }

    if (currentPage === totalPages) {
      return Array.from({ length: maxPagesToShow }, (_, i) => totalPages - maxPagesToShow + 1 + i);
    }

    return Array.from({ length: maxPagesToShow }, (_, i) => currentPage - (maxPagesToShow - 1) + i);
  };

  const pageNumbers = getPageNumbers();

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigationBar />
      <div className="flex flex-grow justify-center p-4 sm:p-6">
        <div className="w-full max-w-6xl bg-fourthCustomColor shadow-lg rounded-lg p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">Campaign List</h1>
          {error && <div className="text-red-500 mb-4 text-center">Error: {error}</div>}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate('/create-campaign')}
              className="bg-CustomButtonCOlor hover:bg-navBarcolor text-black font-bold py-2 px-4 rounded"
            >
              Create New Campaign
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-navBarcolor text-gray-700">
                <tr>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 text-sm sm:text-lg font-semibold text-left">Name</th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 text-sm sm:text-lg font-semibold text-left">Created At</th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 text-sm sm:text-lg font-semibold text-left">Size</th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 text-sm sm:text-lg font-semibold text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentCampaigns.map((campaign) => (
                  <tr key={campaign._id} className="hover:bg-overallBackground transition-colors">
                    <td className="py-2 sm:py-4 px-2 sm:px-6">{campaign.name}</td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">{new Date(campaign.createdAt).toLocaleString()}</td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">{campaign.selectedcustomersize}</td>
                    <td
                      className={`py-2 sm:py-4 px-2 sm:px-6 text-sm sm:text-lg font-semibold ${
                        campaign.status === 'sent'
                          ? 'text-green-600'
                          : campaign.status === 'failed'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {campaign.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {campaigns.length > campaignsPerPage && (
            <div className="flex justify-center mt-4">
              <ul className="flex">
                <li>
                  <button
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                    className="bg-white text-gray-700 font-semibold py-2 px-4 mx-1 rounded-l"
                  >
                    Prev
                  </button>
                </li>
                {pageNumbers.map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`${
                        pageNumber === currentPage
                          ? 'bg-gray-300 hover:bg-fourthCustomColor text-white'
                          : 'bg-gray-200 hover:bg-fourthCustomColor text-gray-700'
                      } font-semibold py-2 px-4 mx-1 rounded`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    className="bg-white text-gray-700 font-semibold py-2 px-4 mx-1 rounded-r"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* End of Pagination */}
        </div>
      </div>
    </div>
  );
};

export default CampaignList;
