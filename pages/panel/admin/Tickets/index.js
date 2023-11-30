import AccountLayout from "Components/Common/Layout/AccountLayout";
import { Grid } from "@mui/material";
import Chat from "Components/Common/Chat/Chat";

const Tickets = () => {
    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: 3, borderRadius: "10px" }}>
                    <Chat />
                </Grid>
            </AccountLayout>
        </>
    );
};

export default Tickets;