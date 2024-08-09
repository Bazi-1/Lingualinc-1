import { useState } from "react";
import { BrowserRouter as Router, NavLink, Route, Routes, useParams } from "react-router-dom";
import SignInForm from "./Pages/SignInForm.tsx";
import SignUpForm from "./Pages/SignUpForm.tsx";
import TranslationView from "./Pages/googletranslatorAPI.tsx";
import WelcomeView from "./Pages/WelcomePage.tsx";
import HomeView from "./Pages/HomePage.tsx";
import FeedbackPage from "./Pages/CreatingSession.tsx";
import MeetingPage from "./Pages/MeetingPage.tsx";
import { WebRTCProvider } from "./Pages/WebRtcContext.tsx";
import Hostmeeting from "./Pages/hostmeeting";
import ProtectedRoute from "./services/routeprotection.tsx";
import Host from "./Pages/hostview.tsx";
import MeetingView from "./Pages/usermeetingview.tsx";
import React from "react";
import Bot from "./Pages/bot.tsx";
import CurrentMeetings from "./Pages/meetingview.tsx";
/**
 * Main application component setting up routes and navigation.
 * @returns {React.Component} The App component.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { sessionId } = useParams();
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  const MeetingViewWithSession = ({ ViewComponent }) => {
   

    if (!sessionId) {
      // Handle the case where sessionId is undefined
      return <div>Session ID is required.</div>;
    }

    return (
      <WebRTCProvider sessionId={1}>
        <ViewComponent />
      </WebRTCProvider>
    );
  };




  return (
    <Routes>
      <Route path="/" element={<WelcomeView />} />
      <Route path="/host-meeting" element={<ProtectedRoute><Hostmeeting /></ProtectedRoute>} />
      <Route path="/sign-up" element={<SignUpForm onRegister={handleRegister} />} />
      <Route path="/sign-in" element={<SignInForm onLogin={handleLogin} />} />
      <Route path="/HomeView" element={<ProtectedRoute><HomeView /></ProtectedRoute>} />
      <Route path="/CSView" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
      <Route path="/MeetingView" element={<ProtectedRoute><CurrentMeetings /></ProtectedRoute>} />
      <Route path="/TranslateView" element={<ProtectedRoute><TranslationView /></ProtectedRoute>} />
      <Route path="/host-view" element={<ProtectedRoute><Host /></ProtectedRoute>} />
      <Route path="/meetingViews/:sessionId" element={<ProtectedRoute><MeetingView /></ProtectedRoute>} />
      <Route path="/botview" element={<ProtectedRoute><Bot /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
 

 