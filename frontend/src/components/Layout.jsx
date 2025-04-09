import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Main content area that will grow and push footer to bottom */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
