import { AccordionSummary, Accordion, AccordionDetails, Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, MenuItem, Select, SvgIcon, TextField, Typography, InputAdornment, ListItemIcon, ListItemText, ListItem, List, FormControl, InputLabel, Autocomplete, CircularProgress } from "@mui/material";
import { EyesIcon } from "Icons/icons";
import React, { useEffect, useState } from "react";

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}
const CreateAccessLevelNew = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [openComplete, setOpenComplete] = useState(false);
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
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...dataBody]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    // Tests
    // const items = dataBody.map((x) => x)

    return (
        <Grid>
            <Button onClick={() => { setOpen(true); }} sx={{ backgroundColor: '#1C49F11A', color: '#1C49F1', borderRadius: "5px" }}>
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
                }}
            >
                <DialogContent
                    sx={{ px: "50px", py: "30px" }}
                >
                    <Autocomplete
                        id="asynchronous-demo"
                        sx={{ width: 300 }}
                        open={openComplete}
                        onOpen={() => {
                            setOpenComplete(true);
                        }}
                        onClose={() => {
                            setOpenComplete(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={option.icon} alt={option.id} style={{ marginRight: '8px' }} />
                                {option.text}
                            </div>
                        )}
                        getOptionSelected={(option, value) => option.text === value.text}
                        options={options}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Asynchronous"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}


                    />

                    <Grid>
                        <Button variant="contained"
                            // onClick={() => console.log(options[0].data[1].img)} // از options استفاده کنید
                            disableElevation sx={{ mt: '100px', borderRadius: '8px', backgroundColor: '#e0b207', color: '#000', fontWeight: 800 }}
                        >
                            ایجاد
                        </Button>

                    </Grid>
                </DialogContent>
            </Dialog>
        </Grid >
    );
};

export default CreateAccessLevelNew;