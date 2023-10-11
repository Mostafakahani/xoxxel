import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Rows from "./row";


const AddProductFeatureNew = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState(null);
    const [category, setCategory] = useState("ندارد");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [favourite, setFavourite] = useState("");
    const [completedFirstStep, setCompletedFirstStep] = useState(false);
    const [products, setProducts] = useState([
        { region: 'North America', category: 'دسته دوم', name: 'محصول یک', price: 100 },
        { region: 'Europe', category: 'دسته سوم', name: 'محصول دو', price: 150 },
        { region: 'Asia', category: 'ندارد', name: 'محصول سه', price: 200 },
    ]);

    const [textFieldCount, setTextFieldCount] = useState(1);

    const [step, setStep] = useState(true)


    const menuItems = [
        { id: 1, value: 'North America', icon: '/images/Flags.png' },
        { id: 2, value: 'Europe', icon: '/images/Flags.png' },
        { id: 3, value: 'Asia', icon: '/images/Flags.png' },
    ]
    const menuCats = [
        { id: 1, value: 'ندارد' },
        { id: 2, value: 'دسته دوم' },
        { id: 3, value: 'دسته سوم' },
    ]
    const btnStyle = {
        backgroundColor: '#1C49F1',
        color: '#F4F4F4',
        "&:hover": {
            backgroundColor: '#4066f3'
        },
        borderRadius: '5px',
        py: '6px',
        mt: '30px'

    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    // const deleteRow = () => {
    //     setTextFieldCount(textFieldCount - 1);
    // };
    const handleNext = () => {
        setStep(false);
    };
    const renderRows = () => {
        return Array.from({ length: textFieldCount }, (v, i) => (
            <Grid key={i}>
                <TextField
                    key={i}
                    margin="dense"
                    type="text"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    required
                    sx={{ width: "450px" }}
                />
                <Grid>
                    <Button
                        onClick={() => {
                            deleteRow(i);
                        }}
                    >
                        Delete This Row
                    </Button>
                </Grid>
            </Grid>
        ));
    }

    return (
        <Grid>
            <Button sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px", mr: "10px" }}
                onClick={() => {
                    handleClickOpen()
                    console.log(open)
                }}>
                افزودن ویژگی
            </Button>
            <Dialog
                fullWidth
                maxWidth={step ? 'sm' : 'lg'}
                open={open}
                onClose={() => {
                    setOpen(false)
                    setName("");
                    setPrice("");
                    setRegion("")
                    setCategory("ندارد")
                    setStep(true)
                }}
            >
                <DialogContent
                    sx={{ px: "50px", py: "30px" }}
                >
                    <Typography align="left" sx={{ my: ' 10px' }}>ایجاد ویژگی محصول</Typography>

                    {
                        step && (
                            <>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid>
                                        <Typography>ریجن</Typography>
                                        <Select
                                            value={region}
                                            onChange={(e) => setRegion(e.target.value)}
                                            fullWidth
                                            displayEmpty
                                            inputProps={{ "aria-label": "Region" }}
                                            sx={{ width: { md: '200px', xs: '100px' }, display: 'flex !important' }}
                                        >
                                            {menuItems.map((x) => (
                                                <MenuItem key={x.id} value={x.value}>
                                                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box component={'img'} src={x.icon} width={'30'} height={'auto'} sx={{ mr: "10px" }} />
                                                        <Typography>{x.value}</Typography>
                                                    </Grid>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid>
                                        <Typography>دسته</Typography>
                                        <Select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            fullWidth
                                            displayEmpty
                                            inputProps={{ "aria-label": "Category" }}
                                            sx={{ width: { md: '200px', xs: '100px' } }}
                                        >
                                            {menuCats.map((x) => (
                                                <MenuItem key={x.id} value={x.value}>{x.value}</MenuItem>
                                            ))}

                                        </Select>
                                    </Grid>
                                </Grid>

                            </>
                        )
                    }
                    {
                        !step && (
                            <>
                                <Grid>
                                    <DialogContentText align="left" sx={{ my: '20px' }}>ایجاد محصول برای ریجن {region}</DialogContentText>
                                </Grid>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-evenly', width: "100%", my: '30px' }}>
                                    <Grid>
                                        <Typography>نام محصول</Typography>
                                        {/* {renderRows()} */}
                                        <Rows />
                                        <Grid>
                                            {/* <Button sx={{ backgroundColor: '#1C49F1', color: '#F4F4F4', "&:hover": { backgroundColor: '#4066f3' } }}
                                                onClick={() => {
                                                    setTextFieldCount(textFieldCount + 1);
                                                }}
                                            >
                                                +
                                            </Button> */}
                                        </Grid>
                                    </Grid>
                                    {/* <Grid>
                                    <Button
                                        onClick={() => {
                                            deleteRow();
                                        }}
                                    >
                                        Delete This Row
                                    </Button>
                                </Grid> */}
                                </Grid>

                                <Grid>
                                    {
                                        textFieldCount < 10 && (

                                            <Button
                                                onClick={() => {
                                                    setTextFieldCount(textFieldCount + 1);
                                                }}
                                            >
                                                افزودن ردیف +
                                            </Button>
                                        )
                                    }

                                </Grid>
                            </>

                        )

                    }
                    {
                        step && region !== null && (
                            <Button sx={btnStyle} onClick={handleNext} >
                                رفتن به مرحله بعد
                            </Button>
                        )
                    }
                </DialogContent>
            </Dialog>

        </Grid >
    );
};

export default AddProductFeatureNew;