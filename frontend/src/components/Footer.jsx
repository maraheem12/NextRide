import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} NextRide. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="/privacy-policy" className="text-blue-400 hover:underline mx-2">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-blue-400 hover:underline mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
