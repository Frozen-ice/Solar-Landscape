import './App.css';
import EnrollmentForm from './components/EnrollmentForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />
      <EnrollmentForm />
    </div>
  );
}

export default App;