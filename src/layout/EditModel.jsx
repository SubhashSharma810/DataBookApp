import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/EditForm.css';
import { FormLabel } from '@mui/material';



function EditForm({ post, onSave, onCancel }) {
  const [editedData, setEditedData] = useState(post);

  
  

  const handleSave = () => {
    console.log("Edited Data to Save:", editedData);
    onSave(editedData);
  }

  return (
    <div className="edit-form">
      <FormLabel>Item Name</FormLabel>
      <input
        type="text"
        value={editedData.name}
        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
      />
     <FormLabel>Category</FormLabel>

      <input
        type="text"
        value={editedData.category}
        onChange={(e) => setEditedData({ ...editedData, category: e.target.value })}
      />
     <FormLabel>Quantity</FormLabel>
      <input
        type="text"
        value={editedData.quantity}
        onChange={(e) => setEditedData({ ...editedData, quantity: e.target.value })}
      />
      
     <FormLabel>Item Price</FormLabel>
      <input
        type="text"
        value={editedData.price}
        onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
      />
      
     <FormLabel>Profit Percentage(%)</FormLabel>

      <input
        type="text"
        value={editedData.profit}
        onChange={(e) => setEditedData({ ...editedData, profit: e.target.value })}
      />
    
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>

  );
}
EditForm.propTypes = {
    post: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  export default EditForm;
