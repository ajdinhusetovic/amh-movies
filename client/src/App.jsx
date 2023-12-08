import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormPage from './pages/FormPage';
import Movies from './pages/Movies';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
