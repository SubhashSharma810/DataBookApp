import React, { useState } from 'react'
import '../style/DataForm.css'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';




export default function DataForm() {
  const { saveDataInFirestore } = useAuth();
  const [values, setValues] = useState({
    item_name: "",
    item_type: "",
    quantity: "",
    price: "",
    profit: "",
    // date: new Date(),
    // discount: false,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [open, setOpen] = React.useState(false);



  //Save Data by Form in Firestore 
  const handelDataSubmit = async (event) => {
    event.preventDefault();
    try {
      await saveDataInFirestore(values, setSuccMsg, setOpen, setErrorMsg,);
      setValues({
        item_name: "",
        item_type: "",
        quantity: "",
        price: "",
        profit: "",

      });


      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="container dataformStyle "  >
      <form className="dataForm">
        {succMsg ? <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    setSuccMsg("");
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {succMsg}
            </Alert>
          </Collapse>
        </Box> : <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity='error'

            >
              {errorMsg}
            </Alert>
          </Collapse>
        </Box>}
        <h1>Data Form</h1>
        <div className="fields">
          <label htmlFor="inputItemName" className="fieldsLabel">Item Name</label>
          <input value={values.item_name} type="text"
            onChange={(event) => setValues((prev) => ({ ...prev, item_name: event.target.value }))}
            className="fieldsinput"  id="inputItemName" />
        </div>
        <div className="fields">
          <label htmlFor="input ItemName" className="fieldsLabel">Category </label>
          <input value={values.item_type} type="text"
            onChange={(event) => setValues((prev) => ({ ...prev, item_type: event.target.value }))}
            className="fieldsinput"  id="inputItemName" />
        </div>
        <div className="fields">
          <label htmlFor="inputQuantity" className="fieldsLabel">Quantity</label>
          <input value={values.quantity} type="number"
            onChange={(event) => setValues((prev) => ({ ...prev, quantity: event.target.value }))}
            className="fieldsinput" id="inputQuantity" />
        </div>
        <div className="fields">
          <label htmlFor="inputPrice" className="fieldsLabel">Price</label>
          <input value={values.price} type="number"
            onChange={(event) => setValues((prev) => ({ ...prev, price: event.target.value }))}
            className="fieldsinput"  id="inputPrice" placeholder="" />
        </div>
        <div className="fields">
          <label htmlFor="input RemAmount" className="fieldsLabel">Profit</label>
          <input value={values.profit} type="number"
            onChange={(event) => setValues((prev) => ({ ...prev, profit: event.target.value }))}
            className="fieldsinput"id="inputRemAmount" placeholder="" />
        </div>
        <div className="fields">
          <div className="fieldsLabel">
            <input className="fieldsCheck" type="checkbox" id="gridCheck" />
            <label className="" htmlFor="gridCheck">
              Discount %
            </label>
          </div>
        </div>
        <div className="fields">
          <button type="submit" onClick={handelDataSubmit} className="btnSubmit">Submmit</button>
        </div>
      </form>
    </div>
  )
}
