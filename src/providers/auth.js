import {
  createContext,
  useMemo,
  useState,
  useReducer,
  useEffect,
  useHistory,
} from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showModal, setShowModal] = useState(false);

  const [isAuth, setIsAuth] = useState(true);
  // const [formData, formDispatch] = useReducer(formState, {});

  // const handleLogin = (user) => {
  //   localStorage.setItem("user", JSON.stringify(user));
  //   console.log(user.data.token);
  //   setUser(user.data);
  // };

  const memorizedValues = useMemo(
    () => ({
      showModal,

      isAuth,
      setShowModal,
      // formData,
      // formDispatch,

      // handleLogin,
    }),
    [isAuth, showModal],
  );

  return (
    <AuthContext.Provider value={memorizedValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
