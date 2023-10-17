import { Button, Grid } from "@mui/material";
import StepOne from "Components/Common/HomePageSteps/FAQ/StepOne";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { useState } from "react";
const ChangeFaqs = () => {
    const faqsData = [
        { textStep: 'سوال اول', },
        { textStep: 'سوال دوم', },
        { textStep: 'سوال سوم', },
        { textStep: 'سوال چهارم', },
        { textStep: 'سوال پنجم', },
        { textStep: 'سوال ششم', },
    ]
    const [expanded, setExpanded] = useState(null); 

    const handleAccordionChange = (panel, isExpanded) => {
        setExpanded(isExpanded ? panel : null); 
    };

    return (
        <>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Grid>
                        {faqsData.map((x, index) => (
                            <StepOne
                                key={index}
                                id={index}
                                textStep={x.textStep}
                                expanded={expanded}
                                onChange={handleAccordionChange} 
                            />
                        ))}
                    </Grid>
                    <Grid sx={{ my: '20px' }}>
                        <Button variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}>ذخیره تغییرات</Button>
                    </Grid>
                </Grid>

        </>
    )
}
export default ChangeFaqs;