import AccountLayout from "Components/Common/Layout/AccountLayout";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { IconProduct, IconSetting } from "Icons/icons";

const Setting = () => {
    const [open, setOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState('Home');
    const handleClickOpen = () => {
        setOpen(true);
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
                <Grid item xs={12} md={6} sx={{ mb: { xs: '25px', md: '20px' } }}>
                    <Grid sx={{ display: 'flex' }}>
                        <IconSetting />
                        <Typography sx={{ ml: "10px" }}> تنظیمات</Typography>
                    </Grid>
                    {/* <Grid>
                        <Typography sx={{ mt: "10px", fontSize: '12px' }}>شما میتوانید در لیست زیر تمام محصولات ثبت شده را مشاهده و ویرایش کنید.</Typography>
                    </Grid> */}
                </Grid>
                <Grid sx={{
                    mb: '20px',
                }}>
                    <Button onClick={() => {
                        setSelectedButton("Home");
                        handleClickOpen();
                    }}
                        sx={selectedButton === "Home" ? buttonStyle : {}}
                    >
                        Home
                    </Button>
                    <Button onClick={() => {
                        setSelectedButton("Dashboard shop");
                        handleClickOpen();
                    }}
                        sx={selectedButton === "Dashboard shop" ? buttonStyle : {}}

                    >
                        Dashboard shop
                    </Button>
                    <Button onClick={() => {
                        setSelectedButton("Category gift card");
                        handleClickOpen();
                    }}
                        sx={selectedButton === "Category gift card" ? buttonStyle : {}}

                    >
                        Category gift card
                    </Button>
                    <Button onClick={() => {
                        setSelectedButton("Category top up");
                        handleClickOpen();
                    }}
                        sx={selectedButton === "Category top up" ? buttonStyle : {}}

                    >
                        Category top up
                    </Button>
                </Grid>
                {
                    selectedButton === "Home" && (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Link href={'/panel/admin/Home/AboutUsOurVsionFaq'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">صفحه اصلی About us,our vision,faq</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/LevelPage'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">مراحل صفحه اصلی</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/ChangeSlider'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">اسلایدر های صفحه اصلی</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/ChangeCompanies'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">کمپانی صفحه اصلی</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/ChangeAcounts'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">صفحه اصلی Accounts</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </>
                    ) ||
                    selectedButton === "Dashboard shop" && (
                        <Grid item xs={12} md={6}>
                            <Link href={'/panel/admin/Home/LevelPage'}>
                                <Button sx={{ fontSize: '12px' }} variant="contained">مراحل صفحه اصلی</Button>
                            </Link>
                        </Grid>
                    ) ||
                    selectedButton === "Category gift card" && (
                        <>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/ChangeGiftCards'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">بنر صفحه Category gift card</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/ChangeGiftCardsItem'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">تصویر ایتم های زیر بنر Category gift card</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/Tables/TableGiftCardTraningPage'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">صفحه گیفت کارت trending gift card</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/Tables/TablePupolarGiftCardPage'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">صفحه گیفت کارت pupolar gift card</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Link href={'/panel/admin/Home/ChangeSlider'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">صفحه گیفت کارت The latest</Button>
                                    </Link>
                                </Grid>
                            </Grid>

                        </>
                    ) ||
                    selectedButton === "Category top up" && (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Link href={'/panel/admin/Home/Tables/TableTopGamesGiftCardPage'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">Category Top games</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Link href={'/panel/admin/Home/ChangeSlider'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">Category top up بالای صفحه</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Link href={'/panel/admin/Home/Tables/TableTopForYouPage'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">Category Top ups-For you</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Link href={'/panel/admin/Home/Tables/TableTopTrendGamesPage'}>
                                        <Button sx={{ fontSize: '12px' }} variant="contained">Category Top ups-Trend gaming</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </>
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