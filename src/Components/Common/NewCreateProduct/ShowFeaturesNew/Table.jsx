import {
  Checkbox,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  SvgIcon,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import EditOptionFeature from "Components/Common/Creatives/EditOptionFeature";
import { IconB, IconS } from "Icons/icons";
import moment from "moment-jalaali";

function TableItems({
  feature,
  isDialogOpen,
  setIsDialogOpen,
  selectedRows,
  setSelectedRows,
  item,
}) {
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const openDialog = (id) => {
    setIsDialogOpen(true);
    console.log(item);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <IconButton
            onClick={() => {
              openDialog();
              // console.log(item);
            }}
          >
            <IconB />
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography sx={{ color: "#616162" }}>{feature.price}</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ color: "#616162" }}>
            {moment(feature.date).format("jYYYY/jM/jD یا YYYY/M/D")}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            sx={{
              color: feature.state === "auto" ? "#0085FF" : "#000",
            }}
          >
            {feature.state}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            sx={{
              bgcolor: feature.status === "active" ? "#C7F1DB" : "#f1c7c7",
              color: feature.status === "active" ? "#0DB25B" : "red",
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
        <TableCell>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Checkbox
              size="small"
              checked={selectedRows.includes(feature.id)}
              onChange={() => handleCheckboxChange(feature.id)}
            />
          </Grid>
        </TableCell>
      </TableRow>
      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="lg">
        <DialogContent>
          <EditOptionFeature
            setClick={closeDialog}
            id={selectedRows}
            deleteId={item}
            setResponseId={(e) => {
              // setResponseId(e);
              // setCheckBoxList([...checkBoxList, e]);
              console.log(e);
            }}
          />
        </DialogContent>
      </Dialog>
    </TableBody>
  );
}

export default TableItems;
