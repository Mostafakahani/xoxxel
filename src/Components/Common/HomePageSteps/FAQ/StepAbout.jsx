import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography, Button } from "@mui/material";
import ServerURL from "Components/Common/Layout/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const StepAbout = ({ getTitel, des, sendQuestion = () => { }, sendText = () => { }, handleChange }) => {
    const [question, setQuestion] = useState(getTitel);
    const [text, setText] = useState(des);




    const handleSubmit = async () => {
        sendQuestion(question)
        sendText(text)
        // try {
        //     const config = {
        //         headers: {
        //             Authorization: `${ServerURL.Bear}`,
        //         },
        //     };

        //     const newData = {
        //         title: question, 
        //         description: text,
        //     };

        //     const response = await axios.post(
        //         `${ServerURL.url}/admin/info/about-us/create`,
        //         newData,
        //         config
        //     );
        //     if (response.data.status === "success") {
        //         toast.success("با موفقیت حذف شد.");
        //         setCount(count + 1);
        //     } else {
        //         toast.error("لطفا دوباره امتحان کنید");
        //     }
        // } catch (error) {
        //     console.error("Error sending delete request:", error);
        // }
    };

    return (
        <>
            <Grid sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none', p: '20px' }}>
                <Typography sx={{ color: '#2C7EFA', my: '10px', fontSize: '16px' }}>About us </Typography>
                <Grid >
                    <Grid container>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={6}>
                                <TextField
                                    onChange={(e) => {
                                        const newQuestion = e.target.value;
                                        setQuestion(newQuestion);
                                        handleChange(newQuestion, text);
                                    }}
                                    value={question || getTitel}
                                    label="عنوان"
                                    variant="outlined"
                                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={7} md={12}>
                                <TextField
                                    onChange={(e) => {
                                        const newText = e.target.value;
                                        setText(newText);
                                        handleChange(question, newText);
                                    }}
                                    value={text || des}
                                    label="متن"
                                    variant="outlined"
                                    multiline
                                    flexGrow={1}
                                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default StepAbout;