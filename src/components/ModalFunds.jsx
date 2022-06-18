import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [fundsToSend, setFunds] = React.useState('');
    const [alertContent, setAlertContent] = React.useState('');
    const [alert, setAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState('error');

  const sendFunds = () => {
    props.apiHandler.sendFunds(props.userId, fundsToSend)
    .then((response) => {
        console.log(response)
        setAlert(true)
        setAlertType('success')
        setAlertContent('Funds sent successfully!')
    })
    .catch((error) => {
        console.log(error);
        setAlert(true)
        setAlertType('error')
        setAlertContent('Error sending funds!')
        })
    }

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>Send Funds</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}  display="flex" flexDirection="column" alignItems="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Charge Funds To User {props.userId}  
          </Typography>
            {alert ? <Alert severity={alertType} >{alertContent}</Alert> : <></> }
            <TextField id="standard-basic" label="Funds" style={{'margin-top': 10}} onChange = {(e) => setFunds(e.target.value)}/>
            <Button onClick={sendFunds} variant='contained' color="success" style={{'margin-top': 10}}>Confirm</Button>
            <Button onClick={handleClose} color="error">Close</Button>
        </Box>
      </Modal>
        
    </div>
  );
}
