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

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const config = {
                    headers: {
                        Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                    },
                };
                try {
                    const response = await axios.get(
                        `${ServerURL.url}/admin/tiket/get-tiket/${id}`,
                        config
                    );
                    const dataResponse = response.data;
                    setData(dataResponse);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);


    const SendMessage = async () => {
        if (id && message.trim() !== '') {
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                },
            };
            const data = {
                id_tiket: parseInt(id),
                description: message
            }
            try {
                await axios.post(
                    `${ServerURL.url}/admin/tiket/replay-tiket`,
                    data, config
                );
                // تاخیر برای به‌روزرسانی message
                await new Promise(resolve => setTimeout(resolve, 100));
                // حذف محتوای input پس از ارسال
                setSendMessage('');
                // بازیابی داده‌ها (اختیاری)
                fetchData();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };





    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AccountLayout>
                <Chat data={data} getData={(e) => { setSendMessage(e); SendMessage(); }} />
                {console.log(message)}
            </AccountLayout>
        </>
    );
};

export default ProductDetails;
