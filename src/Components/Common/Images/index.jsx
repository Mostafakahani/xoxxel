import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button, Dialog, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { useState, useEffect } from 'react';
import UploadFile from '../UploadFile';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'theme';
import ServerURL from '../Layout/config';
import axios from 'axios';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';




export default function StandardImageList({ onChange = () => { }, }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [gallery, setGallery] = useState(data);
    const [openAddPhoto, setOpenAddPhoto] = useState(false);
    const [selectedFileItem, setSelectedFileItem] = useState({});
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [addingFeature, setAddingFeature] = useState(false);
    const [count, setCount] = useState(0);
    const [requestError, setRequestError] = useState(null);
    const [imageId, setImageId] = useState(null);


    const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownLg = useMediaQuery(theme.breakpoints.down('md'));

    const handleImageClick = (id) => {
        if (selectedImageId !== id) {
            setSelectedImageId(id);
        } else {
            setSelectedImageId(null);
        }
    };

    const handleSubmit = async () => {
        setAddingFeature(true);
        setRequestError('')
        const config = { headers: { Authorization: `${ServerURL.Bear}` } };
        if (selectedFileItem && selectedFileItem.file) {
            try {
                const formData = new FormData();
                Object.keys(selectedFileItem?.fileResDetails?.fields || {}).map((x) => {
                    formData.append(x, selectedFileItem?.fileResDetails?.fields[x]);
                });
                formData.append("file", selectedFileItem.file);

                const uploadResponse = await axios.post(
                    `${selectedFileItem?.fileResDetails?.url ? selectedFileItem?.fileResDetails?.url : 'https://xoxxel.storage.iran.liara.space/'}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                if (uploadResponse.status === 204) {
                    const verifyData = {
                        id: selectedFileItem?.fileResDetails?.dataStorage?.id
                    };
                    const verifyResponse = await axios.post(`${ServerURL.url}/admin/storage/verify-upload`, verifyData, config);
                } else {
                    setRequestError("خطا در آپلود فایل");
                }
            } catch (error) {
                console.error("خطا: ", error);
                setRequestError("خطا در ارسال درخواست به سرور");
            } finally {
                setAddingFeature(false);
            }
        } else {
            setRequestError("یک فایل انتخاب کنید");
            setAddingFeature(false);
        }
    };


    useEffect(() => {
        async function fetchData() {
            const config = { headers: { Authorization: `${ServerURL.Bear}` } };
            const response = await axios.get(`${ServerURL.url}/admin/storage/get-all-files`, config);
            setData(response.data.data);
        }
        fetchData();
    }, [count]);
    const handleDelete = (title) => {
        const updatedGallery = gallery.filter((item) => item.title !== title);
        setGallery(updatedGallery);
    };
    const handleClosePanel = () => {
        setOpen(false);
        setSelectedFileItem({});
        setSelectedImageId(null)
    };
    return (
        <>
            <Button startIcon={<AddPhotoAlternateOutlinedIcon />} onClick={() => { setOpen(true); setCount(count + 1) }}>انتخاب فایل</Button>
            <Dialog open={open} onClose={handleClosePanel} fullWidth maxWidth="lg">
                <Grid sx={{ p: '15px', }}>
                    <ImageList sx={{ width: '100%', height: 'auto' }} cols={matchDownMd ? 3 : matchDownLg ? 6 : 8} gap={8} rowHeight={'auto'} variant='quilted'>
                        {data.map((x) => (
                            <ImageListItem key={x.id}>
                                <img
                                    srcSet={`${x.url}?h=auto&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${x.url}?h=auto&fit=crop&auto=format`}
                                    alt={x.id}
                                    loading="lazy"
                                    style={{
                                        cursor: 'pointer', border: selectedImageId === x.id ? '2px solid #1c49f1' : 'none', borderRadius: '5px'
                                    }}
                                    onClick={() => {
                                        handleImageClick(x.id);
                                        setImageId(x.id);
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Grid container>
                        <Grid xs={6} md={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddToPhotosOutlinedIcon />}
                                onClick={() => { onChange(imageId); handleClosePanel() }}
                                sx={{ mt: 2, fontSize: { xs: '12px', md: '13px' } }}
                            >
                                انتخاب عکس
                            </Button>
                        </Grid>
                        <Grid xs={6} md={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<FileUploadOutlinedIcon />}
                                onClick={() => setOpenAddPhoto(true)}
                                sx={{ mt: 2, fontSize: { xs: '12px', md: '13px' } }}
                            >
                                اپلود عکس
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog open={openAddPhoto} fullWidth maxWidth={'sm'} onClose={() => setOpenAddPhoto(false)}>
                    <Typography>Select a photo to add</Typography>
                    <Button
                        onClick={() => {
                            handleSubmit()
                        }}
                        color="primary"
                        autoFocus
                    >
                        Add
                    </Button>
                    <Typography>{requestError ? requestError : ' '}</Typography>
                    <UploadFile
                        id={"file1"}
                        accept="image/png, image/jpg, image/jpeg"
                        label={"ایکون ( با اندازه برابر مثلا 200*200)"}
                        onChange={(e) => {
                            setSelectedFileItem(e);
                            setRequestError('')
                        }}
                        selectedFileItem={selectedFileItem}
                    />
                    <Button onClick={() => setOpenAddPhoto(false)} color="primary">
                        Cancel
                    </Button>
                </Dialog>
            </Dialog>
        </>
    );
}
