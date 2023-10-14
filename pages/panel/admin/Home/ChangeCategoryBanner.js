import { Button, Grid, Typography } from "@mui/material";
import StepChangeSlider from "Components/Common/HomePageSteps/FAQ/StepChangeSlider";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { useState } from "react";
const ChangeCategoryBanner = () => {
    const sliderCategoryData = [
        { textStep: 'اسلایدر اول', },

    ]
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Typography sx={{ color: '#333333', my: '15px', fontSize: '18px' }}> بنر صفحه category gift card  </Typography>
                    <Grid>
                        {sliderCategoryData.map((x, index) => (
                            <StepChangeSlider
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
export default ChangeCategoryBanner;