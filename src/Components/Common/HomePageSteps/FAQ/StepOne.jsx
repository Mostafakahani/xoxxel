import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const StepOne = ({ expanded, id, textStep, textAnswer, onChange, onChangeItem }) => {
    const [question, setQuestion] = useState(textStep);
    const [answer, setAnswer] = useState(textAnswer);

    useEffect(() => {
        setQuestion(textStep);
        setAnswer(textAnswer);
    }, [textStep, textAnswer]);

    const handleChangeItem = (panel) => (event, isExpanded) => {
        onChange(panel, isExpanded);
        onChangeItem({ textStep: question, textAnswer: answer });
    };

    return (
        <>
            <Accordion expanded={expanded === `panel${id}`} onChange={handleChangeItem(`panel${id}`)} sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none' }}>
                <AccordionSummary aria-controls={`panel${id}d-content`} id={`panel${id}d-header`}>
                    <Typography sx={{ color: '#2C7EFA', my: '10px', fontSize: '16px' }}>{textStep}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={7} md={6}>
                            <TextField
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                    onChangeItem({ textStep: e.target.value, textAnswer: answer });
                                }}
                                value={question}
                                label="سوال"
                                variant="outlined"
                                fullWidth
                                sx={{ my: '10px' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7} md={12}>
                            <TextField
                                onChange={(e) => {
                                    setAnswer(e.target.value);
                                    onChangeItem({ textStep: question, textAnswer: e.target.value });
                                }}
                                value={answer}
                                label="جواب"
                                variant="outlined"
                                multiline
                                fullWidth
                                sx={{ my: '10px' }}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default StepOne;
