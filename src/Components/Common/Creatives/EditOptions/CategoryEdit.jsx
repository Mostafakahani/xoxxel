import { Button, Grid } from "@mui/material";
import ServerURL from "Components/Common/Layout/config";
import TabelOptions from "Components/Common/TableItems/TabelOptions";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryEdit = () => {
    const [regionData, setRegionData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [updateData, setUpdateData] = useState(false);

    const dataHead = [
        "id",
        "نام ریجن",
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `${ServerURL.Bear}`
                    }
                };
                const response = await axios.get("https://xoxxel.dicato.net/admin/storage/get-all-cat?page=1", config);
                const apiData = response.data;
                const updatedRegionData = apiData.data.map(item => {
                    return {
                        id: item.id,
                        data: [
                            `#${item.id}`,
                            {
                                type: "text",
                                text: item.title
                            }
                        ]
                    };
                });
                setRegionData(updatedRegionData);
            } catch (error) {
                console.error("Error fetching data from the server:", error);
            }
        };

        fetchData();
    }, [updateData]); // اگر وضعیت updateData تغییر کند، useEffect دوباره اجرا می‌شود

    const handleDelete = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `${ServerURL.Bear}`
                }
            };

            const deleteData = {
                ids: selected
            };

            await axios.post("https://xoxxel.dicato.net/admin/cat/delete", deleteData, config);
            console.log("Delete request sent successfully.");
            // وقتی که حذف با موفقیت انجام شود، وضعیت را به true تغییر دهید تا useEffect دوباره اجرا شود
            setUpdateData(true);
        } catch (error) {
            console.error("Error sending delete request:", error);
        }
    };

    return (
        <Grid>
            <TabelOptions
                selected={selected}
                setSelected={setSelected}
                dataHead={dataHead}
                dataBody={regionData}
            />
            <Button onClick={handleDelete}>حذف کردن</Button>
            <Button>{/* دیگر عملیات */}</Button>
        </Grid>
    );
};

export default CategoryEdit;
