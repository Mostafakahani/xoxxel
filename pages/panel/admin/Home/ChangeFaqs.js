// ChangeFaqs.js
import { Button, Grid } from "@mui/material";
import QuestionItem from "Components/Common/HomePageSteps/FAQ/StepOne";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// ChangeFaqs.js
// ...
const ChangeFaqs = () => {
    const [faqsData, setFaqsData] = useState([]);

    const [expanded, setExpanded] = useState(null);

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

    const handleAddQuestion = () => {
        setFaqsData([
            ...faqsData,
            { id: Date.now(), data: { answer: '', question: `سوال شماره ${faqsData.length + 1}` } }
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

            // اعتبارسنجی
            const validFaqs = faqsData.filter(item => item.data.question.trim() !== '' || item.data.answer.trim() !== '');

            if (validFaqs.length === 0) {
                console.log('هیچ سوالی برای ذخیره وجود ندارد.');
                return;
            }

            const createData = {
                FAQs: validFaqs.map(item => ({ question: item.data.question, answer: item.data.answer })),
            };

            const response = await axios.post(
                `${ServerURL.url}/admin/info/faq/create`,
                createData,
                config
            );
            if (response.data.status === "success") {
                toast.success("با موفقیت ذخیره شد.");
            } else {
                toast.error("لطفاً دوباره امتحان کنید");
            }
        } catch (error) {
            console.error("Error sending save request:", error);
        }
    };

    return (
        <Grid sx={{ backgroundColor: "#fff", p: "25px" }}>
            <Grid>
                {/* {faqsData.map((x, index) => (
                    <QuestionItem
                        key={x.id}
                        id={x.id}
                        question={x.data.answer}
                        answer={x.data.question}
                        expanded={expanded}
                        onChange={handleAccordionChange}
                        onChangeItem={(newData) => handleChange(index, newData)}
                    />
                ))} */}
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
            </Grid>
        </Grid>
    );
};

export default ChangeFaqs;
