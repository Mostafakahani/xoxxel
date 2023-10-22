import { AccordionSummary, Accordion, AccordionDetails, Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, MenuItem, Select, SvgIcon, TextField, Typography, InputAdornment, ListItemIcon, ListItemText, ListItem, List, FormControl, InputLabel, Autocomplete } from "@mui/material";
import { EyesIcon } from "Icons/icons";
import React, { useEffect, useState } from "react";


const CreateAccessLevel = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [dataBody, setDataBody] = useState([
        {
            id: '2321',
            data: [
                'Mostafa',
                {
                    type: "textBold",
                    text: 'Text Test item',
                    img: '/images/icons/access.svg'
                },
            ],
        },
        {
            id: '2zz321',
            data: [
                'zzMostafa',
                {
                    type: "textBold",
                    text: 'zzText Test item',
                    img: '/images/icons/setting.svg'
                },
            ],
        },
    ]);

    // useEffect(() => {
    //     fetch('https://api.thecatapi.com/v1/images/search?limit=20')
    //         .then(response => response.json())
    //         .then(data => {
    //             setDataBody(data.map((item, index) => ({
    //                 id: index + 1,
    //                 data: [
    //                     `#${index + 1}`,
    //                     {
    //                         type: "textBold",
    //                         text: item.id || "نام ناشناخته",
    //                         // text: item?.breeds[0]?.name || "نام ناشناخته",
    //                         img: item.url
    //                     },
    //                 ],
    //             })));
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }, []);
    // useEffect(() => {
    //     fetch('https://api.thecatapi.com/v1/images/search?limit=20')
    //         .then(response => response.json())
    //         .then(data => {
    //             if (Array.isArray(data)) {
    //                 setDataBody(data.map((item, index) => ({
    //                     id: index + 1,
    //                     data: [
    //                         `#${index + 1}`,
    //                         {
    //                             type: "textBold",
    //                             text: item.id || "نام ناشناخته",
    //                             img: item.url
    //                         },
    //                     ],
    //                 })));
    //             } else {
    //                 console.error('Invalid response format. Expected an array.');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }, []);





    const [checked, setChecked] = React.useState({
        accessCustomerList: false,
        accessCustomerInfo: false,
        accessNotes: false,
        accessAttachment: false,
        accessCreateCustomer: false,
        accessActivityCustomer: false,
        accessDocumentsCustomer: false,
        accessHistoryCustomer: false,
        allAccess: false,
        customAccess: false,
        tableId: tableId
    });

    // const handleChange = (event, name) => {
    //     setChecked({
    //         ...checked,
    //         [name]: event.target.checked,
    //     });
    // };

    const logValues = () => {
        const values = {
            accessCustomerList: checked.accessCustomerList,
            accessCustomerInfo: checked.accessCustomerInfo,
            accessNotes: checked.accessNotes,
            accessAttachment: checked.accessAttachment,
            accessCreateCustomer: checked.accessCreateCustomer,
            accessActivityCustomer: checked.accessActivityCustomer,
            accessDocumentsCustomer: checked.accessDocumentsCustomer,
            accessHistoryCustomer: checked.accessHistoryCustomer,
            customAccess: checked.customAccess,
            allAccess: checked.allAccess,
            tableId: tableId
        };

        console.log("مقادیر:", values);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3, justifyContent: 'space-around' }}>
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                    label="لیست اشخاص"
                    control={
                        <Checkbox
                            checked={checked.accessCustomerList}
                            onChange={(event) => handleChange(event, 'accessCustomerList')}
                        />
                    } />
                <FormControlLabel
                    label="اطلاعات اشخاص"
                    control={
                        <Checkbox
                            checked={checked.accessCustomerInfo}
                            onChange={(event) => handleChange(event, 'accessCustomerInfo')}
                        />
                    }
                />
                <FormControlLabel
                    label="یادداشت ها"
                    control={
                        <Checkbox
                            checked={checked.accessNotes}
                            onChange={(event) => handleChange(event, 'AccessNotes')}
                        />

                    }
                />
                <FormControlLabel
                    label="پیوست ها"
                    control={
                        <Checkbox
                            checked={checked.accessAttachment}
                            onChange={(event) => handleChange(event, 'AccessAttachment')}
                        />
                    }
                />
            </Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                    label="ایجاد شخص"
                    control={
                        <Checkbox
                            checked={checked.accessCreateCustomer}
                            onChange={(event) => handleChange(event, 'AccessCreateCustomer')}
                        />
                    }
                />
                <FormControlLabel
                    label="فعالیت"
                    control={
                        <Checkbox
                            checked={checked.accessActivityCustomer}
                            onChange={(event) => handleChange(event, 'AccessActivityCustomer')}
                        />
                    }
                />
                <FormControlLabel
                    label="اسناد ها"
                    control={
                        <Checkbox
                            checked={checked.accessDocumentsCustomer}
                            onChange={(event) => handleChange(event, 'AccessDocumentsCustomer')}
                        />
                    }
                />
                <FormControlLabel
                    label="سابقه ها"
                    control={
                        <Checkbox
                            checked={checked.accessHistoryCustomer}
                            onChange={(event) => handleChange(event, 'AccessHistoryCustomer')}
                        />
                    }
                />
            </Grid>
        </Box>
    );


    // Search
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(dataBody);
    const [selectedItem, setSelectedItem] = useState("");

    useEffect(() => {
        if (searchText.trim() === '') {
            setFilteredData(dataBody);
        } else {
            const lowercaseSearchText = searchText.toLowerCase();
            const filteredItems = dataBody.filter(row => {
                const hasTextBold = row.data.some(e => e.type === 'textBold' && e.text.toLowerCase().includes(lowercaseSearchText));
                return hasTextBold;
            });
            setFilteredData(filteredItems);
        }
    }, [searchText, dataBody]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValue, setSelectedValue] = useState(dataBody);
    // const data = [
    //     { label: 'مقدار 1', value: 1, icon: '/images/icons/access.svg' },
    //     { label: 'مقدار 2', value: 2, icon: '/images/icons/setting.svg' },
    //     { label: 'مقدار 3', value: 3, icon: '/images/icons/tickets.svg' },
    // ];

    const handleSearch = (e, value) => {
        setSearchTerm(value);
    };

    const handleSelect = (e, value) => {
        setDataBody(value);

    };




    return (
        <Grid>
            <Button onClick={() => { setOpen(true); console.log(open) }} sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px" }}>
                <Grid style={{ display: 'flex', alignItems: 'center', color: '#1C49F1' }}>
                    <EyesIcon />
                    <Typography>مشاهده و ویرایش</Typography>
                </Grid>
            </Button>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={open}
                onClose={() => {
                    setOpen(false);
                    console.log(open)
                }}
            >
                <DialogContent
                    sx={{ px: "50px", py: "30px" }}
                >
                    <Typography align="left" sx={{ my: ' 15px' }}>ایجاد ویژگی محصول</Typography>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextField
                            size={'small'}
                            label={'نوع'}
                        />

                        {/* <FormControl variant="outlined" size="small">
                            <TextField
                                size="small"
                                placeholder="جستجو محصول مورد نظر"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                variant="outlined"
                                fullWidth

                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Box component={'img'} src="/images/light.svg" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Select
                                value={selectedItem}
                                onChange={(e) => setSelectedItem(e.target.value)}
                                fullWidth
                            >
                                {filteredData.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                        {/* <TextField
                            label="جستجو"
                            onChange={handleSearch}
                            size="small"
                            placeholder="جستجو محصول مورد نظر"
                            value={searchText}
                            // onChange={(e) => setSearchText(e.target.value)}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box component={'img'} src="/images/light.svg" />
                                    </InputAdornment>
                                ),
                            }}
                        /> */}
                        <Autocomplete
                            loading={true}
                            size="small"
                            fullWidth
                            options={dataBody}
                            getOptionLabel={(option) => option.id}
                            value={dataBody}
                            onChange={handleSelect}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="انتخاب کنید"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: selectedValue && selectedValue.img && (
                                            <InputAdornment position="start">
                                                <Box component={'img'} src={selectedValue.img} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    {option.img && <Box component={'img'} src={option.img} sx={{ mr: '8px' }} />}
                                    {option.id}
                                </li>
                            )}

                        />
                    </Grid>

                    <Grid>
                        <FormControlLabel
                            label="همه دسترسی ها"
                            control={
                                <Checkbox
                                    checked={checked.allAccess}
                                    onChange={(event) => handleChange(event, 'AllAccess')}
                                />
                            }
                        />
                        <FormControlLabel
                            label="دسترسی اختصاصی"
                            control={
                                <Checkbox
                                    checked={checked.customAccess}
                                    onChange={(event) => handleChange(event, 'CustomAccess')}
                                />
                            }
                        />
                    </Grid>

                    <Grid>
                        <Accordion>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <FormControlLabel
                                    label="اشخاص"
                                    control={
                                        <Checkbox
                                            checked={checked[0] && checked[1]}
                                            indeterminate={checked[0] !== checked[1]}
                                            onChange={checked}
                                        />
                                    }
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                {children}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid>
                        <Button variant="contained" onClick={logValues} disableElevation sx={{ borderRadius: '8px', backgroundColor: '#e0b207', color: '#000', fontWeight: 800 }}>ایجاد</Button>
                    </Grid>
                </DialogContent>
            </Dialog>




        </Grid >
    );
};

export default CreateAccessLevel;