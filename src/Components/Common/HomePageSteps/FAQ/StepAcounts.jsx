import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import HandleTableCategoryTopUpForYou from "Components/Common/HomePageSteps/TableGiftCards/HandleTables/HandleTableCategoryTopUpForYou";

const StepAcounts = (props) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')


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
                                <Grid item xs={12} sm={7} md={6}>
                                    <TextField
                                        // error={!priceError ? false : true}
                                        // helperText={!priceError ? '' : ErrorList[1]}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        value={question}
                                        label="سوال  "
                                        variant="outlined"
                                        sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={7} md={12}>
                                   <HandleTableCategoryTopUpForYou/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </AccordionDetails>
            </Accordion>

        </>
    )
}
export default StepAcounts;