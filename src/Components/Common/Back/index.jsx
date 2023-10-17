import { Grid, SvgIcon, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const BackArrow = (props) => {
    const router = useRouter();
    const handleGoBack = () => {
        // اگر کاربر از یک لینک قبلی به این صفحه آمده باشد، به صفحه قبلی منتقل شود.
        // در غیر این صورت به مسیر /panel/admin/Setting منتقل شود.
        if (router.asPath === props.link) {
            window.history.back();
        } else {
            router.push("/panel/admin/Setting");
        }
    };

    return (
        <Grid>
            <div onClick={handleGoBack}>
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', cursor: 'pointer' }}>
                    <Typography variant="p" sx={{ color: '#494949', fontSize: { xs: '12px', md: '14px' } }}>برگشت</Typography>
                    <SvgIcon sx={{ ml: '10px', width: { xs: '20px', md: '24px' }, height: "auto" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#494949" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.5 12H3.67004" stroke="#494949" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </SvgIcon>
                </Grid>
            </div>
        </Grid>
    );
};

export default BackArrow;
