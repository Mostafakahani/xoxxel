import React, { useState, useEffect } from 'react';
import { Grid } from "@mui/material";
import NewGift from "Components/Common/HomePageSteps/TableGiftCards/Tables/TableTopUpGames";

const HandleTableTrendingGame = () => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);
    const [dataBody, setDataBody] = useState([]);
    const dataHead = [
        "کد محصول",
        "نام محصول",
        "نوع",
        "تاریخ ایجاد",
    ];

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/images/search?limit=20')
            .then(response => response.json())
            .then(data => {
                setDataBody(data.map((item, index) => ({
                    id: index + 1,
                    data: [
                        `#${index + 1}`,
                        {
                            type: "textBold",
                            text: item.id || "نام ناشناخته",
                            // text: item?.breeds[0]?.name || "نام ناشناخته",
                        },
                        {
                            type: "text",
                            text: "Gift card",
                        },
                        {
                            type: "text",
                            text: "1401/7/7",
                        },
                    ],
                })));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <>
            <Grid>
                <NewGift
                    selected={selected}
                    setSelected={setSelected}
                    dataHead={dataHead}
                    dataBody={dataBody}
                    selectedItemId={selectedItemId}
                />
            </Grid>
        </>
    );
}

export default HandleTableTrendingGame;
