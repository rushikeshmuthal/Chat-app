/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad()
  }, []);

  const getUserOnLoad = async()=> {
    try {
  
        const accountDetails = await account.get();
        setUser(accountDetails)
        console.log(accountDetails);
  
      } catch (error) {
        console.error(error);
      }
      setLoading(false)
  }

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      await account.createEmailSession(credentials.email, credentials.password);

      const accountDetails = await account.get();

      setUser(accountDetails)

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error)
    }
  };

  const handleUserLogout = async ()=> {
    await account.deleteSession('current')
    setUser(null)
  }

  const handleUserRegister = async(e,credentials)=> {
    e.preventDefault()
    if(credentials.password1 != credentials.password2){
      alert('Passwords are not Matching')
      return
    }
    try {
      const response = await account.create(ID.unique(), credentials.email, credentials.password1,credentials.name);
      console.log('User registered!', response)

      await account.createEmailSession(credentials.email, credentials.password1)
            let accountDetails = await account.get();
            setUser(accountDetails)
            navigate('/')
    } catch (error) {
      error
    }
  }

  const contexData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister
  };
  return (
    <AuthContext.Provider value={contexData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
