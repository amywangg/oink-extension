import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const checkAuth = () => {
  let user = null;
  chrome.storage.local.get('user', function (result) {
    console.log("Value currently is " + result.user);
    user = result.user;
    console.log(user)
  });
  return user;
};
