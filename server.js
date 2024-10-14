import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app
app.use(express.static(join(__dirname, 'dist')));

// Sample job data (replace this with a database in a real application)
const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'New York, NY',
    description: 'We are looking for a talented software engineer to join our team...',
    postedDate: '2024-03-01',
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'DataTech',
    location: 'San Francisco, CA',
    description: 'Seeking a data scientist with experience in machine learning and big data...',
    postedDate: '2024-03-02',
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'DesignHub',
    location: 'Chicago, IL',
    description: 'Join our creative team as a UX designer and help shape the future of our products...',
    postedDate: '2024-03-03',
  },
];

// API endpoint for job search
app.get('/api/jobs', (req, res) => {
  const { query, city } = req.query;
  let filteredJobs = jobs;

  if (query) {
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (city) {
    filteredJobs = filteredJobs.filter(job =>
      job.location.toLowerCase().includes(city.toLowerCase())
    );
  }

  res.json(filteredJobs);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});