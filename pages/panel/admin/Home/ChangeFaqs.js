import { Button, Grid } from "@mui/material";
import StepOne from "Components/Common/HomePageSteps/FAQ/StepOne";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import UploadFile from "Components/Common/UploadFile";
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
    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Grid>
                        {faqsData.map((x, index) => (
                            <Grid item xs={12} key={index}>
                                <StepOne textStep={x.textStep} id={index} />
                            </Grid>
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
export default ChangeFaqs;