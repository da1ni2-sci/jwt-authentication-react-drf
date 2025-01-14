import axios from "axios";

const BASE_UEL = "http://localhost:8000/api/";
const LOGIN_URL = `${BASE_UEL}token/`;
const NOTES_URL = `${BASE_UEL}notes/`;
const REFRESH_URL = `${BASE_UEL}token/refresh/`;
const LOGOUT_URL = `${BASE_UEL}logout/`;
const AUTH_URL = `${BASE_UEL}authenticated/`;
const REGISTER_URL = `${BASE_UEL}register/`;

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      {
        username,
        password,
      },
      { withCredentials: true },
    );
    return response.data.success;
  } catch (e) {
    return false;
  }
};

export const get_notes = async () => {
  try {
    const response = await axios.get(NOTES_URL, { withCredentials: true });
    return response.data;
  } catch (e) {
    return call_refresh(e, axios.get(NOTES_URL, { withCredentials: true }));
  }
};

export const logout = async () => {
  try {
    await axios.post(LOGOUT_URL, {}, { withCredentials: true });
    return true;
  } catch (e) {
    return false;
  }
};

const refresh_token = async () => {
  const response = await axios.post(REFRESH_URL, {}, { withCredentials: true });
  return response.data.refresh;
};

const call_refresh = async (e, func) => {
  if (e.response && e.response.status === 401) {
    const refresh = await refresh_token();
    if (refresh) {
      const retryResponse = await func();
      return retryResponse.data;
    }
  }
  return false;
};

export const check_auth = async () => {
  try {
    const response = await axios.post(AUTH_URL, {}, { withCredentials: true });
    return response.data.authenticated;
  } catch (e) {
    console.error("Authentication check failed:", e);
    return false;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      REGISTER_URL,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );
    return response.data.register;
  } catch (e) {
    return false;
  }
};
