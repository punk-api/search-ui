import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import UserContext from "./UserContext";

export function UserDialog({ setUser }) {
  const [open, setOpen] = React.useState(false);
  const user = useContext(UserContext);

  const [username, setUsername] = React.useState(user);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    handleClose();
    setUser(username);
  };

  return (
    <>
      <Typography variant="p" noWrap>
        {user}
      </Typography>
      <IconButton
        edge="end"
        aria-label="account of current user"
        // aria-controls={menuId}
        onClick={handleClickOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Authentication</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please specify a username or name for this demo.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            required
            onSubmit={handleSubmit}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
