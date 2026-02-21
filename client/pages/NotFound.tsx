import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Seo from '@site/components/Seo';
import Layout from '@site/components/layout/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <Seo
        title="404 - Page Not Found"
        description="The page you are looking for does not exist."
        noindex={true}
      />
      
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-2xl mx-auto px-4">
          <p className="font-playfair text-[clamp(4rem,10vw,120px)] font-light text-neo-blue mb-4 leading-none">
            404
          </p>
          <h1 className="font-outfit text-2xl font-semibold text-gray-900 mb-3">
            Page not found
          </h1>
          <p className="font-outfit text-base text-gray-500 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-neo-blue text-white font-outfit font-semibold px-8 py-3 rounded-lg hover:bg-neo-blue-dark transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
