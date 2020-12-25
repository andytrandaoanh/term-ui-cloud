/*FOR FIREBASE DEPLOYMENT*/
import {FIREBASE_BASE_URL, FIREBASE_API_KEY} from '../firebase-config';
const BASE_URL = FIREBASE_BASE_URL;
const API_KEY = FIREBASE_API_KEY;

export const safeHeaders = {headers: {
    'x-api-key': `${API_KEY}`
  }};

export const TERM_API_URL =  BASE_URL + "/terms";

export const LANGUAGE_API_URL =  BASE_URL + "/languages";

export const EXAMPLE_API_URL =  BASE_URL + "/examples";


