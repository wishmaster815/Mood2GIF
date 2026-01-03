import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;

export const fetchImage = async (query, page = 1, per_page = 20) => {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, page, per_page },
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    });
    return res.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

export const fetchVideo = async (query, per_page = 20) => {
  try {
    const res = await axios.get("https://api.pexels.com/videos/search", {
      params: { query, per_page },
      headers: { Authorization: PEXELS_KEY },
    });
    return res.data.videos;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

export const fetchGIF = async (query, limit = 20) => {
  try {
    const res = await axios.get("https://tenor.googleapis.com/v2/search", {
      params: {
        q: query,
        key: TENOR_KEY,
        client_key: "my_app",
        limit,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};
