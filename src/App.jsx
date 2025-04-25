import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReadPage from "./pages/ReadPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminDashBoardPage from "./pages/AdminDashBoardPage.jsx";
import MemberDetailsPage from "./pages/MemberDetailsPage.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AdminLoginPage/>}/>
                <Route path="/" element={<AdminDashBoardPage />} />
                <Route path="/MemberDetails/:id" element={<MemberDetailsPage />} />
                <Route path="/update/:id" element={<AdminLoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;