import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Campaign from './component/Campaign';
import SendMessageToCampaign from './component/Createmessage';
import CampaignList from './component/CampaignList';
import SignIn from './auth/Signin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/CampaignList" element={<CampaignList/>}/>
        <Route path ="/create-campaign" element={<Campaign/>}/>
        <Route path="/send-message" element={<SendMessageToCampaign />} />
      </Routes>
    </Router>
  );
};

export default App;
