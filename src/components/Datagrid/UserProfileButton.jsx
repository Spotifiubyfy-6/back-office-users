import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImageButton from "./ImageButton";

const image_src = "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"

function handleViewUserButtonClick(params) {
    params.apiHandler.getUserInfoWithId(params.id)
        .then((res) => {
            params.setOpen(true);
            params.setUserInfo(res.data);
        }).catch((err) => {
            params.setError("Server is not available. Try again later.");
        });
}

export default function UserProfileButton(props) {
    const [open, setOpen] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState(null);
    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const funcParams = {
        id: props.funcParams.id,
        apiHandler: props.funcParams.apiHandler,
        setOpen: setOpen,
        setUserInfo: setUserInfo,
        setError: props.funcParams.setError
    }

    return (
        <div>
            <ImageButton onClick={handleViewUserButtonClick} params={funcParams}
                         src={image_src} height="40" width="40" alt={"View User"}
                         arialLabel={'viewUser' + props.funcParams.id}/>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={"paper"}
                fullWidth={true}
                maxWidth={true}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{(userInfo) ? (userInfo.username) : ''}</DialogTitle>
                <DialogContent dividers={true}>
                    <ul>
                        <li>Email: {((userInfo) && (userInfo.email)) ? (userInfo.email) : 'Not specified'}</li>
                        <li>User type: {((userInfo) && (userInfo.user_type)) ? (userInfo.user_type) : 'Not specified'}</li>
                        <li>user_suscription: {((userInfo) && (userInfo.user_suscription)) ? (userInfo.user_suscription) : 'Not specified'}</li>
                        <li>Location: {((userInfo) && (userInfo.location)) ? (userInfo.location) : 'Not specified'}</li>
                        <li>Interests: {((userInfo) && (userInfo.interests.length)) ?
                            (<ul> {userInfo.interests.map((element) => <li>{element}</li>)} </ul>) :
                            'Not specified'}</li>
                    </ul>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Go Back</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
