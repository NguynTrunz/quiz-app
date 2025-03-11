const API_DOMAIN = "http://localhost:3002/";

export const get = async (path) => {
  const respone = await fetch(API_DOMAIN + path);
  const result = await respone.json();
  return result;
}

export const post = async (path, option) => {
  const respone = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const result = await respone.json();
  return result;
}

export const del = async (path) => {
  const respone = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  const result = await respone.json();
  return result;
}

export const patch = async (path, option) => {
  const respone = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const result = respone.json();
  return result;
}