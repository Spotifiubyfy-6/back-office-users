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
        }).catch((err) => {
            params.setError("Server is not available. Try again later.");
        });
}

export default function UserProfileButton(props) {
    const [open, setOpen] = React.useState(false);

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
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">The Beatles</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        The Beatles were an English rock band, formed in Liverpool in 1960, that comprised John Lennon, Paul McCartney, George Harrison and Ringo Starr.
                        They are regarded as the most influential band of all time[1] and were integral to the development of 1960s counterculture and popular music's
                        recognition as an art form.[2] Rooted in skiffle, beat and 1950s rock and roll, their sound incorporated elements of classical music and
                        traditional pop in innovative ways; the band later explored music styles ranging from ballads and Indian music to psychedelia and hard rock.
                        As pioneers in recording, songwriting and artistic presentation, the Beatles revolutionised many aspects of the music industry and were often
                        publicised as leaders of the era's youth and sociocultural movements.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Go Back</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
