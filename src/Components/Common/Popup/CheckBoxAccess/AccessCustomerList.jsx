import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";

const AccessCustomerList = ({ titelParent, accessControl, onUpdateAccessControl, tableId }) => {
    const handleButtonClick = (buttonIndex) => {
        const updatedAccessControl = [...accessControl];
        updatedAccessControl[buttonIndex].status = !updatedAccessControl[buttonIndex].status;
        onUpdateAccessControl(updatedAccessControl);
    };

    const handleParentCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        const updatedAccessControl = accessControl.map((item) => ({
            ...item,
            status: isChecked,
            tableId: tableId,
        }));
        onUpdateAccessControl(updatedAccessControl);
        console.log(updatedAccessControl)
    };

    return (
        <>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <FormControlLabel
                        label={titelParent}
                        control={
                            <Checkbox
                                checked={accessControl.every((item) => item.status)}
                                indeterminate={
                                    accessControl.some((item) => item.status) &&
                                    !accessControl.every((item) => item.status)
                                }
                                onChange={handleParentCheckboxChange}
                            />
                        }
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        {accessControl.map((button, index) => (
                            <Grid key={button.action} item xs={12} sm={6}>
                                <Checkbox
                                    checked={button.status}
                                    onChange={() => handleButtonClick(index)}
                                />
                                {button.text}
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </>
    );
};

export default AccessCustomerList;
