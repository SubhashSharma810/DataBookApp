import React, { createContext, useContext } from "react";
import { auth, fireDB } from "../fireBase/FirebaseAuth";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import PropTypes from 'prop-types';
import { doc, collection, addDoc, serverTimestamp, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);

  //SIGNIN CREDINTIAL 
  const login = async (values, navigate, setErrorMsg) => {
    signInWithEmailAndPassword(auth, values.email, values.pass).then((res) => {
      // const users = res.user;
      console.log(res);
      sessionStorage.setItem('Auth Token', res._tokenResponse)
      navigate("/")

    }).catch((err) => {
      if (err.code === 'auth/wrong-password') {
        setErrorMsg('Please check the Password')

      }
      if (err.code === 'auth/user-not-found') {
        setErrorMsg('Please check the Email')

      }
      console.log("Error", err)
    });
  };

  // Fatching Data From FireStore And Setting in Table 
  const fatchDataFromDb = async (setRows) => {
    onSnapshot(collection(fireDB, 'itemData'), (snapshot) => {
      if (snapshot.docs) {
        const datas = snapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id; // Set the 'id' property to the document ID
          return data;
        });
        datas.sort((a, b) => (new Date(b.date) - new Date(a.date)));
        setRows(datas);
      } else {
        console.error("No documents found in the 'itemData' collection.");
      }
    });
  }

  // Delete Data From FireStore  
  const deleteDataFromDataBase = async (data, setRows) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      try {
        // Use Firebase's Firestore API to delete the document by its ID
        const docRef = doc(fireDB, 'itemData', data.id);
        await deleteDoc(docRef);
        // Update the state to reflect the changes (remove the deleted data)
        setRows((prevRows) => prevRows.filter((row) => row.id !== data.id));
      } catch (error) {
        console.error('Error deleting document:', error);
      }

    }
  }

  //Save Edited Data in Edit Model From Firestore
  const saveEditData = async (editedData, setEditModalOpen) => {
    const docRef = doc(fireDB, 'itemData', editedData.id);
    try {
      await updateDoc(docRef, editedData);
      setEditModalOpen(false);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  //Save Data by Form in Firestore 
  const saveDataInFirestore = async (values, setSuccMsg, setOpen, setErrorMsg,) => {
    try {
      await addDoc(collection(fireDB, "itemData"), {
        name: values.item_name,
        category: values.item_type,
        quantity: values.quantity,
        price: values.price,
        profit: values.profit,
        date: serverTimestamp(),
        time: serverTimestamp(),
      }); setSuccMsg("Data Successfully Submitted");
      setOpen(true);
      // Reset the error message in case it was previously set
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.message);
      // Clear the success message when an error occurs
      setSuccMsg("");
    }
  }

  //Reset Password 
  const resetPassword = async (email, setIsReset, setError, handleClose) => {
    if (!email) {
      // Ensure an email address is provided
      return;
    }
    return sendPasswordResetEmail(auth, email,).then(() => {
      setIsReset(true);
      handleClose();
    }).catch((error) => {
      setError('Error sending password reset email:', error.message);
    })
  };

  const value = {
    // user,
    login,
    deleteDataFromDataBase,
    fatchDataFromDb,
    saveEditData,
    saveDataInFirestore,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>

};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};