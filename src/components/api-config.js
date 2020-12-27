/*FOR FIREBASE DEPLOYMENT*/
/*
import {FIREBASE_BASE_URL, FIREBASE_API_KEY} from '../firebase-config';
const BASE_URL = FIREBASE_BASE_URL;
const API_KEY = FIREBASE_API_KEY;
*/

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const JWT_TOKEN = localStorage.getItem('token');

export const safeHeaders = {headers: {
    'x-api-key': `${API_KEY}`
  }};

export const writeHeaders = {
  headers: {
    'Authorization': `Bearer ${JWT_TOKEN}`
  }};


export const TERM_API_URL =  BASE_URL + "/terms";

export const LANGUAGE_API_URL =  BASE_URL + "/languages";

export const EXAMPLE_API_URL =  BASE_URL + "/examples";

export const USER_API_URL =  BASE_URL + "/users";