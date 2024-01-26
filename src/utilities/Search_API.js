import axios from "axios";

const API = {
  query: function (search,order) {
    return axios.get(
      `https://api.unsplash.com/search/photos?query=${search}&order_by=${order}&client_id=BGPa98S_piYWwnFdWPFd0C6Bcomy7yDKpOtfgfOq3Mk&per_page=30`
    );
  },
};


export default API;