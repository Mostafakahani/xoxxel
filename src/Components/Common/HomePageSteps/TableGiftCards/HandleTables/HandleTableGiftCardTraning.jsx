import React, { useState, useEffect, useRef } from 'react';
import { Grid } from "@mui/material";
import NewGift from "Components/Common/HomePageSteps/TableGiftCards/Tables/TableGiftCardTraning";
import axios from 'axios';
import ServerURL from 'Components/Common/Layout/config';
import moment from 'moment-jalaali';

const HandleTableGiftCardTraning = ({ setSelectedId = () => { } }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);
    const [dataBody, setDataBody] = useState([]);
    const dataHead = [
        "کد محصول",
        "نام محصول",
        "نوع",
        "تاریخ ایجاد",
    ];
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [pageDataAll, setPageDataAll] = useState({});

    const scrollContainerRef = useRef();
    const handleScroll = async () => {
        const { scrollTop, clientHeight, scrollHeight } = scrollContainerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
            setPage((prevPage) => prevPage + 1);
            console.log(page)
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                },
            };
            try {
                const response = await axios.get(
                    // `https://api.thecatapi.com/v1/images/search?limit=20`,
                    `${ServerURL.url}/admin/sliders/trend-gift-cart/list`,
                    config
                );
                const data = response.data;
                const pageData = data;
                // console.log(data.map((x) => x.id_product.title))
                setSelected(data.map((x) => x?.id_product.id))
                setDataBody(
                    data.map((item, index) => ({
                        id: index + 1,
                        data: [
                            `#${index + 1}`,
                            {
                                type: "textBold",
                                text: item?.id_product.title || "نام ناشناخته",
                                // text: item?.breeds[0]?.name || "نام ناشناخته",
                            },
                            {
                                type: "text",
                                text: item?.status,
                            },
                            {
                                type: "text",
                                text: moment(item?.created_at).format("jYYYY/jM/jD یا YYYY/M/D"),
                            },
                        ],
                    }))
                );
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

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [page, perPage]);

    return (
        <>
            {/* <div ref={scrollContainerRef}
                onScroll={handleScroll}
                style={{ overflowY: 'scroll', maxHeight: '600px' }}> */}
            <NewGift
                label={'صفحه اصلی Trending gift card'}
                selected={selected}
                setSelected={(e) => { setSelected(e); setSelectedId(e); }}
                dataHead={dataHead}
                dataBody={dataBody}
                selectedItemId={selectedItemId}
                pageData={pageDataAll}
                setPage={(e) => setPage(e)}
                setPerPage={(e) => setPerPage(e)}
                perPage={pageDataAll.perPage}
            // page={2}
            />
            {/* </div> */}
        </>
    );
}

export default HandleTableGiftCardTraning;
