import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./context/AppContext";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing_page";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import HelpPage from "./pages/Help.jsx";
import AboutUs from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import AllCarBookingsPage from "./pages/AllCarBookingsPage.jsx";
import AddCarBookingPage from "./pages/Add_car_page.jsx";
import EditCarPage from "./pages/Edit_Car_Page.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const ProtectedRoute = ({ element: Component, ...rest }) => {
	const { cookies, navigate, setUser, setIsAdmin } = useContext(AppContext);
	useEffect(() => {
		if (cookies.token) {
			setUser(cookies.user);
			setIsAdmin(cookies.user.role === "Admin");
		} else {
			navigate("/login");
		}
	}, []);

	// If no token, return null (handled in useEffect with navigation)
	if (!cookies.token) return null;

	// Render the protected component if authenticated
	return <Component {...rest} />;
};

function App() {
	return (
		<div className="bg-gradient-to-r from from-blue-900 via-purple-600  to-black min-h-screen w-screen m-0 p-0">
			<ErrorBoundary>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/help" element={<HelpPage />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/dashboard"
						element={<ProtectedRoute element={Dashboard} />}
					/>
					<Route
						path="/booking/:id"
						element={<ProtectedRoute element={BookingPage} />}
					/>
					<Route
						path="/carbookings"
						element={<ProtectedRoute element={AllCarBookingsPage} />}
					/>
					<Route
						path="/add-car"
						element={<ProtectedRoute element={AddCarBookingPage} />}
					/>
					<Route
						path="/edit-car/:id"
						element={<ProtectedRoute element={EditCarPage} />}
					/>
					<Route
						path="/success"
						element={<ProtectedRoute element={SuccessPage} />}
					/>
				</Routes>
			</ErrorBoundary>
		</div>
	);
}

export default App;
