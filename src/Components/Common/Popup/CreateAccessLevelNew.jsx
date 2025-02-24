import React, { useEffect, useState } from "react";
import {
    AccordionSummary, Accordion, AccordionDetails, Box, Button, Checkbox,
    Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, TextField,
    Typography, Autocomplete
} from "@mui/material";
import { EyesIcon } from "Icons/icons";
import AccessCustomerList from "./CheckBoxAccess/AccessCustomerList";



const CreateAccessLevelNew = ({ tableId, dataBodyFormat }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(dataBodyFormat);
    useEffect(() => {
        setInputValue(dataBodyFormat);
    }, [dataBodyFormat]);

    const [accessControl, setAccessControl] = useState([
        { action: "accessCustomerList", status: false, text: "لیست اشخاص" },
        { action: "accessCustomerInfo", status: false, text: "اطلاعات اشخاص" },
        { action: "accessNotes", status: false, text: "یادداشت ها" },
        { action: "accessAttachment", status: false, text: "پیوست ها" },
        { action: "accessCreateCustomer", status: false, text: "ایجاد شخص" },
        { action: "accessActivityCustomer", status: false, text: "فعالیت" },
        { action: "accessDocumentsCustomer", status: false, text: "اسناد ها" },
        { action: "accessHistoryCustomer", status: false, text: "سابقه ها" },
    ]);

    const [allData, setAllData] = useState([]);

    const Employee = [
        { code: 'AD', label: dataBodyFormat, icon: '/images/iconAccess.png' },
        { code: 'AE', label: 'مصطفی کاهانی', icon: '/images/iconAccess.png' },
        { code: 'AF', label: 'بهروز صدیقی', icon: '/images/iconAccess.png' },
        { code: 'AG', label: 'رضا کاهانی', icon: '/images/iconAccess.png' },
    ];

    const handleUpdateAccessControl = (updatedAccessControl) => {
        setAccessControl(updatedAccessControl);
    };
    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleCreateAccess = () => {
        const newData = [...accessControl, inputValue, tableId];
        setAllData(newData);
        console.log(newData); // or allData k farghi nadare
        setAllData([])
        setInputValue('')


    };

    return (
        <Grid container justifyContent={'center'}>
            <Button
                startIcon={<EyesIcon />}
                onClick={() => {
                    setIsDialogOpen(true);
                }}
                sx={{
                    backgroundColor: "#1C49F11A",
                    color: "#1C49F1",
                    borderRadius: "5px",
                }}
            >
                مشاهده و ویرایش
            </Button>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={isDialogOpen}
                onClose={handleDialogClose}
            >
                <DialogContent sx={{ px: "50px", py: "30px" }}>
                    <Typography sx={{ my: "15px", fontWeight: 800 }} align="left">
                        ویرایش سطح دسترسی
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="نوع" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                value={Employee.find(item => item.label === selectedValue) || null}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setSelectedValue(newValue.label);
                                        setInputValue(newValue.label);
                                    } else {
                                        setSelectedValue('');
                                    }
                                }}
                                options={Employee}
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => (
                                    <Box
                                        component="li"
                                        {...props}
                                        sx={{ display: "flex", alignItems: "center" }}
                                    >
                                        <img
                                            loading="lazy"
                                            width="25"
                                            src={`${option.icon}`}
                                            alt=""
                                        />
                                        {option.label}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="کارمند"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: "off",
                                        }}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ my: "25px" }}>
                            <AccessCustomerList
                                titelParent={"اشخاص"}
                                accessControl={accessControl}
                                onUpdateAccessControl={handleUpdateAccessControl}
                            // tableId={tableId}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        onClick={handleCreateAccess}
                        disableElevation
                        sx={{
                            mt: "20px",
                            borderRadius: "8px",
                            backgroundColor: "#e0b207",
                            color: "#000",
                            fontWeight: 800,
                        }}
                    >
                        ایجاد
                    </Button>
                </DialogContent>
            </Dialog>
        </Grid>
    );
};

export default CreateAccessLevelNew;
