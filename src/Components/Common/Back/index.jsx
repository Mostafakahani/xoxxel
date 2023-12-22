import { Grid, SvgIcon, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const BackArrow = (props, { link }) => {
    const router = useRouter();
    const handleGoBack = () => {
        if (router.asPath === props.link) {
            router.push("/panel/admin/Setting");
        }
        else {
            window.history.back()
        }
    };

    return (
        <Grid onClick={handleGoBack} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', cursor: 'pointer' }}>
            <Typography variant="p" sx={{ color: '#494949', fontSize: { xs: '12px', md: '14px' } }}>برگشت</Typography>
            <SvgIcon sx={{ ml: '10px', width: { xs: '20px', md: '24px' }, height: "auto" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#494949" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.5 12H3.67004" stroke="#494949" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </SvgIcon>
        </Grid>
    );
};

export default BackArrow;
