import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToggleButton, Snackbar, Box, Typography, Grid, Container, TextField, MenuItem } from '@mui/material';
import MyForm from './CreateProductOption';
import AddProductPopup from './CreateProductOption';
import AddProductFeatures from './CreateProductOption';

const Alerts = [
    { status: 'success', message: 'در حال انتقال به درگاه پرداخت...' },
    { status: 'error', message: "لطفا یک گزینه را انتخاب کنید." },
    {},
];

const SimplePopup = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedtotal, setSelectedtotal] = useState(null);
    const [selected, setSelected] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [selectMessage, setSelectMessage] = useState("");
    const [stateMessage, setStateMessage] = useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handletotalClick = (total) => {
        setSelectedtotal(total);
        setSelected(total);
        setSelectMessage(total);
    };

    const handlePurchaseClick = () => {
        if (selected === null) {
            const errorAlert = Alerts.find((alert) => alert.status === 'error');
            setAlertStatus('error');
            setAlertMessage(errorAlert ? errorAlert.message : "");
            setShowAlert(true);
        } else {
            console.log(`Total: ${selectedtotal}`);
            handleClose();
            const successAlert = Alerts.find((alert) => alert.status === 'success');
            setAlertStatus('success');
            setAlertMessage(successAlert ? successAlert.message : "");
            setShowAlert(true);
            console.log(props.id)
            setSelected(null)

        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };
    const ButtonData = [
        {
            total: 15,
            price: 65,

            // messageCode: '1',
        },
        {
            total: 25,
            price: 85,
            // messageCode: '2',
        },
        {
            total: 50,
            price: 150,
            // messageCode: '2',
        },
        {
            total: 'infinite',
            price: 130,
            img: '/inf.svg',

            // messageCode: '2',
        },
    ]


    const options = [
        "United state", "Iraq", "Iran"
    ];
    const options2 = ["ندارد", "Iraq", "Iran"];
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <div>
            <Button variant="contained" disableElevation onClick={handleClickOpen}
                sx={{
                    fontSize: "12px",
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    m: "auto",
                    borderRadius: '8px',
                    backgroundColor: '#D24093',
                }}>
                تمدید اکانت
            </Button>
            <Dialog
                fullWidth='true'
                open={open}
                onClose={handleClose}
                sx={{ fill: '#313237' }}
            >
                <DialogTitle>
                    ایجاد ویژگی محصول
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Grid sx={{ textAlign: "left" }}>
                        <Typography sx={{ textAlign: "left" }}>برای ایجاد محصول ابتدا ریجن را مشخص کنید و دسته را مشخص کنید</Typography>
                    </Grid>
                    <DialogContentText sx={{ display: 'flex', justifyContent: 'space-around', padding: '30px 10px' }}>
                        {/* <ToggleButton
                            value="check"
                            // selected={selected === total}
                            sx={{
                                backgroundColor: '#1B1C20',
                                borderRadius: '20px',
                                ml: '5px',
                                ':hover': {
                                    backgroundColor: '#222327',
                                },
                                "&.Mui-selected, &.Mui-selected:hover": {
                                    border: "1px solid #FF326F",
                                    backgroundColor: '#222327'
                                }
                            }}
                            onClick={() => {
                                handletotalClick(total)
                                setStateMessage(messageCode)
                            }}
                            size='medium'
                        > */}
                        {/* </ToggleButton> */}
                        <Grid>
                            <AddProductFeatures

                            />
                        </Grid>
                        <Grid>
                            {/* <AddProductPopup options={options2} text={'دسته بندی'} /> */}

                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ direction: 'rtl', display: 'flex', justifyContent: "center ", textAlign: 'right', mb: '25px' }}>
                    <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handlePurchaseClick}
                            sx={{ ml: "10px", backgroundColor: '#fff', color: '#222222', p: '8px', border: '1.299px solid #989898', py: '8px', px: '26px' }}

                        >
                            انصراف
                        </Button>
                        <Button onClick={handleClose}
                            sx={{ backgroundColor: '#1C49F1', color: '#fff', p: '8px' }}
                        >
                            رفتن به مرحله بعد
                        </Button>
                    </Container>
                </DialogActions>
            </Dialog>
            {/* <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                message={alertMessage}
                severity={alertStatus}
            /> */}



        </div >
    );
};

export default SimplePopup;