import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography } from "@mui/material";
import UploadFile from "Components/Common/UploadFile";
import { useState } from "react";

const StepGiftCardCategoryTopUp = (props) => {
    const [link, setLink] = useState('')
    const [deliveryType, setDeliveryType] = useState('')
    const [customer, setCustomer] = useState('')
    const [save, setSave] = useState('')
    const [button, setButton] = useState('')



    const handleSubmit = () => {
        // let requestData = [];
        // if (question !== '' && answer !== '' && text !== '') {
        //     requestData.push({ name: question, titel: answer, text: text });
        // }
        // if (name2 !== '' && titel2 !== '') {
        //     requestData.push({ name: name2, titel: titel2, text: text2 });
        // }
        // if (name3 !== '' && text3 !== '') {
        //     requestData.push({ name: name3, titel: titel3, text: text3 });
        // }
        // if (requestData.length === 0) {
        //     console.error("لطفاً حداقل یکی از مقادیر را وارد کنید.");
        // } else {
        //     setAllData(prevData => [...prevData, ...requestData]);
        //     console.log("ارسال شد: ", requestData);
        // }
    };

    const handleChange = (panel) => (event, isExpanded) => {
        props.onChange(panel, isExpanded);
    };
    return (
        <>
            <Accordion expanded={props.expanded === `panel${props.id}`} onChange={handleChange(`panel${props.id}`)} sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none' }}>
                <AccordionSummary aria-controls={`panel${props.id}d-content`} id={`panel${props.id}d-header`}>
                    <Typography sx={{ color: '#2C7EFA', my: '10px', fontSize: '16px' }}>{props.textStep} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid >
                        <Grid container>
                            <Grid container>

                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={7} md={12}>
                                    <UploadFile
                                        id={"file1"}
                                        accept="video/*"
                                        label={"تصویر  ( 728*357)"}
                                        onChange={(e) => console.log(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={7} md={12}>
                                    <TextField
                                        // error={!priceError ? false : true}
                                        // helperText={!priceError ? '' : ErrorList[1]}
                                        onChange={(e) => setLink(e.target.value)}
                                        value={link}
                                        label="لینک  ( 728*357)  "
                                        variant="outlined"
                                        // multiline
                                        // flexGrow={1}
                                        sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={7} md={3}>
                                    <TextField
                                        // error={!priceError ? false : true}
                                        // helperText={!priceError ? '' : ErrorList[1]}
                                        onChange={(e) => setDeliveryType(e.target.value)}
                                        value={deliveryType}
                                        label="Delivery type"
                                        variant="outlined"
                                        // multiline
                                        // flexGrow={1}
                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={7} md={3}>
                                    <TextField
                                        // error={!priceError ? false : true}
                                        // helperText={!priceError ? '' : ErrorList[1]}
                                        onChange={(e) => setCustomer(e.target.value)}
                                        value={customer}
                                        label="customer"
                                        variant="outlined"
                                        // multiline
                                        // flexGrow={1}
                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={7} md={3}>
                                    <TextField
                                        // error={!priceError ? false : true}
                                        // helperText={!priceError ? '' : ErrorList[1]}
                                        onChange={(e) => setSave(e.target.value)}
                                        value={save}
                                        label="Save"
                                        variant="outlined"
                                        // multiline
                                        // flexGrow={1}
                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={7} md={3}>
                                    <TextField
                                        // error={!priceError ? false : true}
                                        // helperText={!priceError ? '' : ErrorList[1]}
                                        onChange={(e) => setButton(e.target.value)}
                                        value={button}
                                        label="Button"
                                        variant="outlined"
                                        // multiline
                                        // flexGrow={1}
                                        sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </AccordionDetails>
            </Accordion>

        </>
    )
}
export default StepGiftCardCategoryTopUp;