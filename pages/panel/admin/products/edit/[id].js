import React, { useEffect, useState } from 'react';
import AccountLayout from 'Components/Common/Layout/AccountLayout';
import StandardImageList from 'Components/Common/Images';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Card from '../../../../../src/Components/Common/NewCreateProduct/Card';
import LablesInputs from 'Components/Common/NewCreateProduct/LabelInputs';
import SeoTools from 'Components/Common/NewCreateProduct/SEOTools';
import CheckboxesTags from 'Components/Common/CheckBoxList';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import axios from 'axios';
import ServerURL from 'Components/Common/Layout/config';
import GetToken from 'GetToken';

function CreateProduct() {
    const [product, setProduct] = useState({
        title: null,
        input_lable: null,
        placeholder_input: null,
        description: null,
        alt_image_main: null,
        alt_image_trends: null,
        alt_image_square: null,
        seo_title: null,
        seo_description: null,
        seo_link: null,
        id_type: null,
        image_square: {},
        image_trend: {},
        image_main: {},
        features: [],
    });

    const [idStorage, setIdStorage] = useState();
    const [responseId, setResponseId] = useState(0);
    const [checkBoxList, setCheckBoxList] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    const fetchData = async () => {
        const config = {
            headers: {
                Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken('user')}`,
            },
        };

        try {
            if (id !== undefined) {
                const response = await axios.get(`${ServerURL.url}/admin/product/${id}`, config);
                const dataResponse = response.data;

                if (dataResponse) {
                    // Set initial state based on data from the API
                    setProduct((prevProduct) => ({
                        ...prevProduct,
                        title: dataResponse.title,
                        input_lable: dataResponse.input_lable,
                        placeholder_input: dataResponse.placeholder_input,
                        description: dataResponse.description,
                        id_type: dataResponse.id_type?.id,
                        image_square: { id: dataResponse.image_square?.id },
                        image_trend: { id: dataResponse.image_trend?.id },
                        image_main: { id: dataResponse.image_main?.id },
                        features: dataResponse.features?.map((feature) => feature.id) || [],
                    }));
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (id === undefined || id === null) {
        return <h3>Loading...</h3>;
    }

    return (
        <>
            <AccountLayout>
                <Grid container rowSpacing={5}>
                    <Grid container item>
                        <Typography>ویرایش محصول</Typography>
                    </Grid>
                    <Grid item container xs={12} sm={4}>
                        <TextField size='small' fullWidth />
                    </Grid>
                    <Grid item container rowSpacing={3}>
                        <Card saveClick={() => console.log('saveClick')} editClick={() => console.log('editClick')} titleCard={'Slider'} imageSizeText={'تصویر اصلی (297*147)'} imagePreview={'/images/1-1.png'} changeAlt={(e) => setProduct((prevProduct) => ({ ...prevProduct, alt_image_main: e }))} />
                        <Card saveClick={() => console.log('saveClick')} editClick={() => console.log('editClick')} titleCard={'Trends'} imageSizeText={'تصویر Trends (153*190)'} imagePreview={'/images/1-1.png'} changeAlt={(e) => setProduct((prevProduct) => ({ ...prevProduct, alt_image_trends: e }))} />
                        <Card saveClick={() => console.log('saveClick')} editClick={() => console.log('editClick')} titleCard={'Square'} imageSizeText={'تصویر اسلایدی یا مربعی (134*134)'} imagePreview={'/images/1-1.png'} changeAlt={(e) => setProduct((prevProduct) => ({ ...prevProduct, alt_image_square: e }))} />
                    </Grid>
                    {/* <StandardImageList
                        label={"تصویر Trends (153*190)"}
                        idStorage={setIdStorage}
                        onChange={(e) => {
                            setIdStorage(e);
                            console.log(e);
                        }} /> */}
                    <Grid item container columnSpacing={5} rowSpacing={2}>
                        <LablesInputs label={'Label input'} changeInput={(e) => setProduct((prevProduct) => ({ ...prevProduct, input_lable: e }))} />
                        <LablesInputs label={'Placeholder'} changeInput={(e) => setProduct((prevProduct) => ({ ...prevProduct, placeholder_input: e }))} />
                        <LablesInputs label={'Description'} changeInput={(e) => setProduct((prevProduct) => ({ ...prevProduct, description: e }))} />
                    </Grid>
                    <Grid item container>
                        <SeoTools changeTitleTag={(e) => setProduct((prevProduct) => ({ ...prevProduct, seo_title: e }))} chnageShortLink={(e) => setProduct((prevProduct) => ({ ...prevProduct, seo_link: e }))} changeMetaDescription={(e) => setProduct((prevProduct) => ({ ...prevProduct, seo_description: e }))} />
                    </Grid>
                    <Grid item container>
                        <CheckboxesTags
                            id={'2'}
                            value={checkBoxList}
                            responseId={responseId}
                            onChange={(e) => {
                                setCheckBoxList(e);
                            }}
                        />
                    </Grid>
                    <Grid item container>
                        <Grid item>
                            <Button sx={{ textTransform: 'none', color: '#fff', backgroundColor: '#19B13A' }} endIcon={<Add />}>Add Product</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </AccountLayout>
        </>
    )
}

export default CreateProduct