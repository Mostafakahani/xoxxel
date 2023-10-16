import { Button, Grid } from "@mui/material";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { useState } from "react";
import TableProducts from "./Tables/TableProducts";
import StepAcounts from "Components/Common/HomePageSteps/FAQ/StepAcounts";
const ChangeAcounts = () => {
    const faqsData = [
        { textStep: 'شماره اول', },
        { textStep: 'شماره دوم', },
        { textStep: 'شماره سوم', },

    ]
    const [expanded, setExpanded] = useState(null); 

    const handleAccordionChange = (panel, isExpanded) => {
        setExpanded(isExpanded ? panel : null); 
    };

    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Grid>
                        {faqsData.map((x, index) => (
                            <StepAcounts
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
            </AccountLayout>

        </>
    )
}
export default ChangeAcounts;