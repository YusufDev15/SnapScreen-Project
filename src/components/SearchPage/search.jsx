import { useState, useEffect } from "react";
import API from "../../utilities/Search_API";
import PropTypes from "prop-types";
import "../LandingPage/contentR.css";
import { NavLink } from "react-router-dom";
import { FaHeart, FaDownload } from "react-icons/fa";

const Search = ({ search, authorSearch, urlSearch }) => {
  const [randomImages, setRandomImages] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchRandomImages = (search, order = "") => {
    API.query(search, order).then((res) => {
      if (res.data.results) {
        setRandomImages(res.data.results);
      } else {
        setRandomImages([]);
      }
    });
  };

  useEffect(() => {
    fetchRandomImages(search);
  }, [search]);

  const handleCardClick = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  const geturl = (url) => {
    urlSearch(url);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center">
        {randomImages &&
          randomImages.map((element, index) => (
            <div
              key={element.id}
              className={`max-w-xs overflow-hidden rounded-lg shadow-lg bg-gray-200 cursor-pointer m-2 ${
                selectedCard === index ? "expanded-card" : ""
              }`}
              style={{
                height: "500px",
              }}
              onClick={() => handleCardClick(index)}
            >
              <img
                className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                src={element.urls.regular}
                alt={element.alt_description}
              />
              {selectedCard === index && (
                <div className="expanded-content animate-slideup rounded-lg">
                  <div className="icon-container mb-2">
                    <span className="inline-block">
                      <FaHeart className="heart-icon text-red-500" />{" "}
                      {element.likes} {"  "}
                      <FaDownload className="download-icon text-blue-500" />{" "}
                      {element.downloads !== undefined
                        ? element.downloads
                        : "N/A"}
                    </span>

                    <span className="details-icon-container ml-auto inline-block">
                      <NavLink
                        to="/moreDetails"
                        end
                        onClick={() => geturl(element.urls.raw)}
                      >
                        <img
                          width="48"
                          height="48"
                          src="https://img.icons8.com/color/48/details-pane.png"
                          alt="details-pane"
                        />
                      </NavLink>
                    </span>
                  </div>
                  <p className="cool-description">
                    <b>
                      <ins>Description:</ins>{" "}
                    </b>
                    {element.alt_description}
                  </p>
                  <p className="cool-author">
                    <NavLink to="/author" end>
                      <button
                        type="button"
                        className="cool-author-button"
                        onClick={() => authorSearch(element.user.username)}
                      >
                        {" "}
                        <span>
                          <cite>
                            <ins>Author:</ins>
                          </cite>{" "}
                          {element.user.name}
                        </span>
                      </button>
                    </NavLink>
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  authorSearch: PropTypes.func.isRequired,
  urlSearch: PropTypes.func.isRequired,
};

export default Search;
