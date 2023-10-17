import AccountLayout from "Components/Common/Layout/AccountLayout";
import { Button, Grid } from "@mui/material";
import { useState, useMemo } from "react";
import ChangeFaqs from "./ChangeFaqs";
import ChangeAbout from "./ChangeAbout";
import ChangeOurVision from "./ChangeOurVision";
import BackArrow from "Components/Common/Back";


const components = {
    Faq: ChangeFaqs,
    About: ChangeAbout,
    ourV: ChangeOurVision
};

const AboutUsOurVsionFaq = () => {
    const [open, setOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState('Faq');

    const Component = useMemo(() => components[selectedButton], [selectedButton]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
        handleClickOpen();
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

        '@keyframes slideIn': { // تعریف انیمیشن
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
            <Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
                    <Grid>
                        <Button onClick={() => {
                            setSelectedButton("Faq");
                            handleClickOpen();
                        }}
                            sx={selectedButton === "Faq" ? buttonStyle : {}}
                        >
                            FAQ
                        </Button>
                        <Button onClick={() => {
                            setSelectedButton("About");
                            handleClickOpen();
                        }}
                            sx={selectedButton === "About" ? buttonStyle : {}}

                        >
                            About us
                        </Button>
                        <Button onClick={() => {
                            setSelectedButton("ourV");
                            handleClickOpen();
                        }}
                            sx={selectedButton === "ourV" ? buttonStyle : {}}

                        >
                            Our visions
                        </Button>
                    </Grid>
                    <BackArrow />
                </Grid>
                <Grid>
                    {Component && <Component />}
                </Grid>
            </Grid>
        </AccountLayout>
    );
};

export default AboutUsOurVsionFaq;

// درصورت نشدنه

// import AccountLayout from "Components/Common/Layout/AccountLayout";
// import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
// import { useState } from "react";
// import TabelOptions from "Components/Common/TableItems/TabelOptions";
// import ChangeFaqs from "../Home/ChangeFaqs";
// import ChangeAbout from "../Home/ChangeAbout";
// import ChangeOurVision from "../Home/ChangeOurVision";


// const AboutUsOurVsionFaq = () => {
//     const [open, setOpen] = useState(false);
//     const [selectedButton, setSelectedButton] = useState('Faq');
//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     return (
//         <AccountLayout>
//             <Grid>
//                 <Grid>
//                     <Button onClick={() => {
//                         setSelectedButton("Faq");
//                         handleClickOpen();
//                     }}>
//                         FAQ
//                     </Button>
//                     <Button onClick={() => {
//                         setSelectedButton("About");
//                         handleClickOpen();
//                     }}>
//                         About us
//                     </Button>
//                     <Button onClick={() => {
//                         setSelectedButton("ourV");
//                         handleClickOpen();
//                     }}>
//                         Our visions
//                     </Button>
//                 </Grid>
//                 <Grid>
//                     {
//                         selectedButton === "Faq" && (
//                             <ChangeFaqs />
//                         ) ||
//                         selectedButton === "About" && (
//                             <ChangeAbout />
//                         ) || selectedButton === "ourV" && (
//                             <ChangeOurVision />
//                         )
//                     }

//                 </Grid>
//             </Grid>
//         </AccountLayout>
//     )
// }
// export default AboutUsOurVsionFaq;