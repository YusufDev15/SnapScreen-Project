import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WallpaperGenerator = ({ url }) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setImageUrl("");
    setDimensions({ width: 0, height: 0 });
  };

  const handleResetDimensions = () => {
    setCustomWidth("");
    setCustomHeight("");
    setImageUrl("");
    setDimensions({ width: 0, height: 0 });
  };

  const handleCustomDimensionsChange = (dimension, value) => {
    if (dimension === "width") {
      setCustomWidth(value);
    } else {
      setCustomHeight(value);
    }
  };

  const generateWallpaperUrl = () => {
    if (!selectedModel && !(customWidth && customHeight)) {
      return;
    }

    if (customWidth && customHeight) {
      const generatedImageUrl = `${url}&fit=crop&w=${customWidth}&h=${customHeight}`;
      setDimensions({ width: parseInt(customWidth), height: parseInt(customHeight) });
      setImageUrl(generatedImageUrl);
      return;
    }

    const modelDimensions = {
       // iPhone Models
       iphone13ProMax: { width: 1284, height: 2778 },
       iphone13Pro: { width: 1284, height: 2778 },
       iphone13: { width: 1170, height: 2532 },
       iphone12ProMax: { width: 1284, height: 2778 },
       iphone12Pro: { width: 1284, height: 2778 },
       iphone12: { width: 1170, height: 2532 },
       iphoneSE2: { width: 750, height: 1334 },
       iphoneSE: { width: 750, height: 1334 },
       iphone11ProMax: { width: 1242, height: 2688 },
       iphone11Pro: { width: 1125, height: 2436 },
       iphone11: { width: 828, height: 1792 },
       iphoneXSMax: { width: 1242, height: 2688 },
       iphoneXS: { width: 1125, height: 2436 },
       iphoneXR: { width: 828, height: 1792 },
       iphoneX: { width: 1125, height: 2436 },
       iphone8Plus: { width: 1080, height: 1920 },
       iphone8: { width: 750, height: 1334 },
       iphone7Plus: { width: 1080, height: 1920 },
       iphone7: { width: 750, height: 1334 },
       iphone6SPlus: { width: 1080, height: 1920 },
       iphone6S: { width: 750, height: 1334 },
       iphone6Plus: { width: 1080, height: 1920 },
       iphone6: { width: 750, height: 1334 },
 
       // Samsung Models
       samsungGalaxyS21Ultra: { width: 1440, height: 3200 },
       samsungGalaxyS21Plus: { width: 1080, height: 2400 },
       samsungGalaxyS21: { width: 1080, height: 2400 },
       samsungGalaxyS20Ultra: { width: 1440, height: 3200 },
       samsungGalaxyS20Plus: { width: 1440, height: 3200 },
       samsungGalaxyS20: { width: 1440, height: 3200 },
       samsungGalaxyS10Plus: { width: 1440, height: 3040 },
       samsungGalaxyS10: { width: 1440, height: 3040 },
       samsungGalaxyS9Plus: { width: 1440, height: 2960 },
       samsungGalaxyS9: { width: 1440, height: 2960 },
       samsungGalaxyS8Plus: { width: 1440, height: 2960 },
       samsungGalaxyS8: { width: 1440, height: 2960 },
       samsungGalaxyNote20Ultra: { width: 1440, height: 3088 },
       samsungGalaxyNote20: { width: 1080, height: 2400 },
       samsungGalaxyNote10Plus: { width: 1440, height: 3040 },
       samsungGalaxyNote10: { width: 1080, height: 2280 },
       samsungGalaxyNote9: { width: 1440, height: 2960 },
       samsungGalaxyNote8: { width: 1440, height: 2960 },
 
       // Laptop Models
       laptop13inch: { width: 2560, height: 1600 },
       laptop15inch: { width: 2880, height: 1800 },
       laptop17inch: { width: 3840, height: 2400 },
 
       // Desktop Models
       desktop1080p: { width: 1920, height: 1080 },
       desktop1440p: { width: 2560, height: 1440 },
       desktop4k: { width: 3840, height: 2160 },
    };

    const currentDimensions = modelDimensions[selectedModel];

    if (!currentDimensions) {
      return "Invalid Mobile model";
    }

    const generatedImageUrl = `${url}&fit=crop&w=${currentDimensions.width}&h=${currentDimensions.height}`;
    setDimensions(currentDimensions);
    setImageUrl(generatedImageUrl);
  };

  useEffect(() => {
    generateWallpaperUrl();
  }, [selectedModel, customWidth, customHeight]);

  const handleDownload = async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Wallpaper_${selectedModel || "Custom"}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="mx-auto my-8 p-4 bg-gray-100 rounded-md h-auto"
        style={{ width: "50%" }}
      >
        <label htmlFor="mobileModels" className="block font-semibold mb-2">
          Select Mobile Model:
        </label>
        <select
          id="mobileModels"
          value={selectedModel}
          onChange={(e) => handleModelChange(e.target.value)}
          className="block w-full py-2 px-3 mb-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
        <option value="">Select a mobile/PC model</option>
        <optgroup label="iPhone Models">
          <option value="iphone13ProMax">iPhone 13 Pro Max</option>
          <option value="iphone13Pro">iPhone 13 Pro</option>
          <option value="iphone13">iPhone 13</option>
          <option value="iphone12ProMax">iPhone 12 Pro Max</option>
          <option value="iphone12Pro">iPhone 12 Pro</option>
          <option value="iphone12">iPhone 12</option>
          <option value="iphoneSE2">iPhone SE (2nd generation)</option>
          <option value="iphoneSE">iPhone SE</option>
          <option value="iphone11ProMax">iPhone 11 Pro Max</option>
          <option value="iphone11Pro">iPhone 11 Pro</option>
          <option value="iphone11">iPhone 11</option>
          <option value="iphoneXSMax">iPhone XS Max</option>
          <option value="iphoneXS">iPhone XS</option>
          <option value="iphoneXR">iPhone XR</option>
          <option value="iphoneX">iPhone X</option>
          <option value="iphone8Plus">iPhone 8 Plus</option>
          <option value="iphone8">iPhone 8</option>
          <option value="iphone7Plus">iPhone 7 Plus</option>
          <option value="iphone7">iPhone 7</option>
          <option value="iphone6SPlus">iPhone 6S Plus</option>
          <option value="iphone6S">iPhone 6S</option>
          <option value="iphone6Plus">iPhone 6 Plus</option>
          <option value="iphone6">iPhone 6</option>
        </optgroup>
        <optgroup label="Samsung Models">
          <option value="samsungGalaxyS21Ultra">
            Samsung Galaxy S21 Ultra
          </option>
          <option value="samsungGalaxyS21Plus">
            Samsung Galaxy S21 Plus
          </option>
          <option value="samsungGalaxyS21">Samsung Galaxy S21</option>
          <option value="samsungGalaxyS20Ultra">
            Samsung Galaxy S20 Ultra
          </option>
          <option value="samsungGalaxyS20Plus">
            Samsung Galaxy S20 Plus
          </option>
          <option value="samsungGalaxyS20">Samsung Galaxy S20</option>
          <option value="samsungGalaxyS10Plus">
            Samsung Galaxy S10 Plus
          </option>
          <option value="samsungGalaxyS10">Samsung Galaxy S10</option>
          <option value="samsungGalaxyS9Plus">Samsung Galaxy S9 Plus</option>
          <option value="samsungGalaxyS9">Samsung Galaxy S9</option>
          <option value="samsungGalaxyS8Plus">Samsung Galaxy S8 Plus</option>
          <option value="samsungGalaxyS8">Samsung Galaxy S8</option>
          <option value="samsungGalaxyNote20Ultra">
            Samsung Galaxy Note20 Ultra
          </option>
          <option value="samsungGalaxyNote20">Samsung Galaxy Note20</option>
          <option value="samsungGalaxyNote10Plus">
            Samsung Galaxy Note10 Plus
          </option>
          <option value="samsungGalaxyNote10">Samsung Galaxy Note10</option>
          <option value="samsungGalaxyNote9">Samsung Galaxy Note9</option>
          <option value="samsungGalaxyNote8">Samsung Galaxy Note8</option>
        </optgroup>
        <optgroup label="Laptop Models">
          <option value="laptop13inch">13-inch Laptop</option>
          <option value="laptop15inch">15-inch Laptop</option>
          <option value="laptop17inch">17-inch Laptop</option>
        </optgroup>
        <optgroup label="Desktop Models">
          <option value="desktop1080p">1080p Desktop</option>
          <option value="desktop1440p">1440p Desktop</option>
          <option value="desktop4k">4K Desktop</option>
        </optgroup>
        </select>

        {dimensions && (
          <p className="text-sm mb-2">
            Dimensions: {dimensions.width} x {dimensions.height} pixels
          </p>
        )}

        <div className="flex mb-2">
          <input
            type="number"
            placeholder="Custom Width"
            value={customWidth}
            onChange={(e) => handleCustomDimensionsChange("width", e.target.value)}
            className="py-2 px-3 mr-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="number"
            placeholder="Custom Height"
            value={customHeight}
            onChange={(e) => handleCustomDimensionsChange("height", e.target.value)}
            className="py-2 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={handleResetDimensions}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          >
            Reset
          </button>
        </div>
        {imageUrl ? "" : "Please select a mobile model or enter custom dimensions"}
        {imageUrl && (
          <div>
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2"
            >
              Download
            </button>
            <img
              src={imageUrl}
              alt="Generated Wallpaper"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

WallpaperGenerator.propTypes = {
  url: PropTypes.string.isRequired,
};

export default WallpaperGenerator;
