import AccountLayout from "Components/Common/Layout/AccountLayout";
import { Grid } from "@mui/material";
import Chat from "Components/Common/Chat/Chat";
import TableTickets from "Components/Common/HomePageSteps/TableGiftCards/Tables/TableTickets";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";

const Tickets = () => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);
    const [dataBody, setDataBody] = useState([]);
    const dataHead = [
        "کد تیکت",
        "نام تیکت",
        "کاربر",
        "نوع",
        "تاریخ ایجاد",
        "وضعیت",
        "اقدامات",
    ];
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [pageDataAll, setPageDataAll] = useState({});

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
                    `${ServerURL.url}/admin/tiket/get-all-tikets?page=${page}&perPage=${perPage}`,
                    config
                );
                const data = response.data.data;
                const pageData = data;
                setDataBody(
                    data.map((item) => ({
                        id: item.id,
                        data: [
                            `#${item.id}`,
                            {
                                type: "text",
                                text: item.title || "نام ناشناخته",
                            },
                            {
                                type: "text",
                                text: item.sender,
                            },
                            {
                                type: "textBold",
                                text: "Finance and sales department",
                            },
                            {
                                type: "text",
                                text: moment(item.created_at).format("jYYYY/jM/jD یا YYYY/M/D"),
                            },
                            {
                                type: "status",
                                text: item.status,
                            },
                            {
                                type: "btn",
                                text: "1401/7/7",
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
            <AccountLayout>
                {/* <Chat /> */}
                <TableTickets
                    label={'لیست تیکت ها'}
                    selected={selected}
                    setSelected={setSelected}
                    dataHead={dataHead}
                    dataBody={dataBody}
                    selectedItemId={selectedItemId}
                    pageData={pageDataAll}
                    setPage={(e) => setPage(e)}
                    setPerPage={(e) => setPerPage(e)}
                    perPage={pageDataAll.perPage}
                />
            </AccountLayout>
        </>
    );
};

export default Tickets;