import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  Button,
  Dialog,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import { useState, useEffect, useRef } from "react";
import UploadFile from "../UploadFile";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "theme";
import ServerURL from "../Layout/config";
import axios from "axios";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GetToken from "GetToken";

export default function StandardImageList({
  onChange = () => {},
  imageUrlLink = () => {},
  label,
  disableStatus,
  justIcon,
  idStorage,
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [gallery, setGallery] = useState(data);
  const [openAddPhoto, setOpenAddPhoto] = useState(false);
  const [selectedFileItem, setSelectedFileItem] = useState({});
  const [selectedImageId, setSelectedImageId] = useState(
    idStorage ? idStorage : null
  );
  const [addingFeature, setAddingFeature] = useState(false);
  const [count, setCount] = useState(0);
  const [requestError, setRequestError] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [item, setItem] = useState(false);
  const [scrollStatus, setScrollStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(30);

  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  const matchDownLg = useMediaQuery(theme.breakpoints.down("md"));

  const handleImageClick = (id) => {
    if (selectedImageId !== id) {
      setSelectedImageId(id);
    } else {
      setSelectedImageId(null);
    }
  };

  const handleSubmit = async () => {
    setAddingFeature(true);
    setRequestError("");
    const config = {
      headers: {
        Authorization: `${
          ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
        }`,
      },
    };
    if (selectedFileItem && selectedFileItem.file) {
      try {
        const formData = new FormData();
        Object.keys(selectedFileItem?.fileResDetails?.fields || {}).map((x) => {
          formData.append(x, selectedFileItem?.fileResDetails?.fields[x]);
        });
        formData.append("file", selectedFileItem.file);

        const uploadResponse = await axios.post(
          `${
            selectedFileItem?.fileResDetails?.url
              ? selectedFileItem?.fileResDetails?.url
              : "https://xoxxel.storage.iran.liara.space/"
          }`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (uploadResponse.status === 204) {
          const verifyData = {
            id: selectedFileItem?.fileResDetails?.dataStorage?.id,
          };
          const verifyResponse = await axios.post(
            `${ServerURL.url}/admin/storage/verify-upload`,
            verifyData,
            config
          );
          if (verifyResponse) {
            handleClosePanel2();
            setAddingFeature(false);
          }
        } else {
          setRequestError("خطا در آپلود فایل");
        }
      } catch (error) {
        console.error("خطا: ", error);
        setRequestError("خطا در ارسال درخواست به سرور. دوباره امتحان کنید");
      } finally {
        setAddingFeature(false);
      }
    } else {
      setRequestError("یک فایل انتخاب کنید");
      setAddingFeature(false);
    }
  };

  const scrollContainerRef = useRef();
  const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } =
      scrollContainerRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
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
          `${ServerURL.url}/admin/storage/get-all-files?page=${page}&perPage=${perPage}`,
          config
        );

        if (!isCancelled) {
          setData((prevData) => {
            const newData = response.data.data.filter(
              (newItem) => !prevData.some((item) => item.id === newItem.id)
            );
            return [...prevData, ...newData];
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!isCancelled) {
          setRequestError("Error fetching data. Please try again.");
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [page, perPage]);

  const handleDelete = (title) => {
    const updatedGallery = gallery.filter((item) => item.title !== title);
    setGallery(updatedGallery);
  };
  const handleClosePanel = () => {
    setOpen(false);
    setSelectedFileItem({});
    setSelectedImageId(null);
  };
  const handleClosePanel2 = () => {
    console.log(count);
    setCount(count + 1);
    console.log(count);
    setOpenAddPhoto(false);
  };
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label>{label}</label>
        <Button
          sx={{ mt: justIcon ? 0 : 1 }}
          startIcon={!justIcon && <AddPhotoAlternateOutlinedIcon />}
          onClick={() => {
            setOpen(true);
            // setCount(count + 1);
            // handleOpen()
          }}
          disabled={disableStatus ? true : false}
        >
          {justIcon ? (
            <>{justIcon}</>
          ) : (
            <>{idStorage ? "فایل انتخاب شده" : "انتخاب فایل"}</>
          )}
          {/* انتخاب فایل */}
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClosePanel} fullWidth maxWidth="lg">
        <Grid item sx={{ p: "15px" }}>
          <ImageList
            ref={scrollContainerRef}
            onScroll={handleScroll}
            sx={{ width: "100%", height: "400px" }}
            cols={matchDownMd ? 3 : matchDownLg ? 6 : 8}
            gap={8}
            rowHeight={"auto"}
            variant="quilted"
          >
            {data.map((x) => (
              <ImageListItem key={x.id}>
                <img
                  srcSet={`${x.url}?h=auto&fit=crop&auto=format&dpr=2 2x`}
                  src={`${x.url}?h=auto&fit=crop&auto=format`}
                  alt={x.id}
                  loading="lazy"
                  style={{
                    cursor: "pointer",
                    border:
                      idStorage === x.id || selectedImageId === x.id
                        ? "2px solid #1c49f1"
                        : "none",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    handleImageClick(x.id);
                    setImageId(x.id);
                    setImageUrl(x.url);
                  }}
                />
              </ImageListItem>
            ))}

            {scrollStatus ? <CircularProgress size={24} /> : ""}
          </ImageList>
          <Grid container>
            <Grid item xs={6} md={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddToPhotosOutlinedIcon />}
                onClick={() => {
                  onChange(imageId);
                  imageUrlLink(imageUrl);
                  handleClosePanel();
                }}
                sx={{ mt: 2, fontSize: { xs: "12px", md: "13px" } }}
              >
                انتخاب عکس
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<FileUploadOutlinedIcon />}
                onClick={() => setOpenAddPhoto(true)}
                sx={{ mt: 2, fontSize: { xs: "12px", md: "13px" } }}
              >
                اپلود عکس
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={openAddPhoto}
          fullWidth
          maxWidth={"sm"}
          onClose={handleClosePanel2}
        >
          <Grid container sx={{ p: "15px" }}>
            <Grid item>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "14px", md: "16px" } }}
              >
                عکس مورد نظر خود را اپلود کنید
              </Typography>
            </Grid>
            <UploadFile
              id={"file1"}
              accept="image/png, image/jpg, image/jpeg"
              // label={"ایکون ( با اندازه برابر مثلا 200*200)"}
              onChange={(e) => {
                setSelectedFileItem(e);
                setRequestError("");
                setItem(true);
              }}
              selectedFileItem={selectedFileItem}
            />
            <Typography
              variant="body2"
              sx={{ my: 1, color: "red", fontSize: "10px" }}
            >
              {requestError ? requestError : " "}
            </Typography>

            <Grid container>
              <Grid item xs={6} md={2}>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  color="primary"
                  autoFocus
                >
                  {addingFeature ? <CircularProgress size={24} /> : "آپلود عکس"}
                </Button>
              </Grid>
              <Grid item xs={6} md={2}>
                <Button onClick={() => setOpenAddPhoto(false)} color="primary">
                  برگشت
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </Dialog>
    </>
  );
}
