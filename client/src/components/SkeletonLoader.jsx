import React from "react";

function SkeletonLoader() {
	// Render a grid of 4 skeleton card placeholders
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse border border-gray-200"
				>
					{/* Image Area */}
					<div className="w-full h-48 bg-gray-300"></div>

					{/* Content Area */}
					<div className="p-5 space-y-4">
						{/* Title */}
						<div className="h-6 bg-gray-300 rounded w-3/4"></div>

						{/* Subtitles / Capacities */}
						<div className="space-y-2">
							<div className="h-4 bg-gray-300 rounded w-1/2"></div>
							<div className="h-4 bg-gray-300 rounded w-5/6"></div>
						</div>

						{/* Action Buttons */}
						<div className="flex justify-between items-center pt-2">
							<div className="h-8 bg-gray-300 rounded w-24"></div>
							<div className="h-6 bg-gray-300 rounded w-16"></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default SkeletonLoader;
