import { Button, Grid, Typography } from "@mui/material";
import StepGiftCards from "Components/Common/HomePageSteps/FAQ/StepGiftCards";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { useState } from "react";
const ChangeGiftCards = () => {
    const sliderCategoryData = [
        { textStep: 'ایتم اول', },
        { textStep: 'ایتم دوم', },
        { textStep: 'ایتم سوم', },
        { textStep: 'ایتم چهارم', },
        { textStep: 'ایتم پنجم', },
        { textStep: 'ایتم ششم', },

    ]
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Typography sx={{ color: '#333333', my: '15px', fontSize: '18px' }}>
                        صفحه گیفت کارت The latest
                    </Typography>
                    <Grid>
                        {sliderCategoryData.map((x, index) => (
                            <StepGiftCards
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
export default ChangeGiftCards;