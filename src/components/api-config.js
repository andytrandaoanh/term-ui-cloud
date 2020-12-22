
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;



export const safeHeaders = {headers: {
    'x-api-key': `${API_KEY}`
  }};

export const TERM_API_URL =  BASE_URL + "/terms";

export const LANGUAGE_API_URL =  BASE_URL + "/languages";

export const EXAMPLE_API_URL =  BASE_URL + "/examples";


