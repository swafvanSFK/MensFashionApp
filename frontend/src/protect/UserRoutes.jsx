import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useOpenLogin } from "../store/generalStore";
import axios from "axios";
import summeryApi from "../api";

const UserRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {setOpenLogin} = useOpenLogin()

  useEffect(() => {
    const checkUser = async () => {
      try {
       const response = await axios.get(summeryApi.protectUser.url,{withCredentials : true})
       const data = response.data;
       if (!data.success) {
         navigate("/", { replace: true });
       }
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/", { replace: true });
        setOpenLogin()
      } finally {
        setLoading(false);
      }
    }; 
    checkUser();
  }, [setOpenLogin,navigate]);

  if (loading) {
    return <Loading/>;
  }

  return children;
};

export default UserRoutes;
