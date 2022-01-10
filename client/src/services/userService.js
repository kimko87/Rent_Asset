import http from "./httpService";
import { apiUrl } from "../config/config.json";
import jwtDecode from "jwt-decode";


// we made the property name of the object we want to save in localstorage equals to a variable so later if because any reason we want to change the property name is much easier to change it from one page instead of finding it in all the relavent files...
const tokenKey = "token";

// a function that logs out the user and let the system knows he is no longer connected..
export function logout() {
  localStorage.clear();
}



// a function that goes to the localstorage and tries to get the object we saved with the details of the user (id , assetOwner). if we can't get the object that means that the user is disconnected and he dont have a token.
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

// a function to log in the user
export async function login(email, password) {
  // the "data" is a response we get from axios
  const { data } = await http.post(`${apiUrl}/auth`, {
    //param1 = the url to the post request, param2 = the payload we want to send to the server. in this case i send the email and the password so the server could check if thre is a match with what is saved in the server..
    email,
    password,
  });


  // i want to save the token we get back from the server so any page in the app could use this data and let the server know that user is loged in.
  localStorage.setItem(tokenKey, data.token);
}

export function saveToFavorites(cardId, userId) {
  return http.post(`${apiUrl}/users/favorites`, {
    cardId,
    userId
  })
}

export function getUserFavorites() {
  return http.get(`${apiUrl}/users/favorites`);
}


const userMethods = {
  login,
  getCurrentUser,
  logout,
  saveToFavorites,
  getUserFavorites
};
export default userMethods;
