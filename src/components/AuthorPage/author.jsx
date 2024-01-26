import { useState, useEffect } from "react";
import API from "../../utilities/user_API";
import PropTypes from "prop-types";
import "../LandingPage/contentR.css";
import { Link, NavLink } from "react-router-dom";

const Author = ({ authorSearch, urlSearch }) => {
  const [randomImages, setRandomImages] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchRandomImages = (search, order = "") => {
    API.query(search, order)
      .then((res) => {
        if (res.data) {
          setRandomImages(res.data);
        } else {
          setRandomImages({});
        }
      })
      .catch((error) => {
        console.error("Error fetching random images:", error);
        setRandomImages({});
      });
  };

  useEffect(() => {
    if (authorSearch) {
      fetchRandomImages(authorSearch);
    } else {
      setRandomImages({});
    }
  }, [authorSearch]);

  const handleCardClick = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  const geturl = (url) => {
    urlSearch(url);
  };

  return (
    <div className="container mx-auto">
      <div className="author-card text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg">
        {randomImages && randomImages.profile_image && (
          <img
            className="author-profile-img mx-auto mb-4 rounded-full"
            src={randomImages.profile_image.large}
            alt={randomImages.username}
          />
        )}
        <h2
          className="text-xl font-semibold mb-2"
          style={{
            color: "black",
          }}
        >
          {randomImages && randomImages.name}
        </h2>
        <p className="text-gray-600">
          {randomImages && (randomImages.bio || "No bio available.")}
        </p>
        <Link
          to={randomImages && (randomImages.portfolio_url || "#")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-red-600">
            {randomImages &&
              (randomImages.portfolio_url ? "~~~~Readmore~~~~" : "")}
          </p>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center">
        {randomImages &&
          randomImages.photos &&
          randomImages.photos.map((element, index) => (
            <NavLink
              key={index}
              to="/moreDetails"
              end
              onClick={() => geturl(element.urls.raw)}
            >
              <div
                className="max-w-xs overflow-hidden rounded-lg shadow-lg bg-gray-200 cursor-pointer m-2"
                style={{
                  height: "500px",
                }}
                onClick={() => handleCardClick(index)}
              >
                <img
                  className="w-full h-full object-cover"
                  src={element.urls.regular}
                  alt={element.alt_description}
                />
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

Author.propTypes = {
  authorSearch: PropTypes.string.isRequired,
  urlSearch: PropTypes.func.isRequired,
};

export default Author;
