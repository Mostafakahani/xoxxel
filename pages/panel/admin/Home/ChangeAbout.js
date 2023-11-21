import { Button, Grid } from "@mui/material";
import StepAbout from "Components/Common/HomePageSteps/FAQ/StepAbout";
import ServerURL from "Components/Common/Layout/config";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const ChangeAbout = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState('')

    const [question, setQuestion] = useState('')
    const [text, setText] = useState('')
    
    useEffect(() => {
        async function fetchData() {
            const config = { headers: { Authorization: `${ServerURL.Bear}` } };
            const response = await axios.get(
                `${ServerURL.url}/admin/info/get-about-us`,
                config
            );
            setData(response.data.data);
        }
        fetchData();
    }, [count]);


    return (
        <>

            <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                <Grid>
                    <StepAbout
                        sendQuestion={(e) => setQuestion(e)}
                        sendText={(e) => setText(e)}
                        getTitel={''}
                    />
                </Grid>
                <Grid sx={{ my: '20px' }}>
                    <Button onClick={() => console.log(question, text)} variant="contained" disableElevation sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}>ذخیره تغییرات</Button>
                </Grid>
            </Grid>


        </>
    )
}
export default ChangeAbout;