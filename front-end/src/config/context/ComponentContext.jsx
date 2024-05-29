import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../Api/AxiosClient";
const Context = createContext({
  user: {},
  errors: {},
  handleLogin: () => {},
  navigateTo: () => {},
  setErrors: () => {},
});

const ComponentContext = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      if (JSON.parse(localStorage.getItem("ud"))) {
        const state = await getUser(
          JSON.parse(localStorage.getItem("ud")).role
        );
        if (!state) {
          localStorage.removeItem("ud");
          navigate("/", { replace: true });
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const getUser = async (guard) => {
    const ud = JSON.parse(localStorage.getItem("ud"));
    if (!ud) {
      return false;
    }
    if (ud.role !== guard) {
      return false;
    }
    try {
      const { data } = await axiosClient.get(`/${guard}/profile`);
      setUser(data.user);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const handleLogin = async (formData, guard) => {
    try {
      const { data } = await axiosClient.post(`/${guard}/login`, formData);
      localStorage.setItem(
        "ud",
        JSON.stringify({ role: guard, _token: data.token })
      );
      const state = await getUser(guard);
      if (state) return true;
      else return false;
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error);
      return false;
    }
  };
  return (
    <Context.Provider
      value={{
        user,
        handleLogin,
        navigateTo: navigate,
        errors,
        setErrors,
      }}
    >
      {loading ? "Loading..." : children}
    </Context.Provider>
  );
};

export default ComponentContext;

export const useAppContext = () => useContext(Context);
