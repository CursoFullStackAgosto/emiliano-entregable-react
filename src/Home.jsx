import React from "react";
import Header from "./components/pages/main/header.jsx";
import Body from "./components/pages/main/body.jsx";
import Footer from "./components/pages/main/footer.jsx";
import "./assets/styles/_global.scss";

function Home() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default Home;
