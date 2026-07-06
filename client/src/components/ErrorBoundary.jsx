import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Log the error to an error reporting service
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Styled fallback UI matching the rent-vortex theme
			return (
				<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white p-6">
					<div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform hover:scale-[1.02] transition-all duration-300">
						<h1 className="text-3xl font-extrabold text-red-400 mb-4 tracking-wide">
							Application Error
						</h1>
						<p className="text-gray-300 mb-8 text-sm">
							An unexpected error occurred in this view. Please try returning to the dashboard.
						</p>
						<button
							onClick={() => {
								this.setState({ hasError: false });
								window.location.href = "/dashboard";
							}}
							className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 animate-pulse"
						>
							Back to Dashboard
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
