// ChangeAbout.jsx

import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StepFormNew from "Components/Common/HomePageSteps/FAQ/StepFormNew";

const ChangeAbout = () => {
    const [data, setData] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const config = {
                    headers: {
                        Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                    },
                };
                const response = await axios.get(`${ServerURL.url}/admin/info/level/list`, config);
                console.log("Response data:", response.data);
                setData(response.data || []);
                setDataTemp(response.data.data || []);
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

            const response = await axios.post(
                `${ServerURL.url}/admin/info/level/create`,
                data,
                config
            );

            if (response.status === 201) {
                toast.success("تغییرات با موفقیت انجام شد");
            } else {
                toast.error("لطفا دوباره تلاش کنید");
            }
        } catch (error) {
            console.error("Error sending save request:", error);
        }
    };

    const handleFieldChange = (index, fieldName, value) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], [fieldName]: value };
            return newData;
        });
    };

    return (
        <>
            <AccountLayout>
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
                <Grid sx={{ backgroundColor: "#fff", p: "25px" }}>
                    <Grid>
                        {data.length > 0 ? (
                            <Grid>
                                {data.map((item, index) => (
                                    <StepFormNew
                                        key={index}
                                        name={item.name}
                                        title={item.title}
                                        description={item.description}
                                        onFieldChange={(fieldName, value) => handleFieldChange(index, fieldName, value)}
                                    />
                                ))}
                            </Grid>
                        ) : (
                            <p>No data available.</p>
                        )}
                    </Grid>
                    <Grid sx={{ my: "20px" }}>
                        <Button
                            onClick={handleSaveChanges}
                            variant="contained"
                            disableElevation
                            disabled={JSON.stringify(data) === JSON.stringify(dataTemp)}
                            sx={{ borderRadius: "5px", backgroundColor: "#1C49F1", color: "#FFFFFF" }}
                        >
                            ذخیره تغییرات
                        </Button>
                    </Grid>
                </Grid>
            </AccountLayout>
        </>
    );
};

export default ChangeAbout;
