import axios from "axios";

const API = {
  query: function () {
    return axios.get(
      `https://api.unsplash.com/photos/random?client_id=vdFmYtXkKNNeDHbE_IgCILNYZ4owgBfmVnjF98rQ9JI&count=30`
    );
  },
};


export default API;