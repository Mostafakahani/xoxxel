import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ServerURL from 'Components/Common/Layout/config';
import axios from 'axios';
import GetToken from 'GetToken';
import Chat from 'Components/Common/Chat/Chat';
import AccountLayout from "Components/Common/Layout/AccountLayout";

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setSendMessage] = useState('');
    const [messageTemp, setSendMessageTemp] = useState('');
    // useEffect(() => {
    //     if (message) {
    //         SendMessage();
    //     }
    //     // توجه کنید که فقط زمانی می‌خواهید فراخوانی شود که message تغییر کرده باشد.
    // }, [message]);
    



    // const SendMessage = async () => {
    //     if (message !== '') {
    //         const config = {
    //             headers: {
    //                 Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
    //             },
    //         };
    //         const data = {
    //             id_tiket: parseInt(id),
    //             description: message
    //         }
    //         try {
    //             const response = await axios.post(
    //                 `${ServerURL.url}/admin/tiket/replay-tiket`,
    //                 data, config
    //             );
    //             const dataResponse = response.data;
    //             setData(dataResponse);
    //             // تغییر messageTemp به مقدار فعلی message
    //             setSendMessageTemp(message);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     } else {

    //     }
    // };

   
 

    return (
        <>
            <AccountLayout>
                <Chat
                    id={id}
                // data={data}
                />
            </AccountLayout>
        </>
    );
};

export default ProductDetails;
