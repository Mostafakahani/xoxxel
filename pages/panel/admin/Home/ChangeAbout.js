import { Button, Grid } from "@mui/material";
import StepAbout from "Components/Common/HomePageSteps/FAQ/StepAbout";
import AccountLayout from "Components/Common/Layout/AccountLayout";
const ChangeAbout = () => {




    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Grid>
                        <StepAbout />
                    </Grid>
                    <Grid sx={{ my: '20px' }}>
                        <Button variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}>ذخیره تغییرات</Button>
                    </Grid>
                </Grid>
            </AccountLayout>

        </>
    )
}
export default ChangeAbout;