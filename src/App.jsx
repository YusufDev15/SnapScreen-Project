import Header from "./components/Navbar/Header";
import Content from "./components/LandingPage/contentR";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/SearchPage/search";
import { useState } from "react";
import NotFound from "./components/Notfound";
import Author from "./components/AuthorPage/author";
import WallpaperGenerator from "./components/DetailsPage/Details";

import LoginForm from "./Components/auth-folder/LoginForm";
import RegisterForm from "./Components/auth-folder/RegisterForm";
import Home from "./Components/Home";

import PropTypes from "prop-types";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userQuery, setuserQuery] = useState("");
  const [randomImages, setRandomImages] = useState([]);
  const [url, setUrl] = useState("");

  // Move handleSearch function here
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const userSearch = (query) => {
    setuserQuery(query);
  };

  const urlSearch = (query) => {
    setUrl(query);
    console.log(query);
  };

  console.log(url);

  function HeaderWrapper({ children }) {
    // You can add any logic here related to the header
    return (
      <div>
        <Header onSearch={handleSearch} />
        {children}
      </div>
    );
  }

  HeaderWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <HeaderWrapper>
              <Content
                authorSearch={userSearch}
                random={setRandomImages}
                randomImages={randomImages}
                urlSearch={urlSearch}
              />
            </HeaderWrapper>
          }
        />
        <Route
          path="/author"
          element={
            <HeaderWrapper>
              <Author authorSearch={userQuery} urlSearch={urlSearch} />
            </HeaderWrapper>
          }
        />
        <Route
          path="/search"
          element={
            <HeaderWrapper>
              <Search search={searchQuery} authorSearch={userSearch} urlSearch={urlSearch} />
            </HeaderWrapper>
          }
        />
        <Route
          path="/moreDetails"
          element={
            <HeaderWrapper>
              <WallpaperGenerator url={url} />
            </HeaderWrapper>
          }
        />

        {/* Not Found route without the header */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
