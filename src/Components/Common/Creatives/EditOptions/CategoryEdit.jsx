import { Button, Grid } from "@mui/material";
import ServerURL from "Components/Common/Layout/config";
import TabelOptions from "Components/Common/TableItems/TabelOptions";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryEdit = () => {
    const [selectedItemId, setSelectedItemId] = useState(null);

    const [regionData, setRegionData] = useState([]);
    const [selected, setSelected] = useState([]);

    const dataHead = [
        "id",
        "نام ریجن",
    ]
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
            animation: 'slideIn .5s forwards',

        },

        '@keyframes slideIn': { // تعریف انیمیشن
            from: {
                width: 0,
            },
            to: {
                width: '100%',
            },
        },

    };


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `${ServerURL.Bear}` // YourBearerToken را با مقدار مورد نظر جایگزین کنید
            }
        };

        axios.get("https://xoxxel.dicato.net/admin/storage/get-all-cat?page=1", config)
            .then(response => {
                const apiData = response.data; // داده‌های دریافتی از سرور
                const updatedRegionData = apiData.data.map(item => {
                    return {
                        id: item.id,
                        data: [
                            `#${item.id}`, // مقدار `#` به همراه شناسه از سرور
                            {
                                type: "text",
                                text: item.title
                            }
                        ]
                    };
                });
                setRegionData(updatedRegionData);
            })
            .catch(error => {
                console.error("Error fetching data from the server:", error);
            });
    }, []); // useEffect فقط یکبار در زمان رندر اولیه اجرا می‌شود

    return (
        <>

            <Grid>
                <TabelOptions
                    selected={selected}
                    setSelected={setSelected}
                    dataHead={dataHead}
                    dataBody={regionData}
                />
                <Button
                    onClick={() => {
                        console.log(selected);
                    }}
                >
                    حذف کردن
                </Button>


                <Button
                //  onClick={() => setOpen(false)}
                >
                    بستن
                </Button>
            </Grid>

        </>
    )
}
export default CategoryEdit;