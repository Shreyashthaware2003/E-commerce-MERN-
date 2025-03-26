import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import './App.css'
import Account from "./pages/Account";
import Home from "./pages/Home";
import Listing from "./pages/Listing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout component wraps all routes and includes the Header */}
        <Route path="/" element={<Layout />}>
          <Route path='/account' element={<Account />} />
          <Route path="/" index element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />  */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
