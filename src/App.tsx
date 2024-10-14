import React, { useState } from 'react';
import { Search } from 'lucide-react';
import JobList from './components/JobList';
import SearchForm from './components/SearchForm';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string, city: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs?query=${query}&city=${city}`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Job Search Portal</h1>
          <p className="text-gray-600">Find your dream job today</p>
        </header>
        <SearchForm onSearch={handleSearch} />
        {loading ? (
          <div className="text-center mt-8">
            <Search className="animate-spin h-8 w-8 text-blue-500 mx-auto" />
            <p className="mt-2 text-gray-600">Searching for jobs...</p>
          </div>
        ) : (
          <JobList jobs={jobs} />
        )}
      </div>
    </div>
  );
}

export default App;