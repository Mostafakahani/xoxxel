import { Button, Grid } from "@mui/material";
import StepChangeOurVision from "Components/Common/HomePageSteps/FAQ/StepChangeOurVision";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ChangeOurVision = () => {

    const [data, setData] = useState({
        title: "",
        description: "",
    });
    const [dataTemp, setDataTemp] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const config = {
                    headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` },
                };
                const response = await axios.get(
                    `${ServerURL.url}/admin/info/get-our-version`,
                    config
                );
                setData(response.data.data);
                setDataTemp(response.data.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    const handleSaveChanges = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                },
            };

            const newData = {
                title: data.title,
                description: data.description,
            };

            const response = await axios.post(
                `${ServerURL.url}/admin/info/our-version/create`,
                newData,
                config
            );

            if (response.status === 201) {
                toast.success("تغییرات با موفقیت انجام شد");
            } else {
                toast.error("لطفاً دوباره تلاش کنید");
            }
        } catch (error) {
            console.error("Error sending save request:", error);
        }
    };
    const handleFieldChange = (fieldName, value) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                <Grid>
                    <StepChangeOurVision
                        title={data.title}
                        description={data.description}
                        onFieldChange={handleFieldChange}
                    />
                </Grid>
                <Grid sx={{ my: '20px' }}>
                    <Button
                        onClick={handleSaveChanges}
                        variant="contained"
                        disableElevation
                        disabled={data === dataTemp}
                        sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}
                    >
                        ذخیره تغییرات
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ChangeOurVision;
