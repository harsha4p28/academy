import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { ClipLoader } from "react-spinners";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
  
    const checkAuth = async () => {
      try {
        const res = await axios.get('/me', { withCredentials: true });
        setAuth(res.data.user);  
      } catch (error) {
        console.log("Not authenticated, trying refresh...");
        try {
          const refreshRes = await axios.get('/refresh', { withCredentials: true });
          console.log("Token refreshed!");
          setAuth({ email: refreshRes.data.email, role: refreshRes.data.role });
        } catch (refreshError) {
          console.log("Refresh failed");
          setAuth(null);
        }
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
        checkAuth();
      }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading  }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;