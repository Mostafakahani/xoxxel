import { Button, Grid, Typography } from "@mui/material";
import StepCategoryDownBanner from "Components/Common/HomePageSteps/FAQ/StepCategoryDownBanner";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { useState } from "react";
const ChangeCategoryDownBanner = () => {
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
                    <Typography sx={{ color: '#333333', my: '15px', fontSize: '18px' }}> تصویر ایتم های زیر بنر Category Gift Card  </Typography>
                    <Grid>
                        {sliderCategoryData.map((x, index) => (
                            <StepCategoryDownBanner
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
export default ChangeCategoryDownBanner;