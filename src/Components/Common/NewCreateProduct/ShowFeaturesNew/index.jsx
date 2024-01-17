import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Grid,
  Typography,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  CircularProgress,
} from "@mui/material";
import { IconToggle } from "Icons/icons";
import GetToken from "GetToken";
import ServerURL from "Components/Common/Layout/config";
import axios from "axios";
import TableItems from "./Table";
import CreateCategory from "Components/Common/Creatives/CreateCategory";
import CreateOptionFeatureForEdit from "Components/Common/Creatives/CreateOptionFeatureForEdit";

const MyAccordion = ({
  country,
  dataBody,
  features,
  productId,
}) => {
  // console.log(category)
  const [selectedRows, setSelectedRows] = useState([]);

  const [openCreateFeature, setOpenCreateFeature] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [featureData, setFeatureData] = useState([]);
  const [AllCat, setAllCat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleGetCategory = async (e) => {
      setIsLoading(true);
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
          `${ServerURL.url}/admin/cat/get-all-cat-without-pagination/${productId}/${e}`,
          config
        );
        const dataResponse = response.data;

        if (dataResponse) {
          if (dataResponse.length !== 0) {
          }
          setAllCat(dataResponse);
          console.log(dataResponse);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
  };
  const fetchDataFeature = async (e) => {
    setIsLoading(true);

    const config = {
      headers: {
        Authorization: `${
          ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
        }`,
      },
    };

    try {
      const responseFeature = await axios.get(
        `${ServerURL.url}/admin/feature/get-all-feature-without-pagination/${e}`,
        config
      );

      const updatedFeatures = responseFeature.data.map((x) => ({
        id: x.id,
        name: x.name,
        status: x.status,
        state: x.sell_mode,
        date: x.created_at,
        price: x.price + "$",
      }));

      setFeatureData(updatedFeatures);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching feature data from the server:", error);
      setIsLoading(false);
    }
  };

  const handleExpandClick = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Accordion
          disableGutters
          sx={{
            bgcolor: "#E4E4E4",
            boxShadow: "none !important",
          }}
          expanded={expanded === "panel1"}
          onChange={handleExpandClick("panel1")}
        >
          <AccordionSummary onClick={() => handleGetCategory(features.id)}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid container item xs={2}>
                <CreateCategory
                  countryId={features.id}
                  productId={productId}
                  country={country}
                  dataBody={dataBody}
                />
              </Grid>
              <Grid
                container
                item
                xs={10}
                display="flex"
                justifyContent="flex-end"
                columnSpacing={2}
                alignItems="center"
              >
                <Grid
                  container
                  item
                  columnSpacing={2}
                  xs={4}
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  {AllCat?.map((item) => (
                    <Grid item key={item?.id}>
                      {item?.length > 2 && (
                        <>
                          <span>&nbsp;&nbsp;</span>
                          <span>...</span>
                        </>
                      )}
                      <Chip sx={{ color: "#616162" }} label={item.title} />
                    </Grid>
                  ))}
                </Grid>

                <Grid item>
                  <Typography variant="span">
                    Available{" "}
                    {Array.isArray(features?.items) ? features.items.length : 0}{" "}
                    features
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{features?.country}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container item>
              {AllCat?.map((x) => (
                <Grid item key={x.id} xs={12}>
                  <Accordion
                    sx={{
                      bgcolor: "#E4E4E4",
                      boxShadow: "none !important",
                    }}
                    // onClick={() => {
                    //   setGiveId(features.id);
                    //   // setGiveId(x.id);
                    // }}
                  >
                    <AccordionSummary
                      expandIcon={<IconToggle />}
                      onClick={() => {
                        fetchDataFeature(x.id);
                        // setGiveId(x.id);
                      }}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        direction: "rtl",
                      }}
                    >
                      <Grid
                        container
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          // direction: "rtl",
                        }}
                      >
                        <Grid item>
                          <Typography>{x.title}</Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            sx={{ textTransform: "none" }}
                            onClick={() => setOpenCreateFeature(true)}
                          >
                            Create Feature
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <CreateOptionFeatureForEdit
                      click={openCreateFeature}
                      setClick={() => setOpenCreateFeature()}
                      catId={x.id}
                      countryId={features.id}
                    />
                    <AccordionDetails>
                      <Grid container item>
                        {isLoading ? (
                          <Grid
                            container
                            display={"flex"}
                            justifyContent={"center"}
                          >
                            <CircularProgress />
                          </Grid>
                        ) : (
                          <>
                            {featureData.length === 0 ? (
                              <Grid
                                container
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                <Typography variant="body1">
                                  هیچ فیچری وجود ندارد
                                </Typography>
                              </Grid>
                            ) : (
                              <TableContainer
                                sx={{ minWidth: { xs: 250, md: 600 } }}
                              >
                                <Grid container>
                                  <Grid item xs={12}>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Action</TableCell>
                                          <TableCell>Price</TableCell>
                                          <TableCell>Date</TableCell>
                                          <TableCell>State</TableCell>
                                          <TableCell>Status</TableCell>
                                          <TableCell
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
                                          >
                                            Feature Name
                                          </TableCell>
                                          <TableCell>Selection</TableCell>{" "}
                                          {/* New column for checkboxes */}
                                        </TableRow>
                                      </TableHead>
                                      {featureData.map((item) => (
                                        <TableItems
                                          selectedRows={selectedRows}
                                          setSelectedRows={setSelectedRows}
                                          feature={item}
                                          key={item.id}
                                        />
                                      ))}
                                    </Table>
                                  </Grid>
                                </Grid>
                              </TableContainer>
                            )}
                          </>
                        )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
            <Button onClick={() => console.log(selectedRows)}>
              selectedRows
            </Button>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default MyAccordion;
