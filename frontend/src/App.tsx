import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/loginPage';
import HomePage from './components/pages/home';
import CriarPin from './components/pages/criarPin';
import UserPage from './components/pages/userPage';
import UserInfos from './components/pages/userInfos';
import SecUserPage from './components/pages/secUserPage';
import IndividualPin from './components/pages/individualPin';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/criarPin" element={<CriarPin />} />
                <Route path="/userPage" element={<UserPage />} />
                <Route path="/userInfos" element={<UserInfos />} />
                <Route path="/secUserPage" element={<SecUserPage />} />
                <Route path="/individualPin" element={<IndividualPin />} />
            </Routes>
        </Router>
    );
}