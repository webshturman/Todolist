import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import { SetErrorMessageAC } from '../state/actions/loader-actions';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackBar = () => {
    const error = useSelector<AppRootState, string | null>(state => state.loader.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(SetErrorMessageAC(null))
    };
    const isOpen = error != null

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>

        // <Stack spacing={2} sx={{ width: '100%' }}>
        //     <Button variant="outlined" onClick={handleClick}>
        //         Open success snackbar
        //     </Button>

        // {/*<Alert severity="error">This is an error message!</Alert>*/}
        // {/*<Alert severity="warning">This is a warning message!</Alert>*/}
        // {/*<Alert severity="info">This is an information message!</Alert>*/}
        // {/*<Alert severity="success">This is a success message!</Alert>*/}
        // </Stack>
    );
}