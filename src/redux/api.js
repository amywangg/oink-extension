import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const checkAuth = () => {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get("user", function (result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        return resolve(result.user);
      }
    });
  }).then((result) => {
    return result;
  });
};

export const savePurchase = (user, totalCost) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(`${API_URL}/purchase/create`, {
        client_id: user.id,
        amount: totalCost,
      })
      .then((response) => resolve(response.data));
  }).then((result) => {
    return result;
  });
};

export const saveProducts = async (products, user, purchase_id) => {
  await Promise.all(
    products.map(async (item) => {
      await axios.post(`${API_URL}/item/create`, {
        client_id: user.id,
        purchase_id: purchase_id,
        price: item.price,
        name: item.name,
      });
    })
  );
};

export const getBudget = (user) => {
  return new Promise(function (resolve, reject) {
    axios.get(`${API_URL}/budget/user/${user.id}`).then((response) => {
      return resolve(response.data[0]);
    });
  }).then((result) => {
    return result;
  });
};
