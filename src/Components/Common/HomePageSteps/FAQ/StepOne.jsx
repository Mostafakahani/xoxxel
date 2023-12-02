// QuestionItem.js
import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const QuestionItem = ({ id, question, answer, expanded, onChange, onChangeItem }) => {
    const [localQuestion, setLocalQuestion] = useState(question);
    const [localAnswer, setLocalAnswer] = useState(answer);

    useEffect(() => {
        setLocalQuestion(question);
        setLocalAnswer(answer);
    }, [question, answer]);

    const handleChange = (panel) => (event, isExpanded) => {
        onChange(panel, isExpanded);
    };

    const handleQuestionChange = (e) => {
        const newQuestion = e.target.value;
        setLocalQuestion(newQuestion);
        onChangeItem({ question: newQuestion, answer: localAnswer });
    };

    const handleAnswerChange = (e) => {
        const newAnswer = e.target.value;
        setLocalAnswer(newAnswer);
        onChangeItem({ question: localQuestion, answer: newAnswer });
    };

    return (
        <Accordion expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)} sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none' }}>
            <AccordionSummary aria-controls={`panel${id}d-content`} id={`panel${id}d-header`}>
                <Typography sx={{ color: '#2C7EFA', my: '10px', fontSize: '16px' }}>{!localQuestion ? "سوال جدید" : localQuestion}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7} md={6}>
                        <TextField
                            onBlur={handleQuestionChange}
                            value={localQuestion}
                            label="سوال"
                            variant="outlined"
                            fullWidth
                            sx={{ my: '10px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7} md={12}>
                        <TextField
                            onBlur={handleAnswerChange}
                            value={localAnswer}
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
    );
};

export default QuestionItem;
