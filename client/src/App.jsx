import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormPage from './pages/FormPage';
import Movies from './pages/Movies';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
