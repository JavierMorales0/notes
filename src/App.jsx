//import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeView />}>
        <Route path='invoices' element={<Invoices />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

function Invoices() {
  return (
    <h1>
      Invoices created because i really know you are using a new code formatter
    </h1>
  );
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

export default App;
