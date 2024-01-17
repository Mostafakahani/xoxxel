import React, { useEffect, useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StandardImageList from "Components/Common/Images";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Card from "../../../../../src/Components/Common/NewCreateProduct/Card";
import LablesInputs from "Components/Common/NewCreateProduct/LabelInputs";
import SeoTools from "Components/Common/NewCreateProduct/SEOTools";
import CheckboxesTags from "Components/Common/CheckBoxList";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
import axios from "axios";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import SelectCountry from "Components/Common/NewCreateProduct/SelectCountry";
import CreateOptionFeature from "Components/Common/Creatives/CreateOptionFeature";
import SelectCategory from "Components/Common/NewCreateProduct/SelectCategory";
import ButtonImage from "Components/Common/Images/ButtonImage";
import ShowFeaturesNew from "Components/Common/NewCreateProduct/ShowFeaturesNew";
import MyAccordion from "Components/Common/NewCreateProduct/ShowFeaturesNew";
import CreateRegion from "Components/Common/Creatives/CreateRegon";

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
  const [openDialogImage, setOpenDialogImage] = useState(false);
  const [openDialogImage2, setOpenDialogImage2] = useState(false);
  const [openDialogImage3, setOpenDialogImage3] = useState(false);
  const [countryName, setCountryName] = useState("");

  const [handleLoadFeatures, setHandleLoadFeatures] = useState(null);
  const [openThis, setOpenThis] = useState(false);
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);

  const [giveId, setGiveId] = useState(null);
  const [featureData, setFeatureData] = useState([]);
  const [idStorage, setIdStorage] = useState();
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [responseId, setResponseId] = useState(0);
  const [checkBoxList, setCheckBoxList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const [selectedShowBadgeCategory, setSelectedShowBadgeCategory] = useState(
    []
  );
  const [selectedCategoryForShowFeatures, setSelectedCategoryForShowFeatures] =
    useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const router = useRouter();
  const { id } = router.query;
  // features
  const [features, setFeatures] = useState([
    // {
    //   country: "Iraq",
    //   items: [
    //     {
    //       title: "Premium Service",
    //       features: [
    //         {
    //           id: 1,
    //           name: "1 Month",
    //           status: "Not Active",
    //           state: "Auto",
    //           date: "2023-05-21",
    //           price: "$100.05",
    //         },
    //         {
    //           id: 2,
    //           name: "2 Month",
    //           status: "Not Active",
    //           state: "Auto",
    //           date: "2024-05-21",
    //           price: "$100.05",
    //         },
    //         {
    //           id: 3,
    //           name: "2 Month",
    //           status: "Not Active",
    //           state: "Auto",
    //           date: "2024-05-21",
    //           price: "$100.05",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // Add more groups as needed
  ]);
  const featureDataUpdate = async () => {
    if (country && country.data && selectedShowBadgeCategory && featureData) {
      const updatedRegionData = country.data.map((item) => {
        const categoryTitles = selectedShowBadgeCategory.map((x) => x.title);

        return {
          id: item.id,
          country: item.title,
          items: [
            {
              title: categoryTitles,
              features: {},
            },
          ],
        };
      });

      setFeatures(updatedRegionData);
    }
  };

  useEffect(() => {
    featureDataUpdate();
  }, [country, selectedShowBadgeCategory, featureData, id]);

  // features end

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };
      const responseCategory = await axios.get(
        `${ServerURL.url}/admin/country/get-all-country`,
        config
      );
      setCountry(responseCategory.data);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: `${
          ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
        }`,
      },
    };

    try {
      if (id !== undefined) {
        const response = await axios.get(
          `${ServerURL.url}/admin/product/${id}`,
          config
        );
        const dataResponse = response.data;

        if (dataResponse) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            title: dataResponse.title,
            input_lable: dataResponse.input_lable,
            placeholder_input: dataResponse.placeholder_input,
            description: dataResponse.description,
            id_type: dataResponse.id_type?.id,
            image_square: { id: dataResponse.image_square },
            image_trend: { id: dataResponse.image_trend },
            image_main: { id: dataResponse.image_main },
            alt_image_main: dataResponse?.alt_image_main,
            alt_image_trends: dataResponse?.alt_image_trends,
            alt_image_square: dataResponse?.alt_image_square,
            seo_title: dataResponse?.seo_title,
            seo_description: dataResponse?.seo_description,
            seo_link: dataResponse?.seo_link,
            // features: dataResponse.features?.map((feature) => feature.id) || [],
          }));
          // setCheckBoxList(dataResponse?.features?.map((x) => x.id));
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

  const handleSetValue = async (e) => {
    if (e !== selectedCountry) {
      setSelectedCountry(e);
      setLoading(true);

      try {
        const config = {
          headers: {
            Authorization: `${
              ServerURL.developerMode === true
                ? ServerURL.Bear
                : GetToken("user")
            }`,
          },
        };

        const response = await axios.get(
          `${ServerURL.url}/admin/cat/get-all-cat-without-pagination/${id}/${e}`,
          config
        );
        const dataResponse = response.data;

        if (dataResponse) {
          if (dataResponse.length !== 0) {
            setOpen(false);
            setOpenCategory(true);
          }
          setSelectedShowBadgeCategory(dataResponse);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  async function getFeatures() {
    if (giveId !== null) {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };

      try {
        const responseFeature = await axios.get(
          `${ServerURL.url}/admin/feature/get-all-feature-without-pagination/${giveId}`,
          config
        );
        setFeatureData(responseFeature.data);
      } catch (error) {
        console.error("Error fetching feature data from the server:", error);
      }
    }
  }
  const handleCreateCountry = async () => {
    if (countryName !== "") {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };

      try {
        const responseFeature = await axios.get(
          `${ServerURL.url}/admin/feature/get-all-feature-without-pagination/${giveId}`,
          config
        );
        setFeatureData(responseFeature.data);
      } catch (error) {
        console.error("Error fetching feature data from the server:", error);
      }
    }
  };

  useEffect(() => {
    getFeatures();
  }, [giveId]);

  const baseStorage = "https://xoxxel.storage.iran.liara.space/";

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
            <TextField
              value={product?.title || ""}
              size="small"
              fullWidth
              onChange={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  title: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item container rowSpacing={3}>
            {/* <Card value={product.alt_image_main} saveClick={() => console.log('saveClick')} editClick={() => setOpenDialogImage(true)} titleCard={'Slider'} imageSizeText={'تصویر اصلی (297*147)'} imagePreview={`${product?.image_main?.id?.name.includes('https://xoxxel.storage.iran.liara.space/')
                            ? ''
                            : 'https://xoxxel.storage.iran.liara.space/'
                            }${product?.image_main?.id?.name}`} /> */}
            <Card
              value={product.alt_image_main}
              saveClick={() => console.log("saveClick")}
              editClick={() => setOpenDialogImage(true)}
              titleCard={"Trends"}
              imageSizeText={"تصویر اصلی (297*147)"}
              imagePreview={`${
                product?.image_main?.id?.name.includes(baseStorage)
                  ? ""
                  : baseStorage
              }${product?.image_main?.id?.name}`}
              changeAlt={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  alt_image_main: e,
                }))
              }
            />
            <ButtonImage
              open={openDialogImage}
              setOpen={() => setOpenDialogImage(false)}
              idStorage={setIdStorage}
              imageUrlLink={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  image_main: {
                    ...prevProduct.image_main,
                    id: { ...prevProduct.image_main.id, name: e },
                  },
                }))
              }
              onChange={(e) => {
                setIdStorage(e);
                console.log(e);
              }}
            />

            <Card
              value={product.alt_image_trends}
              saveClick={() => console.log("saveClick")}
              editClick={() => setOpenDialogImage2(true)}
              titleCard={"Trends"}
              imageSizeText={"تصویر Trends (153*190)"}
              imagePreview={`${
                product?.image_trend?.id?.name.includes(baseStorage)
                  ? ""
                  : baseStorage
              }${product?.image_trend?.id?.name}`}
              changeAlt={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  alt_image_trends: e,
                }))
              }
            />
            <ButtonImage
              open={openDialogImage2}
              setOpen={() => setOpenDialogImage2(false)}
              idStorage={setIdStorage}
              imageUrlLink={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  image_trend: {
                    ...prevProduct.image_trend,
                    id: { ...prevProduct.image_trend.id, name: e },
                  },
                }))
              }
              onChange={(e) => {
                setIdStorage(e);
                console.log(e);
              }}
            />

            <Card
              value={product.alt_image_square}
              saveClick={() => console.log("saveClick")}
              editClick={() => setOpenDialogImage3(true)}
              titleCard={"Square"}
              imageSizeText={"تصویر اسلایدی یا مربعی (134*134)"}
              imagePreview={`${
                product?.image_square?.id?.name.includes(baseStorage)
                  ? ""
                  : baseStorage
              }${product?.image_square?.id?.name}`}
              changeAlt={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  alt_image_square: e,
                }))
              }
            />
          </Grid>
          <ButtonImage
            open={openDialogImage3}
            setOpen={() => setOpenDialogImage3(false)}
            idStorage={setIdStorage}
            imageUrlLink={(e) =>
              setProduct((prevProduct) => ({
                ...prevProduct,
                image_square: {
                  ...prevProduct.image_square,
                  id: { ...prevProduct.image_square.id, name: e },
                },
              }))
            }
            onChange={(e) => {
              setIdStorage(e);
              console.log(e);
            }}
          />

          <Grid item container columnSpacing={5} rowSpacing={2}>
            <LablesInputs
              value={product.input_lable}
              label={"Label input"}
              changeInput={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  input_lable: e,
                }))
              }
            />
            <LablesInputs
              value={product.placeholder_input}
              label={"Placeholder"}
              changeInput={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  placeholder_input: e,
                }))
              }
            />
            <LablesInputs
              value={product.description}
              label={"Description"}
              changeInput={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  description: e,
                }))
              }
            />
          </Grid>
          <Grid item container>
            <SeoTools
              valueLink={product?.seo_link}
              valueTitle={product?.seo_title}
              valueDescription={product?.seo_description}
              changeTitleTag={(e) =>
                setProduct((prevProduct) => ({ ...prevProduct, seo_title: e }))
              }
              chnageShortLink={(e) =>
                setProduct((prevProduct) => ({ ...prevProduct, seo_link: e }))
              }
              changeMetaDescription={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  seo_description: e,
                }))
              }
            />
          </Grid>
          <Grid item container>
            <Grid item>
              <Button onClick={() => setOpenCategory(true)}>
                Select Category
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => setOpen(true)}>Select Country</Button>
            </Grid>
          </Grid>
          {/* <Grid item container> */}
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <DialogContent>
              <Grid item container display={"flex"} justifyContent={"center"}>
                <SelectCountry
                  value={country}
                  selected={selectedCountry}
                  setValue={(e) => handleSetValue(e)}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid item container columnSpacing={2}>
                <Grid item>
                  <Button onClick={() => setOpen(false)}>
                    Create New Country
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="error" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openCategory}
            onClose={() => {
              setOpenCategory(false);
            }}
          >
            <DialogContent>
              <Grid item container display={"flex"} justifyContent={"center"}>
                <SelectCategory
                  data={selectedShowBadgeCategory}
                  selected={(e) => {
                    setSelectedCategoryForShowFeatures(e);
                    setOpenCategory(false);
                  }}
                />{" "}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid item container columnSpacing={2}>
                <Grid item>
                  <Button onClick={() => setOpenCategory(false)}>
                    Create New Category
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="error" onClick={() => setOpenCategory(false)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>

          {/* </Grid> */}
          <Grid item container>
            {/* <CheckboxesTags //ویژگی
              id={selectedCategoryForShowFeatures}
              // refresh={count}
              checkBoxList={checkBoxList}
              responseId={responseId}
              setResponseId={(e) => setCheckBoxList([...checkBoxList, e])}
              setSelectedItem={(e) => setCheckBoxList(e)}
              onChange={(e) => {
                setCheckBoxList(e);
              }}
            /> */}
            <CreateOptionFeature //ایجاد ویژگی
              category={category}
              setCategory={(e) => {
                setCategory(e);
                console.log(e);
              }}
              click={openThis}
              setClick={(value) => setOpenThis(value)}
              // status={'plus'}
              setResponseId={(e) => {
                setResponseId(e);
                setCheckBoxList([...checkBoxList, e]);
                // console.log(checkBoxList);
              }}
            />
          </Grid>
          <Grid container item>
            <Grid item>
              <CreateRegion />
              {/* <Button onClick={handleCreateCountry}>Create Country</Button> */}
            </Grid>
          </Grid>
          <Grid container item>
            {features.map((x, index) => (
              <Grid container item key={index}>
                <MyAccordion
                  features={x}
                  category={selectedShowBadgeCategory}
                  // id={id}
                  // country={country.data}
                  // selectedCountry={selectedCountry}
                  // value={featureData}
                  // handleLoadFeatures={(e) => {
                  //   setHandleLoadFeatures(e);
                  //   handleSetValue(e);
                  // }}
                  // setID={(e) => setGiveId(e)}
                  // updateFeatures={(updatedFeatures) =>
                  //   setFeatures(updatedFeatures)
                  // }
                  // setFeatures={(e) => setFeatures(e)}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item container>
            <Grid item>
              <Button
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  backgroundColor: "#19B13A",
                }}
                endIcon={<Add />}
              >
                Add Product
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setOpenThis(true)}
              >
                اضافه کردن ویژگی جدید
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </AccountLayout>
    </>
  );
}

export default CreateProduct;
