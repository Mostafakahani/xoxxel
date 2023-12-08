import AccountLayout from "Components/Common/Layout/AccountLayout";
import { Button, Grid, Typography } from "@mui/material";
import { useState, useMemo } from "react";

import Waits from "./Waits";
import All from "./All";
import BackArrow from "Components/Common/Back";
import { IconProduct } from "Icons/icons";


const components = {
    Waits: Waits,
    All: All,
};

const Peyment = () => {
    const [selectedButton, setSelectedButton] = useState('All');
    const Component = useMemo(() => components[selectedButton], [selectedButton]);

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    };
    const buttonStyle = {
        position: "relative",
        "&::after": {
            content: '""',
            width: "100%",
            height: "2px",
            borderRadius: "6px",
            backgroundColor: "primary.main",
            position: "absolute",
            top: "100%",
            left: "0%",
            transform: "translateY(-50%)",
            display: "block",
            animation: 'slideIn .5s forwards',

        },

        '@keyframes slideIn': {
            from: {
                width: 0,
            },
            to: {
                width: '100%',
            },
        },

    };
    return (
        <AccountLayout>
            <Grid
                container
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
                mb={3}
            >
                <Grid item xs={12} md={6} sx={{ mb: { xs: "25px", md: "0" } }}>
                    <Grid sx={{ display: "flex" }}>
                        <IconProduct />
                        <Typography sx={{ ml: "10px" }}>لیست پرداخت ها</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
            </Grid>
            <Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
                    <Grid>
                        <Button onClick={() => {
                            setSelectedButton("All");
                        }}
                            sx={selectedButton === "All" ? buttonStyle : {}}
                        >
                            All
                        </Button>
                        <Button onClick={() => {
                            setSelectedButton("Waits");
                        }}
                            sx={selectedButton === "Waits" ? buttonStyle : {}}
                        >
                            Waits
                        </Button>
                    </Grid>
                </Grid>
                <Grid>
                    {Component && <Component />}
                </Grid>
            </Grid>
        </AccountLayout>
    );
};

export default Peyment;
