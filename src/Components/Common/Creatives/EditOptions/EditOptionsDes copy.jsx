import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useState } from "react";
import TabelOptions from "Components/Common/TableItems/TabelOptions";
import { useEffect } from "react";
import axios from "axios";
import ServerURL from "../../Layout/config";
import GetToken from "GetToken";

const EditOptionsDes = () => {
  const [open, setOpen] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedButton, setSelectedButton] = useState("region");
  const [regionData, setRegionData] = useState([]);

  const [selected, setSelected] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    region: null,
    category: null,
    type: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setOpen(true);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`, // YourBearerToken را با مقدار مورد نظر جایگزین کنید
      },
    };

    axios
      .get("https://api.xoxxel.com/admin/storage/get-all-cat?page=1", config)
      .then((response) => {
        const apiData = response.data; // داده‌های دریافتی از سرور
        const updatedRegionData = apiData.data.map((item) => {
          return {
            id: item.id,
            data: [
              `#${item.id}`, // مقدار `#` به همراه شناسه از سرور
              {
                type: "text",
                text: item.title,
              },
            ],
          };
        });
        setRegionData(updatedRegionData);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []); // useEffect فقط یکبار در زمان رندر اولیه اجرا می‌شود

  const buttonStyle = {
    position: "relative",
    "&::after": {
      content: '""',
      width: "100%",
      height: "2px",
      borderRadius: "6px",
      backgroundColor: "primary.main",
      position: "absolute",
      top: "100%",
      left: "0%",
      transform: "translateY(-50%)",
      display: "block",
      animation: "slideIn .5s forwards",
    },

    "@keyframes slideIn": {
      // تعریف انیمیشن
      from: {
        width: 0,
      },
      to: {
        width: "100%",
      },
    },
  };
  const dataHead = ["id", "نام ریجن"];

  const categoryData = [
    {
      id: 312321,
      data: [
        "#201",
        {
          type: "text",
          text: "Category 1",
        },
      ],
    },
    {
      id: 43123,
      data: [
        "#202",
        {
          type: "text",
          text: "Category 2",
        },
      ],
    },
  ];

  const typeData = [
    {
      id: 53123,
      data: [
        "#301",
        {
          type: "text",
          text: "Type 1",
        },
      ],
    },
    {
      id: 6123,
      data: [
        "#302",
        {
          type: "text",
          text: "Type 2",
        },
      ],
    },
  ];

  return (
    <>
      <Grid>
        <Button
          sx={{
            fontSize: "12px",
            mr: { md: "5px", xs: "2px" },
            py: "5px",
            px: "12px",
            border: "1px solid #B6B6B6",
            color: "#525252",
            borderRadius: "5px",
          }}
          onClick={() => {
            handleClickOpen();
            console.log(open);
          }}
        >
          ویرایش دسته,ریجن,نوع
        </Button>
        <Dialog
          fullWidth
          maxWidth={"sm"}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle>ویرایش دسته,ریجن,نوع</DialogTitle>
          <DialogContent>
            <Grid sx={{ my: "10px" }}>
              <Button
                onClick={() => {
                  setSelectedButton("region");
                  handleClickOpen();
                }}
                sx={selectedButton === "region" ? buttonStyle : {}}
              >
                ریجن
              </Button>
              <Button
                onClick={() => {
                  setSelectedButton("category");
                  handleClickOpen();
                }}
                sx={selectedButton === "category" ? buttonStyle : {}}
              >
                دسته
              </Button>
              <Button
                onClick={() => {
                  setSelectedButton("type");
                  handleClickOpen();
                }}
                sx={selectedButton === "type" ? buttonStyle : {}}
              >
                نوع
              </Button>
            </Grid>
            <Grid>
              <TabelOptions
                selected={selected}
                setSelected={setSelected}
                dataHead={dataHead}
                dataBody={
                  selectedButton === "region"
                    ? regionData
                    : selectedButton === "category"
                    ? categoryData
                    : typeData
                }
                selectedItemId={selectedItems[selectedButton]} // ارسال selectedItemId مربوط به selectedButton به TabelOptions
              />
            </Grid>
            <Button
              onClick={() => {
                // حذف اطلاعات بر اساس selectedItemId
                const updatedData =
                  selectedButton === "region"
                    ? regionData.filter(
                        (item) => item.data[0] !== selectedItemId
                      )
                    : selectedButton === "category"
                    ? categoryData.filter(
                        (item) => item.data[0] !== selectedItemId
                      )
                    : typeData.filter(
                        (item) => item.data[0] !== selectedItemId
                      );

                console.log("اطلاعات حذف شده:", updatedData);
              }}
            >
              حذف کردن
            </Button>

            <Button onClick={() => setOpen(false)}>بستن</Button>
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
};

export default EditOptionsDes;
