import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

export default function Loading() {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
        document.body.classList.remove('no-scroll');
    };
}, []);

    return (
    <Box className='fixed inset-0 z-10 flex justify-center items-center bg-black'>
      <CircularProgress size={70} sx={{color:'#269fb7'}} />
    </Box>
  );
}
