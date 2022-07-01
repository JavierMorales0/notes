//import './App.css';
import { Routes, Route } from 'react-router-dom';
import MasterView from './views/MasterView.jsx';
import ProfileView from './views/ProfileView.jsx';
import HomeView from './views/HomeView.jsx';
function App() {
  return (
    <Routes>
      <Route path='/' element={<MasterView />}>
        <Route path='' element={<HomeView />} />
        <Route path='profile' element={<ProfileView />} />
      </Route>
    </Routes>
  );
}

export default App;
