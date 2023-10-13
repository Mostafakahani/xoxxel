import { Button, Grid, Typography } from "@mui/material";
import StepChangeSlider from "Components/Common/HomePageSteps/FAQ/StepChangeSlider";
import StepOne from "Components/Common/HomePageSteps/FAQ/StepOne";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { useState } from "react";
const ChangeSlider = () => {
    const sliderData = [
        { textStep: 'اسلایدر اول', },
        { textStep: 'اسلایدر دوم', },
        { textStep: 'اسلایدر سوم', },
        { textStep: 'اسلایدر چهارم', },
        { textStep: 'اسلایدر پنجم', },
        { textStep: 'اسلایدر ششم', },
    ]
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Typography sx={{ color: '#333333', my: '15px', fontSize: '18px' }}> اسلایدر صفحه اصلی</Typography>

                    <Grid>
                        {sliderData.map((x, index) => (
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
export default ChangeSlider;