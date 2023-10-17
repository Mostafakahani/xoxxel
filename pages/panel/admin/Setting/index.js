import AccountLayout from "Components/Common/Layout/AccountLayout";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const Setting = () => {
    const [open, setOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState('Faq');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const buttonStyle = {
        position: "relative",
        "&::after": {
            content: '""',
            width: "100%",
            height: "4px",
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
                <Grid sx={{
                    mb: '20px',
                }}>
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
                {
                    selectedButton === "Faq" && (
                        <>
                            <Grid>
                                <Link href={'/panel/admin/Home/AboutUsOurVsionFaq'}>
                                    <Button variant="contained">صفحه اصلی About us,our vision,faq</Button>
                                </Link>
                            </Grid>
                            <Grid>
                                <Link href={'/panel/admin/Home/StepHomePage'}>
                                    <Button variant="contained">مراحل صفحه اصلی</Button>
                                </Link>
                            </Grid>
                            <Grid>
                                <Link href={'/panel/admin/Home/ChangeSlider'}>
                                    <Button variant="contained">اسلایدر های صفحه اصلی</Button>
                                </Link>
                            </Grid>
                            <Grid>
                                <Link href={'/panel/admin/Home/ChangeCompanies'}>
                                    <Button variant="contained">کمپانی صفحه اصلی</Button>
                                </Link>
                            </Grid>
                        </>
                    ) ||
                    selectedButton === "About" && (

                        <Grid>
                            <Link href={'/panel/admin/Home/StepHomePage'}>
                                <Button variant="contained">مراحل صفحه اصلی</Button>
                            </Link>
                        </Grid>
                    ) || selectedButton === "ourV" && (
                        <Grid>
                            <Link href={'/panel/admin/Home/ChangeSlider'}>
                                <Button variant="contained">اسلایدر های صفحه اصلی</Button>
                            </Link>
                        </Grid>

                    )
                }


            </Grid>
        </AccountLayout>
    );
};

export default Setting;

// درصورت نشدنه

// import AccountLayout from "Components/Common/Layout/AccountLayout";
// import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
// import { useState } from "react";
// import TabelOptions from "Components/Common/TableItems/TabelOptions";
// import ChangeFaqs from "../Home/ChangeFaqs";
// import ChangeAbout from "../Home/ChangeAbout";
// import ChangeOurVision from "../Home/ChangeOurVision";


// const Setting = () => {
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
// export default Setting;