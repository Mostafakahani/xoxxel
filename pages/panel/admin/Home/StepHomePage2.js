import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, TextField, Typography } from "@mui/material"
import BackArrow from "Components/Common/Back";
import StandardImageList from "Components/Common/Images";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import ServerURL from "Components/Common/Layout/config";
import UploadFile from "Components/Common/UploadFile";
import axios from "axios";
import { useEffect, useState } from "react";

const StepHomePage = () => {
    const [expanded, setExpanded] = useState('panel1');
    const [name, setName] = useState('')
    const [titel, setTitel] = useState('')
    const [text, setText] = useState('')

    const [name2, setName2] = useState('')
    const [titel2, setTitel2] = useState('')
    const [text2, setText2] = useState('')

    const [name3, setName3] = useState('')
    const [titel3, setTitel3] = useState('')
    const [text3, setText3] = useState('')

    const [allData, setAllData] = useState([])
    const [allDataTemp, setAllDataTemp] = useState([])

    const [selectedFileItem, setSelectedFileItem] = useState({});
    const [selectedFileItem2, setSelectedFileItem2] = useState({});
    const [selectedFileItem3, setSelectedFileItem3] = useState({});
    useEffect(() => {

        const fetchData = async () => {
            const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
            try {
                const responseCategory = await axios.get(
                    `${ServerURL.url}/admin/info/level/list`,
                    config
                );

                const formattedData = formatData(responseCategory.data);

                setAllData(formattedData);
                setAllDataTemp(formattedData);

            } catch (error) {
                console.error("Error fetching data from server", error);
            }
        }
        fetchData()
    }, []);

    const formatData = (data) => {
        return data.map((x, index) => ({
            id: x.id,
            name: x.data.name,
            title: x.data.title,
            description: x.data.description,
            id_storage: x.id_storage || null,
        }));
    };

    const handleSubmit = () => {
        let requestData = [];
        if (name !== '' && titel !== '' && text !== '' && selectedFileItem.length !== 0) {
            requestData.push({ name: name, titel: titel, text: text });
        }
        if (name2 !== '' && titel2 !== '' && text2 !== '' && selectedFileItem2.length !== 0) {
            requestData.push({ name: name2, titel: titel2, text: text2 });
        }
        if (name3 !== '' && text3 !== '' && text3 !== '' && selectedFileItem3.length !== 0) {
            requestData.push({ name: name3, titel: titel3, text: text3 });
        }
        if (requestData.length === 0) {
            console.error("لطفاً حداقل یکی از مقادیر را وارد کنید.");
        } else {
            setAllData(prevData => [...prevData, ...requestData]);
            console.log("ارسال شد: ", requestData);
        }
        console.log(allData)
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <>
            <AccountLayout>
                <Grid sx={{ backgroundColor: '#fff', p: '25px' }}>
                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
                        <Typography sx={{ color: '#333333', my: '15px', fontSize: '18px' }}> مراحل صفحه اصلی</Typography>
                        <BackArrow />
                    </Grid>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none' }}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography sx={{ color: '#2C7EFA', my: '15px', fontSize: '16px' }}>مرحله اول</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid >
                                <Grid container>
                                    <Grid container>
                                        <Grid item xs={12} sm={7} md={4}>
                                            <TextField
                                                // error={!priceError ? false : true}
                                                // helperText={!priceError ? '' : ErrorList[1]}
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                                label="نام  "
                                                variant="outlined"
                                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={7} md={7}>
                                            <TextField
                                                // error={!priceError ? false : true}
                                                // helperText={!priceError ? '' : ErrorList[1]}
                                                onChange={(e) => setTitel(e.target.value)}
                                                value={titel}
                                                label="عنوان  "
                                                variant="outlined"
                                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} md={12}>
                                        <TextField
                                            // error={!priceError ? false : true}
                                            // helperText={!priceError ? '' : ErrorList[1]}
                                            onChange={(e) => setText(e.target.value)}
                                            value={text}
                                            label="متن  "
                                            variant="outlined"
                                            type="text"
                                            multiline
                                            // flexGrow={1}
                                            sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <StandardImageList
                                            label={'ویدیو ( 728*357)'}
                                            onChange={(e) => {
                                                setSelectedFileItem(e);
                                                console.log(e);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none' }}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography sx={{ color: '#2C7EFA', my: '15px', fontSize: '16px' }}>مرحله دوم</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid >
                                <Grid container>
                                    <Grid container>
                                        <Grid item xs={12} sm={7} md={4}>
                                            <TextField
                                                // error={!priceError ? false : true}
                                                // helperText={!priceError ? '' : ErrorList[1]}
                                                onChange={(e) => setName2(e.target.value)}
                                                value={name2}
                                                label="نام  "
                                                variant="outlined"
                                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={7} md={7}>
                                            <TextField
                                                // error={!priceError ? false : true}
                                                // helperText={!priceError ? '' : ErrorList[1]}
                                                onChange={(e) => setTitel2(e.target.value)}
                                                value={titel2}
                                                label="عنوان  "
                                                variant="outlined"
                                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} md={12}>
                                        <TextField
                                            // error={!priceError ? false : true}
                                            // helperText={!priceError ? '' : ErrorList[1]}
                                            onChange={(e) => setText2(e.target.value)}
                                            value={text2}
                                            label="متن  "
                                            variant="outlined"
                                            type="text"
                                            multiline
                                            // flexGrow={1}
                                            sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <StandardImageList
                                            label={'ویدیو ( 728*357)'}
                                            onChange={(e) => {
                                                setSelectedFileItem2(e);
                                                console.log(e);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ border: '2px dashed #5a5a5a75', borderRadius: '10px', my: '15px', boxShadow: 'none' }}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography sx={{ color: '#2C7EFA', my: '15px', fontSize: '16px' }}>مرحله سوم</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid >
                                <Grid container>
                                    <Grid container>
                                        <Grid item xs={12} sm={7} md={4}>
                                            <TextField
                                                onChange={(e) => setName3(e.target.value)}
                                                value={name3}
                                                label="نام"
                                                variant="outlined"
                                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={7} md={7}>
                                            <TextField
                                                onChange={(e) => setTitel3(e.target.value)}
                                                value={titel3}
                                                label="عنوان"
                                                variant="outlined"
                                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} md={12}>
                                        <TextField
                                            onChange={(e) => setText3(e.target.value)}
                                            value={text3}
                                            label="متن"
                                            variant="outlined"
                                            type="text"
                                            multiline
                                            // flexGrow={1}
                                            sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <StandardImageList
                                            label={'ویدیو ( 728*357)'}
                                            onChange={(e) => {
                                                setSelectedFileItem3(e);
                                                console.log(e);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Grid sx={{ my: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            // onClick={handleSubmit}
                            onClick={() => console.log(allData)}
                        // sx={{ borderRadius: '5px', backgroundColor: '#1C49F1', color: '#FFFFFF' }}
                        >ذخیره تغییرات
                        </Button>
                    </Grid>
                </Grid>
            </AccountLayout>

        </>
    )
}
export default StepHomePage