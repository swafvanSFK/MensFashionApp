import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import summeryApi from "../api";
import Loading from "../components/Loading";
import { useOpenLogin } from "../store/generalStore";

const AdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {setOpenLogin} = useOpenLogin()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(summeryApi.checkUser.url,
          {
            withCredentials: true,
          },
        );

        const data = res.data;
        console.log(data);
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

export default AdminRoutes;
