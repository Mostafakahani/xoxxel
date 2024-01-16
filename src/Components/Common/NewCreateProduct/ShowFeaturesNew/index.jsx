import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Grid,
  Typography,
  Button,
  IconButton,
  SvgIcon,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { IconB, IconS, IconToggle } from "Icons/icons";

const MyAccordion = ({
  featureData,
  checkBoxList,
  value,
  country,
  id,
  selectedCountry,
  handleLoadFeatures = () => {},
  setID = () => {},
}) => {
    const [groups, setGroups] = useState([
      {
        country: "Iraq",
        items: [
          {
            title: "Premium Service",
            features: [
              {
                name: "1 Month",
                status: "Not Active",
                state: "Auto",
                date: "2023-05-21",
                price: "$100.05",
              },
              {
                name: "2 Month",
                status: "Not Active",
                state: "Auto",
                date: "2024-05-21",
                price: "$100.05",
              },
              {
                name: "2 Month",
                status: "Not Active",
                state: "Auto",
                date: "2024-05-21",
                price: "$100.05",
              },
            ],
          },
        ],
      },
      {
        country: "Iran",
        items: [
          {
            title: "Premium Service",
            features: [
              {
                name: "1 Month",
                status: "Not Active",
                state: "Auto",
                date: "2023-05-21",
                price: "$100.05",
              },
              {
                name: "2 Month",
                status: "Not Active",
                state: "Auto",
                date: "2024-05-21",
                price: "$100.05",
              },
              {
                name: "2 Month",
                status: "Not Active",
                state: "Auto",
                date: "2024-05-21",
                price: "$100.05",
              },
            ],
          },
        ],
      },
      // Add more groups as needed
    ]);
  const [expanded, setExpanded] = useState(Array(groups.length).fill(null));
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const updatedRegionData = country?.map((item) => {
      return {
        id: item.id,
        country: item.title,
        items: [
          {
            title: "Premium Service",
            features: value?.map((x) => ({
              id: x.id,
              name: x.name,
              status: x.status,
              state: x.sell_mode,
              date: x.created_at,
              price: x.price + "$",
            })),
          },
        ],
      };
    });

    setGroups(updatedRegionData);
  }, [country, value]);

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = newExpanded[index] === index ? null : index;
      return newExpanded;
    });
  };

  const renderFeaturesTable = (features) => (
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
          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton>
                    <IconB />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "#616162" }}>
                    {feature.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "#616162" }}>
                    {feature.date}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: feature.state === "Auto" ? "#0085FF" : "#000",
                    }}
                  >
                    {feature.state}
                  </Typography>
                  {/* <Button onClick={() => console.log(feature.id)}>
                    GET ID
                  </Button> */}
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      bgcolor:
                        feature.status === "Active" ? "#C7F1DB" : "#f1c7c7",
                      color: feature.status === "Active" ? "#0DB25B" : "red",
                      borderRadius: 2,
                      px: 1,
                      fontSize: 14,
                      textAlign: "center",
                      width: "fit-content",
                    }}
                  >
                    {feature.status}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  {feature.name}
                  <SvgIcon sx={{ ml: 1 }}>
                    <IconS />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );

  return (
    <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
      {groups?.map((group, index) => (
        <Grid item key={index} xs={12}>
          <Accordion
            disableGutters
            sx={{
              bgcolor: "#E4E4E4",
              ".MuiAccordion-root": {
                boxShadow: "none !important",
              },
            }}
            expanded={expanded[index]}
            onChange={() => handleExpandClick(index)}
          >
            <AccordionSummary>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid container item xs={2}>
                  <Button>Add</Button>
                </Grid>
                <Grid
                  container
                  item
                  xs={10}
                  display={"flex"}
                  justifyContent={"flex-end"}
                  columnSpacing={2}
                  alignItems={"center"}
                >
                  <Grid
                    container
                    item
                    columnSpacing={2}
                    xs={4}
                    // display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    {group.items.map((item) => (
                      <Grid item key={item.title}>
                        {item.features.length > 2 && (
                          <>
                            <span>&nbsp;&nbsp;</span>
                            <span>...</span>
                          </>
                        )}
                        {item.features.slice(0, 2).map((feature) => (
                          <Chip
                            sx={{ color: "#616162" }}
                            key={feature.name}
                            label={feature.name}
                          />
                        ))}
                      </Grid>
                    ))}
                  </Grid>

                  <Grid item>
                    <Typography variant="span">
                      Available {group.items.length} groups
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{group.country}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                ".MuiAccordionSummary-root": {
                  backgroundColor: "#E4E4E4",
                  direction: "rtl",
                },
              }}
            >
              <Grid container item>
                {group.items.map((x, innerIndex) => (
                  <Grid item key={innerIndex} xs={12}>
                    <Accordion>
                      <AccordionSummary
                        onClick={() => {
                          //   handleLoadFeatures(value);
                          setID(group.id);
                        }}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          direction: "ltr",
                        }}
                        expandIcon={<IconToggle />}
                      >
                        <Typography>{x.title}</Typography>
                        <Grid
                          container
                          item
                          columnSpacing={1}
                          xs={4}
                          //   display={"flex"}
                          justifyContent={"flex-end"}
                          sx={{ display: { xs: "none", sm: "flex" } }}
                        >
                          {x.features.slice(0, 2).map((x, index) => (
                            <Grid item key={index}>
                              <Chip sx={{ color: "#616162" }} label={x.name} />
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          ".MuiAccordionDetails-root": {
                            backgroundColor: "#E4E4E4",
                            direction: "rtl",
                          },
                        }}
                      >
                        <Grid container>
                          <TableContainer
                            sx={{ minWidth: { xs: 250, md: 600 } }}
                          >
                            {renderFeaturesTable(x.features)}
                          </TableContainer>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyAccordion;
