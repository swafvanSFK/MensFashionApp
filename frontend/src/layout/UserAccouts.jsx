import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MdEdit } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useChangeUserRole } from '../store/userStore';
import ChangeRole from '../components/ChangeRole';
import { useEffect, useState } from 'react';
import { useGetAllUsers } from '../store/userStore';
import moment from 'moment';
import useDarkSide from '../hooks/darkSide';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#269FB7',
    color: theme.palette.common.white,
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: theme.palette.text.primary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    transition: 'background-color 0.3s ease',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserAccounts = () => {
  const { openChangeRole, setOpenChangeRole } = useChangeUserRole();
  const { allUsers, setAllUsers } = useGetAllUsers();
  const [colorTheme] = useDarkSide();
  const [userId, setUserId] = useState()


  useEffect(() => {
    setAllUsers();
  }, [setAllUsers]);

  const handleEditUser =  (id) => {
    setOpenChangeRole()
    setUserId(id)
  }

  return (
    <TableContainer sx={{ padding: '10px' }}>
      <Table className='dark:bg-gray-800' sx={{ minWidth: 700, backgroundColor: 'background.paper' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl.</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
            <StyledTableCell>Created At</StyledTableCell>
            <StyledTableCell>Updated At</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers?.map((user, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell style={{color : colorTheme === 'dark' ? "white":""}}>{index + 1}</StyledTableCell>
              <StyledTableCell style={{color : colorTheme === 'dark' ? "white":""}}>{user?.userName}</StyledTableCell>
              <StyledTableCell style={{color : colorTheme === 'dark' ? "white":""}}>{user?.email}</StyledTableCell>
              <StyledTableCell style={{ color: user.role === 'ADMIN' ? 'green' : 'red' }}>{user.role}</StyledTableCell>
              <StyledTableCell style={{color : colorTheme === 'dark' ? "white":""}}>{moment(user?.createdAt).format("LL")}</StyledTableCell>
              <StyledTableCell style={{color : colorTheme === 'dark' ? "white":""}}>{moment(user?.updatedAt).format("LL")}</StyledTableCell>
              <StyledTableCell>
                <Tooltip title="Edit" placement="left">
                  <IconButton onClick={()=>handleEditUser(user._id)}>
                    <MdEdit className="cursor-pointer dark:text-white hover:text-red-400 transition-colors duration-200" />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {openChangeRole && <ChangeRole userId={userId}/>}
    </TableContainer>
  );
};

export default UserAccounts;
