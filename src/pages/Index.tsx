
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading Lumina Learn Nexus...</h1>
        <p className="text-xl text-gray-600">Please wait while we redirect you...</p>
      </div>
    </div>
  );
};

export default Index;
