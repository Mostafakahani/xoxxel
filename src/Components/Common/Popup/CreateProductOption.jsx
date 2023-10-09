import React, { useState } from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Typography, Grid, ListItemIcon, ListItem, ListItemText, Box } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';







const AddProductFeature = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState(null);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [completedFirstStep, setCompletedFirstStep] = useState(false);

    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => {
        setOpen(false);
        setRegion("")
        setCategory("")
        setName("");
        setPrice("");
        setCompletedFirstStep(false)
    };
    const handleNext = () => { setCompletedFirstStep(true); };
    const handleSubmit = () => {
        const product = { region, category, name, price, tableId };
        console.log(product);
        setOpen(false);
        handleClear()
    };
    const handleClear = () => {
        setName("");
        setPrice("");
        setRegion("")
        setCategory("")
        setCompletedFirstStep(false)
    };

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
        py: '6px'

    }

    return (
        <Grid>
            <Button sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px", mr: "10px" }}
                onClick={handleClickOpen}>
                افزودن ویژگی
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"  >
                <DialogTitle id="form-dialog-title" sx={{ fontSize: "20px" }}>ایجاد ویژگی محصول</DialogTitle>
                <Typography sx={{ px: '25px', fontSize: "15px" }}>برای ایجاد محصول ابتدا ریجن را مشخص کنید و دسته را مشخص کنید</Typography>
                <DialogContent sx={{ py: '20px' }}>
                    {completedFirstStep && (
                        <>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Product Name"
                                type="text"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="price"
                                label="Product Price"
                                type="number"
                                fullWidth
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </>
                    )}
                    {!completedFirstStep && (
                        <>
                            <Grid sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
                                            // <MenuItem key={x.id} value={x.value}>
                                            //     <ListItem disablePadding>
                                            //         <ListItemIcon>
                                            //             {x.icon}
                                            //         </ListItemIcon>
                                            //         <ListItemText primary={x.value} />
                                            //     </ListItem>
                                            // </MenuItem>
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
                                        <MenuItem value="" disabled>
                                            انتخاب کنید
                                        </MenuItem>
                                        {menuCats.map((x) => (
                                            <MenuItem value={x.value}>{x.value}</MenuItem>
                                        ))}

                                    </Select>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: 'flex-start', pb: '30px' }}>
                    <Grid >
                        {region && category && completedFirstStep && (
                            <>
                                <Button sx={btnStyle} onClick={handleSubmit} >
                                    ایجاد ویژگی
                                </Button>
                                {/* <Button onClick={handleClear} >
                                Clear
                            </Button> */}
                            </>
                        )}
                        {
                            (region !== null && category !== '') && (
                                <Button sx={btnStyle} onClick={handleNext} >
                                    رفتن به مرحله بعد
                                </Button>
                            )
                        }



                        {/* {!completedFirstStep && (
                            <Button sx={btnStyle} onClick={handleNext} >
                                رفتن به مرحله بعد
                            </Button>
                        )} */}
                        {/* {completedFirstStep && (
                            <Button sx={btnStyle} onClick={() => setCompletedFirstStep(false)} >
                                برگشت به مرحله قبل
                            </Button>
                        )} */}
                        <Button sx={{ borderRadius: '5px', border: '1.299px solid #989898', color: "#222222", ml: ' 10px', px: '30px', py: '5px' }} onClick={handleClose} >
                            انصراف
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default AddProductFeature;