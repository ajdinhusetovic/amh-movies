import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormPage from './pages/FormPage';
import Movies from './pages/Movies';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  const client = new QueryClient();

  return (
    <div className="App">
      <SkeletonTheme baseColor="#666666" highlightColor="#525252">
        <QueryClientProvider client={client}>
          <Router>
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route path="/" element={<FormPage />} />
              <Route path="/movies" element={<Movies />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </SkeletonTheme>
    </div>
  );
}

export default App;
