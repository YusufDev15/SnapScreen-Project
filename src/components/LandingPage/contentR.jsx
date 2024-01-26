import { useState, useEffect, useCallback } from "react";
import { FaSyncAlt, FaHeart, FaDownload } from "react-icons/fa";
import API from "../../utilities/Random_API";
import "./ContentR.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Content = ({ authorSearch, random, randomImages, urlSearch }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchRandomImages = useCallback(async () => {
    const responses = await Promise.all([
      API.query(),
      API.query(),
      API.query(),
    ]);

    const imagesData = responses.map((res) => res.data);

    const combinedImages = imagesData.reduce(
      (accumulator, currentData) => accumulator.concat(currentData),
      []
    );

    random(combinedImages);
  }, [random]);

  useEffect(() => {
    if (!randomImages.length) {
      fetchRandomImages();
    }
  }, [randomImages, fetchRandomImages]);

  const handleCardClick = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  const geturl = (url) => {
    urlSearch(url);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4 flex items-center">
        <p
          className="text-lg font-semibold mr-2"
          style={{ fontFamily: "cursive", color: "black" }}
        >
          Refresh to see new images!!
        </p>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
          onClick={() => fetchRandomImages()}
        >
          <FaSyncAlt />
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {randomImages.length > 0 &&
          randomImages.map((element, index) => (
            <div
              key={index}
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
                <div className="expanded-content animate-slideup rounded-lg cursor-pointer flex items-center justify-between">
                  <div className="icon-container mb-2">
                    <span className="inline-block">
                      <FaHeart className="heart-icon text-red-500" />{" "}
                      {element.likes} {"  "}
                      <FaDownload className="download-icon text-blue-500" />{" "}
                      {element.downloads}
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
                  <p className="cool-description text-yellow-200">
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

Content.propTypes = {
  authorSearch: PropTypes.func.isRequired,
  random: PropTypes.func.isRequired,
  randomImages: PropTypes.array.isRequired,
  urlSearch: PropTypes.func.isRequired,
};

export default Content;
