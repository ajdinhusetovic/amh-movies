import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormPage from './pages/FormPage';
import Test from './pages/Test';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/movies" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
