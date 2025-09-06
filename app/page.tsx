import Image from "next/image";
import Navbar from "./navbar/page";

export default function Home() {
  return (
      <div className="text-center">
        <div>
          <Navbar />
        </div>

      <h2 className="text-3xl font-bold mb-4">Welcome to the Home Page</h2>
      <p className="text-gray-700">
        This is a simple Next.js 13 page using the new App Router and Tailwind CSS.
      </p>
    </div>

    
  );
}
