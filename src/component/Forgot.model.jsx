import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,

} from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  textTransform: 'none',
  color: (theme) => theme.palette.primary.main,
});

const useStyles = {
  dialogContent: {
    minWidth: 300,
  },
  input: {
    width: '100%',
    marginBottom: (theme) => theme.spacing(2),
  },
};
const StyledDialogContent = styled(DialogContent)(useStyles.dialogContent);
const StyledTextField = styled(TextField)(useStyles.input);

function ForgotPasswordModal() {
  const {  resetPassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [errors, setErrors] = useState(null);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendResetEmail = () => {
    resetPassword(email,setIsReset,handleClose(),setErrors)
  };


  return (
    <div>
      <StyledButton onClick={handleOpen}>
        Forgot Password?
      </StyledButton>
      {isReset ? (
        <p>Password reset email sent. Check your inbox.</p>
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Forgot Password</DialogTitle>

          <StyledDialogContent>
            <DialogContentText>
              Enter your email address, and we&apos;ll send you a password reset link.
            </DialogContentText>
            <StyledTextField

              variant="outlined"
              label="Email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSendResetEmail} color="primary">
              Send Reset Email
            </Button>
          </DialogActions>
          {errors && <p>{errors}</p>}
        </Dialog>
      )
      }
    </div>
  );
}

export default ForgotPasswordModal;
