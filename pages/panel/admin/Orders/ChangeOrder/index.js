import { Box, Grid, Typography } from "@mui/material";
import BackArrow from "Components/Common/Back";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { IconOrders } from "Icons/icons";




const ChangeOrder = ({ id }) => {
    return (
        <>
            <AccountLayout>

                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
                    <Grid sx={{ display: 'flex' }}>
                        <IconOrders />
                        <Typography sx={{ ml: "10px" }}>
                            سفارش {id ? `${id}` : '#20024'}
                        </Typography>
                    </Grid>
                    <BackArrow link={'/panel/admin/Orders'} />
                </Grid>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Grid container>
                        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box component={'img'} src="/images/avatar.png" />
                            <Typography>Soroushnorozy</Typography>
                        </Grid>
                        <Grid></Grid>
                    </Grid>
                </Grid>
            </AccountLayout>

        </>
    )
}
export default ChangeOrder;