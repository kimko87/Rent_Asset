import axios from "axios";
import { toast } from "react-toastify";

function getJwt() {
  return localStorage.getItem("token");
}

axios.defaults.headers.common["x-auth-token"] = getJwt();

// if any response in any component is status 403 and above(that means that was some kind of problem) toast will pop up and message the user...
axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) toast.error("An unexpected error occured");
  return Promise.reject(error);
});

// eslint-disable-next-line
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
