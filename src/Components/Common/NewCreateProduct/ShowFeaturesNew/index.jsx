import React, { useEffect, useState } from "react";
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

const MyAccordion = ({ category, features, setID = () => {} }) => {
  // console.log(category)
  const [giveId, setGiveId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [featureData, setFeatureData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (giveId !== null) {
        const config = {
          headers: {
            Authorization: `${
              ServerURL.developerMode === true
                ? ServerURL.Bear
                : GetToken("user")
            }`,
          },
        };

        try {
          const responseFeature = await axios.get(
            `${ServerURL.url}/admin/feature/get-all-feature-without-pagination/${giveId}`,
            config
          );

          // Extracting relevant features from the response and updating state
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
      }
    };

    fetchData();
  }, [giveId]);

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
          <AccordionSummary>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid container item xs={2}>
                {/* <Button>Add</Button> */}
                <CreateCategory />
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
                  {/* {
                    console.log(features)
                  } */}
                  {features.items?.map((item) => (
                    <Grid item key={item?.title}>
                      {Array.isArray(item?.features) &&
                        item.features.length > 2 && (
                          <>
                            <span>&nbsp;&nbsp;</span>
                            <span>...</span>
                          </>
                        )}
                      {Array.isArray(item?.features) &&
                        item.features
                          .slice(0, 2)
                          .map((f, i) => (
                            <Chip
                              sx={{ color: "#616162" }}
                              key={f.name}
                              label={f.name}
                            />
                          ))}
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
              {Array.isArray(features?.items) &&
                features.items.map((x, innerIndex) => (
                  <Grid item key={innerIndex} xs={12}>
                    <Accordion
                      sx={{
                        bgcolor: "#E4E4E4",
                        boxShadow: "none !important",
                      }}
                    >
                      <AccordionSummary
                        onClick={() => {
                          setGiveId(features.id);
                          // setGiveId(x.id);
                        }}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          direction: "rtl",
                        }}
                        expandIcon={<IconToggle />}
                      >
                        <Typography>Featurs</Typography>

                        <Grid
                          container
                          item
                          columnSpacing={1}
                          xs={4}
                          justifyContent="flex-end"
                          sx={{ display: { xs: "none", sm: "flex" } }}
                        >
                          {Array.isArray(x?.features) &&
                            x.features.slice(0, 2).map((f, i) => (
                              <Grid item key={i}>
                                <Chip
                                  sx={{ color: "#616162" }}
                                  label={features.name}
                                />
                              </Grid>
                            ))}
                        </Grid>
                      </AccordionSummary>
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
                                          </TableRow>
                                        </TableHead>
                                        {featureData.map((item) => (
                                          <TableItems
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
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default MyAccordion;
