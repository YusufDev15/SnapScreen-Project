import axios from "axios";

const API = {
  query: function (user) {
    return axios.get(
      `https://api.unsplash.com/users/${user}?client_id=vdFmYtXkKNNeDHbE_IgCILNYZ4owgBfmVnjF98rQ9JI`
    );
  },
};


export default API;