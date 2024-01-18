import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import RegonTable from "Components/Common/TableItems/RegonTable";
import { useEffect, useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import { AddProductIcon, IconProduct } from "Icons/icons";
import axios from "axios";
import ServerURL from "Components/Common/Layout/config";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";
import ButtonImage from "Components/Common/Images/ButtonImage";
const Regons = () => {
  const [itemsForDel, setItemsForDel] = useState([]);
  const [page, setPage] = useState(1);
  const [dataBody, setDataBody] = useState([]);
  const [pageDataAll, setPageDataAll] = useState({});
  const [perPage, setPerPage] = useState(15);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDialogImage, setOpenDialogImage] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [regonName, setRegonName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };

      try {
        const response = await axios.get(
          `${ServerURL.url}/admin/country/get-all-country`,
          config
        );

        const pageData = response.data;
        const updatedPageData = {
          nowPage: pageData.page,
          totalPages: pageData.totalPages,
          perPage: pageData.perPage ? pageData.perPage : 15,
          totalItems: pageData.totalItems,
          pagesToDisplay: Array.from(
            { length: pageData.totalPages },
            (_, i) => i + 1
          ),
        };

        setPageDataAll(updatedPageData);

        const apiData = response.data;
        const updatedRegionData = apiData.map((item) => {
          return {
            id: item.id,
            data: [
              `#${item.id}`,
              {
                type: "textBold",
                text: item.title,
              },
              {
                type: "icon",
                text: item.id_storage || null,
              },
              {
                type: "editAction",
                text: item.id
              },
            ],
          };
        });
        setSelected([]);
        setDataBody(updatedRegionData);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };

    fetchData();
  }, [count]);
  const [selected, setSelected] = useState([]);
  const closeDialog = () => {
    setOpenDialogImage(false);
    setLoading(false);
    setRegonName("");
    setSelectedIcon(null);
    setPreview(null);
    setOpen(false);
  };
  const handleCreateRegon = async () => {
    setLoading(true);

    if ((regonName !== "") & (selectedIcon !== null)) {
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

        const deleteData = {
          name: regonName,
          id_storage: selectedIcon,
        };

        const response = await axios.post(
          `${ServerURL.url}/admin/country/create`,
          deleteData,
          config
        );
        if (response.status === 201) {
          toast.success("با موفقیت اضافه شد.");
          setCount(count + 1);
          setLoading(false);
          closeDialog();
        } else {
          toast.error("لطفا دوباره امتحان کنید");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error sending create regon request:", error);
        setLoading(false);
      }
    }
    if (regonName === "" || selectedIcon === null) {
      toast.error("تمامی فیلد ها رو پر کنید");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };

      const deleteData = {
        ids: selected,
      };

      const response = await axios.post(
        `${ServerURL.url}/admin/country/delete`,
        deleteData,
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
  const dataHead = ["کد منطقه", "نام منطقه", "ایکون", "اقدامات"];

  return (
    <>
      <AccountLayout>
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={12} md={12} sx={{ mb: { xs: "25px", md: "0" } }}>
            <Grid sx={{ display: "flex" }}>
              <IconProduct />
              <Typography sx={{ ml: "10px" }}>لیست منطقه ها</Typography>
            </Grid>
            <Grid>
              <Typography sx={{ mt: "10px", fontSize: "12px" }}>
                شما میتوانید در لیست زیر تمام منطقه های ثبت شده را مشاهده و
                ویرایش کنید.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Grid
          container
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "flex-end",
            my: 1,
          }}
          spacing={1}
        >
          <Grid item>
            <Button
              sx={{
                backgroundColor: "#244CDF",
                py: "5px",
                px: "12px",
                borderRadius: "5px",
                color: "#FDFDFD",
                fontSize: "12px",
                "&:hover": {
                  color: "#FDFDFD",
                  backgroundColor: "#4166ef",
                },
              }}
              endIcon={<AddProductIcon />}
              onClick={() => setOpen(true)}
            >
              ثبت منطقه جدید
            </Button>
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "right" }}>
            {/* {selected.length > 0 && ( */}
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              disabled={selected.length > 0 ? false : true}
              disableElevation
              sx={{
                fontSize: "12px",
                textAlign: "right",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                // backgroundColor: "#D24093",
              }}
            >
              حذف
            </Button>
            {/* )} */}
          </Grid>

          {/* <CustomTable
                        headCells={headCells}
                        rows={rows}
                        selected={(object) => {
                            setItemsForDel(object)
                        }}
                        rowsPerPage={10}
                        total={2}
                        pageChange={(x) => console.log(x)
                        }
                        page={0}
                        show={(x) => console.log(x)}
                    /> */}
        </Grid>
        <RegonTable
          selected={selected}
          setSelected={setSelected}
          dataHead={dataHead}
          dataBody={dataBody}
          // selectedItemId={selectedItemId}
          pageData={pageDataAll}
          setPage={(e) => setPage(e)}
          setPerPage={(e) => setPerPage(e)}
          perPage={pageDataAll.perPage}
        />

        <Dialog open={open} maxWidth={"md"} onClose={() => closeDialog()}>
          <DialogTitle>افزودن منطقه</DialogTitle>
          <DialogContent>
            <Grid container item rowSpacing={2} my={1}>
              <Grid container item>
                <TextField
                  fullWidth
                  label={"نام منطقه"}
                  onChange={(e) => setRegonName(e.target.value)}
                />
              </Grid>
              {preview !== null && (
                <Grid
                  container
                  item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    component={"img"}
                    width={200}
                    src={preview}
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
              )}
              <Grid container item>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => setOpenDialogImage(true)}
                  fullWidth
                  disableElevation
                >
                  انتخاب آیکون
                </Button>
                <ButtonImage
                  open={openDialogImage}
                  setOpen={() => setOpenDialogImage(false)}
                  imageUrlLink={(e) => setPreview(e)}
                  onChange={(e) => setSelectedIcon(e)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container item columnSpacing={1}>
              <Grid item>
                {loading ? (
                  <Grid container item>
                    <CircularProgress />
                  </Grid>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={regonName === "" || selectedIcon === null}
                    onClick={() => handleCreateRegon()}
                  >
                    افزودن
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => closeDialog()}
                >
                  انصراف
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </AccountLayout>
    </>
  );
};
export default Regons;
