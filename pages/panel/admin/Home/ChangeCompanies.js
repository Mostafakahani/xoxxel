import { Button, Grid, Typography } from "@mui/material";
import StepChangeCompanies from "Components/Common/HomePageSteps/FAQ/StepChangeCompanies";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { useState } from "react";
const ChangeCompanies = () => {
    const companiesData = [
        { textStep: 'کمپانی اول', },
        { textStep: 'کمپانی دوم', },
        { textStep: 'کمپانی سوم', },
        { textStep: 'کمپانی چهارم', },
        { textStep: 'کمپانی پنجم', },
        { textStep: 'کمپانی ششم', },
    ]
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Typography sx={{ color: '#333333', my: '15px', fontSize: '18px' }}> کمپانی های صفحه اصلی</Typography>

                    <Grid>
                        {companiesData.map((x, index) => (
                            <StepChangeCompanies
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
export default ChangeCompanies;