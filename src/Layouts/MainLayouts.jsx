import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <main className="flex-1 w-full overflow-y-auto flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;