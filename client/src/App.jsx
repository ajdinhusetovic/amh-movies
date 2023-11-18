import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormPage from './pages/FormPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FormPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
