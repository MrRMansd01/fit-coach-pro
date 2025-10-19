import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import Pages
import ClientDashboard from './pages/ClientDashboard';
import CoachDashboard from './pages/CoachDashbord';
import CoachMarketplace from './pages/CoachMarketplace';
import AICoach from './pages/AICoach';
import WorkoutExecution from './pages/WorkoutExecution';
import Messages from './pages/Messages';
import CoachProfile from './pages/CoachProfile';
import ClientManagement from './pages/ClientManagement';
import ProgramBuilder from './pages/ProgramBuilder';

// Import Layout
import Layout from './layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/client-dashboard" replace />} />
          
          {/* Client Routes */}
          <Route path="/client-dashboard" element={
            <Layout currentPageName="ClientDashboard">
              <ClientDashboard />
            </Layout>
          } />
          
          <Route path="/coach-marketplace" element={
            <Layout currentPageName="CoachMarketplace">
              <CoachMarketplace />
            </Layout>
          } />
          
          <Route path="/ai-coach" element={
            <Layout currentPageName="AICoach">
              <AICoach />
            </Layout>
          } />
          
          <Route path="/workout-execution" element={
            <Layout currentPageName="WorkoutExecution">
              <WorkoutExecution />
            </Layout>
          } />
          
          {/* Coach Routes */}
          <Route path="/coach-dashboard" element={
            <Layout currentPageName="CoachDashboard">
              <CoachDashboard />
            </Layout>
          } />
          
          <Route path="/client-management" element={
            <Layout currentPageName="ClientManagement">
              <ClientManagement />
            </Layout>
          } />
          
          <Route path="/program-builder" element={
            <Layout currentPageName="ProgramBuilder">
              <ProgramBuilder />
            </Layout>
          } />
          
          <Route path="/coach-profile" element={
            <Layout currentPageName="CoachProfile">
              <CoachProfile />
            </Layout>
          } />
          
          {/* Shared Routes */}
          <Route path="/messages" element={
            <Layout currentPageName="Messages">
              <Messages />
            </Layout>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;