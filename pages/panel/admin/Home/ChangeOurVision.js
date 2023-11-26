import { Button, Grid } from "@mui/material";
import StepChangeOurVision from "Components/Common/HomePageSteps/FAQ/StepChangeOurVision";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify"; // Import the toast object

const ChangeOurVision = () => {
    const [changedTitel, setChangedTitel] = useState('');
    const [changedText, setChangedText] = useState('');
    const [data, setData] = useState([])

    const handleChange = (newTitel, newText) => {
        setChangedTitel(newTitel);
        setChangedText(newText);
    };

    useEffect(() => {
        async function fetchData() {
            const config = {
                headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`, }
            };
            const response = await axios.get(
                `${ServerURL.url}/admin/info/get-our-version`,
                config
            );
            setData(response.data.data);
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
                title: changedTitel, // Use changedTitel instead of question
                description: changedText, // Use changedText instead of text
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

    return (
        <>
            <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                <Grid>
                    <StepChangeOurVision
                        getTitel={data.title}
                        des={data.description}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid sx={{ my: '20px' }}>
                    <Button onClick={handleSaveChanges} variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}>ذخیره تغییرات</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ChangeOurVision;
