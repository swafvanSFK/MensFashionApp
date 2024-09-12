import { Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useUserData } from "./store/userStore.jsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {

  const {setUser} = useUserData()

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  useEffect(()=>{
    setUser()
  },[setUser])

  const theme = createTheme({
    typography: {
      fontFamily: 'Cabin, sans-serif',
    },  
  });

  return (
    <>
    <ThemeProvider theme={theme}>
      <main>
        <Outlet />
      </main>
      </ThemeProvider>
    </>
  );
}

export default App;
