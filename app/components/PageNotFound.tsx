
export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
            <a
                href="/"
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
                Go to Home
            </a>
        </div>
    );
}