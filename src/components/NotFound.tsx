const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="inline-block bg-primary-color text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
        Go Home
      </a>
    </div>
  </div>
)

export default NotFound