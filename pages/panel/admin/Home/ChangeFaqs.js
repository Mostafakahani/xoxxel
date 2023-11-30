import { Button, Grid } from "@mui/material";
import StepOne from "Components/Common/HomePageSteps/FAQ/StepOne";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ChangeFaqs = () => {
    // const [faqsData, setFaqsData] = useState([
    //     { textStep: "سوال اول", textAnswer: 's' },
    //     { textStep: "سوال دوم", textAnswer: 's' },
    //     { textStep: "سوال سوم", textAnswer: 's' },
    //     { textStep: "سوال چهارم", textAnswer: 's' },
    //     { textStep: "سوال پنجم", textAnswer: 's' },
    //     { textStep: "سوال ششم", textAnswer: 's' }
    // ]);

    const [faqsData, setFaqsData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
            const responseCategory = await axios.get(
                `${ServerURL.url}/admin/info/faq/list`,
                config
            );
            setFaqsData(responseCategory.data);
        }
        fetchData();
    }, []);
    const [expanded, setExpanded] = useState(null);

    const handleAddQuestion = () => {
        setFaqsData([
            ...faqsData,
            { question: `سوال شماره ${faqsData.length + 1}` }
        ]);
    };


    const handleChange = (index, newData) => {
        setFaqsData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index] = { ...updatedData[index], ...newData };
            return updatedData;
        });
    };

    const handleAccordionChange = (panel, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    const handleSave = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                },
            };

            const createData = {
                FAQs: [
                    {
                        question: '',
                        answer: '',
                    },
                ],
            };

            const response = await axios.post(
                `${ServerURL.url}/admin/info/faq/create`,
                createData,
                config
            );
            if (response.data.status === "success") {
                toast.success("با موفقیت حذف شد.");
                setCount(count + 1);
            } else {
                toast.error("لطفا دوباره امتحان کنید");
            }
        } catch (error) {
            console.error("Error sending delete request:", error);
        }

    };

    return (
        <>
            <Grid sx={{ backgroundColor: "#fff", p: "25px" }}>
                <Grid>
                    {faqsData.map((x, index) => (
                        <StepOne
                            key={x.id}
                            id={x.id}
                            textStep={x.data.answer}
                            textAnswer={x.data.question}
                            expanded={expanded}
                            onChange={handleAccordionChange}
                            onChangeItem={(newData) => handleChange(index, newData)}
                        />
                    ))}
                </Grid>
                <Grid sx={{ my: "20px" }}>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            borderRadius: "5px",
                            backgroundColor: "#1C49F1",
                            color: "#FFFFFF"
                        }}
                        onClick={handleAddQuestion}
                    >
                        افزودن سوال
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            borderRadius: "5px",
                            backgroundColor: "#1C49F1",
                            color: "#FFFFFF",
                            ml: "10px"
                        }}
                        onClick={handleSave}
                    >
                        ذخیره تغییرات
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            borderRadius: "5px",
                            backgroundColor: "#1C49F1",
                            color: "#FFFFFF",
                            ml: "10px"
                        }}
                        onClick={() => console.log(faqsData)}
                    >
                        clg
                    </Button>

                </Grid>
            </Grid>
        </>
    );
};
export default ChangeFaqs;
