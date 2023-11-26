import { Button, Grid } from "@mui/material";
import StepAbout from "Components/Common/HomePageSteps/FAQ/StepAbout";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
const ChangeAbout = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])

    const [question, setQuestion] = useState('')
    const [text, setText] = useState('')

    const handleChange = (newQuestion, newText) => {
        setQuestion(newQuestion);
        setText(newText);
    };

    useEffect(() => {
        async function fetchData() {
            const config = {
                headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`, }
            };
            const response = await axios.get(
                `${ServerURL.url}/admin/info/get-about-us`,
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
                title: question,
                description: text,
            };

            const response = await axios.post(
                `${ServerURL.url}/admin/info/about-us/create`,
                newData,
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

    return (
        <>

            <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                <Grid>
                    <StepAbout
                        sendQuestion={(e) => setQuestion(e)}
                        sendText={(e) => setText(e)}
                        getTitel={data.title}
                        des={data.description}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid sx={{ my: '20px' }}>
                    <Button onClick={() => handleSaveChanges()} variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}>ذخیره تغییرات</Button>
                </Grid>
            </Grid>


        </>
    )
}
export default ChangeAbout;