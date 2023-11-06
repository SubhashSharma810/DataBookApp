import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from './Navbar';
import SearchIcon from '@mui/icons-material/SearchRounded';
import InputBase from '@mui/material/InputBase';
import "../style/Report.css";
import { Timestamp } from "firebase/firestore";
import EditForm from "../layout/EditModel";
import "../style/Report.css";
import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useAuth } from '../context/AuthContext';
import { useMediaQuery } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999, // Adjust the z-index as needed
};



export default function Report() {
  const { fatchDataFromDb, saveEditData } = useAuth();
  // const { fatchDataFromDb, deleteDataFromDataBase, saveEditData } = useAuth();
  const [rows, setRows] = useState([]);
  const [editingData, setEditingData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  //Appling conditional styal on tablecell
const isLargeScreen =  useMediaQuery('(min-width:1180px)');
const containerStyle = {
 
  paddingLeft: isLargeScreen ? '80px' : '0px',
};


  // Fatching Data From FireStore And Setting in Table 
  const sdata = () => {
    fatchDataFromDb(setRows);
  };

  // Delete Data From FireStore  
  // const handleDelete = async (data) => {
  //   console.log(data);
  //   deleteDataFromDataBase(data, setRows);
  // };
  
  // Edit Model function For Open And Close
  const handleEdit = (data) => {
    setEditingData(data);
    setEditModalOpen(true);
  };

  // Edit Data in Table From Firestore 
  const handleSaveEdit = async (editedData) => {
    saveEditData(editedData, setEditModalOpen);
  };

  //Date Validetion
  function isValidDate(dateString) {
    if (dateString instanceof Date) {
      return true;
    }
    // Check if it's a valid timestamp (you may need to adjust the condition)
    if (dateString && dateString.toDate instanceof Function) {
      return true;
    }
    return false;
  }

  // Search Bar Filter 
  const filteredRows = rows.filter((post) => {
    return (
      post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more conditions for other fields you want to search
    )
  });

  useEffect(() => {

    sdata();
    setEditModalOpen(false);

  }, [])

  return (

    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <Navbar />

        <div className="searchBar" style={{ flex: 1 }}>
          {/* Search Bar  Code here ...*/}
          <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            {/* Search bar */}
            <div style={{ backgroundColor: '#ccc', marginTop: '7%', marginLeft: '10%', marginBottom: '5px', padding: 5, borderRadius: 5 }}>
              <SearchIcon sx={{ mr: 1, color: '#000' }} />
              <InputBase sx={{ pl: 2, backgroundColor: '#fff' }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* You can place other elements, buttons, or filters here */}
          </Paper>
          {/* Table Code here ...*/}
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div className="table-container">
              <div className="table-header">
                <TableContainer sx={{ boxShadow: 15, mx: '10%', width: '80vw', zIndex: 1, backgroundColor: '#bababa7d', }} component={Paper}>
                  <Table sx={{ minWidth: 420, }} aria-label="customized table">
                    <TableHead className="sticky-table-head">
                      <StyledTableRow sx={{ boxShadow: 10, borderColor: '#000' }} >
                        <StyledTableCell >Name</StyledTableCell>
                        <StyledTableCell align="right" style={containerStyle}>Categores</StyledTableCell>
                        <StyledTableCell align="right">quantities&nbsp;(N)</StyledTableCell>
                        <StyledTableCell align="right">prices&nbsp;(Rs)</StyledTableCell>
                        {/* <StyledTableCell align="right">Profit Percentage&nbsp;(%)</StyledTableCell> */}
                        <StyledTableCell align="right">Profit Amount&nbsp;(Rs)</StyledTableCell>
                        <StyledTableCell align="right">Dates&nbsp;(Rs)</StyledTableCell>
                        <StyledTableCell align="right">Times&nbsp;(Rs)</StyledTableCell>
                        <StyledTableCell align="right">Edit & Delete&nbsp;</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </div>
              <div className="table-content" style={{ paddingLeft: '10%', paddingBottom: '5%' }}>
                <TableContainer sx={{ maxWidth: '80vw' }} component={Paper}>
                  <Table sx={{ minWidth: 420 }} aria-label="customized table">
                    <TableBody className="table-body">{searchQuery ? (filteredRows.map((post) => (

                      <StyledTableRow key={post.id} sx={{ borderBottom: 2, boxShadow: 10 }}>
                        <StyledTableCell component="th" scope="row">
                          {post.name || "N/A"} {/* Display "N/A" if the name is an empty string */}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {post.category || "N/A"} {/* Display "N/A" if the category is an empty string */}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {post.quantity || "N/A"} {/* Display "N/A" if the quantity is an empty string */}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {post.price || "N/A"} {/* Display "N/A" if the price is an empty string */}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {post.profit || "N/A"} {/* Display "N/A" if the profit is an empty string */}
                        </StyledTableCell>
                        {/* <StyledTableCell align="right"> */}
                        {/* {post.price && post.profit ? (post.price * parseFloat(post.profit) / 100).toFixed(2) : "N/A"}  */}
                        {/* </StyledTableCell> */}
                        <StyledTableCell align="right">
                          {post.date ? (isValidDate(post.date) ? post.date.toDate().toLocaleDateString() : "Invalid Date") : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {post.time && post.time.seconds && post.time.toDate instanceof Function ? post.time.toDate().toLocaleTimeString() : "N/A"}
                          {/* {post.time ? (isValidTime(post.time) ? post.time.toDate().toLocaleTimeString() : "Invalid Time") : "N/A"} */}
                        </StyledTableCell>

                        <StyledTableCell className="editDeleteBtnGroup" align="right" style={{ justifyContent: 'space-between' }}>
                          <button className="btnEdit" onClick={() => handleEdit(post)}><EditNoteIcon color="success" fontSize="small" />
                          </button>
                          {/* <button className="btnDelete" onClick={() => handleDelete(post)}><DeleteRoundedIcon sx={{ color: 'red' }} stroke={null} fontSize="small" /></button> */}
                        </StyledTableCell>
                      </StyledTableRow>

                    ))) :
                      (rows.map((post) => (


                        <StyledTableRow key={post.id} sx={{ borderBottom: 2, boxShadow: 10 }}>

                          <StyledTableCell component="th" scope="row">
                            {post.name || "N/A"} {/* Display "N/A" if the name is an empty string */}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {post.category || "N/A"} {/* Display "N/A" if the category is an empty string */}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {post.quantity || "N/A"} {/* Display "N/A" if the quantity is an empty string */}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {post.price || "N/A"} {/* Display "N/A" if the price is an empty string */}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {post.profit || "N/A"} {/* Display "N/A" if the profit is an empty string */}
                          </StyledTableCell>
                          {/* <StyledTableCell align="right"> */}
                          {/* {post.price && post.profit ? (post.price * parseFloat(post.profit) / 100).toFixed(2) : "N/A"}  */}
                        {/* </StyledTableCell> */}
                          <StyledTableCell align="right">
                            {post.date ? (isValidDate(post.date) ? post.date.toDate().toLocaleDateString() : "Invalid Date") : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {post.time ? (post.time instanceof Timestamp ? post.time.toDate().toLocaleTimeString() : "Invalid Time") : "N/A"}
                          </StyledTableCell>

                          <StyledTableCell className="editDeleteBtnGroup" align="right">
                            <button className="btnEdit" onClick={() => handleEdit(post)}><EditNoteIcon color="success" fontSize="small" />
                            </button>
                            {/* <button className="btnDelete" onClick={() => handleDelete(post)}><DeleteRoundedIcon sx={{ color: 'red' }} stroke={null} fontSize="small" /></button> */}
                          </StyledTableCell>
                        </StyledTableRow>
                      )))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </Paper>
        </div >
      </div >
      {editModalOpen && (
        <div style={modalOverlayStyle}>
          <div className="modal-content">
            <EditForm post={editingData} onSave={handleSaveEdit} onCancel={() => setEditModalOpen(false)} />
          </div>
        </div>
      )
      }
    </>
  );
}

