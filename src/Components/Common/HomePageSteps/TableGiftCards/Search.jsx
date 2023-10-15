import React, { useState, useEffect } from 'react';

function SearchComponent({ onSearch, values }) {
    const [searchText, setSearchText] = useState('');

    const [resultItem, setResultItem] = useState(null);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
    };

    useEffect(() => {
        const lowercaseSearchText = searchText.toLowerCase();
        const foundItem = values.find(item => item.text.toLowerCase() === lowercaseSearchText);

        if (foundItem) {
            setResultItem(foundItem); // ذخیره مورد پیدا شده در متغیر resultItem
        } else {
            setResultItem(null); // اگر موردی پیدا نشد، resultItem را به مقدار null تنظیم کنید
        }

        // ارسال مقدار متن جستجو به تابع جستجوی بیرونی
        onSearch(searchText);
    }, [searchText, values, onSearch]);

    return (
        <div>
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="جستجو..."
            />

            {/* نمایش مورد پیدا شده در UI */}
            {resultItem && (
                <div>
                    <p>مورد پیدا شده:</p>
                    <p>متن: {resultItem.text}</p>
                    <p>SVG: {resultItem.svg}</p>
                </div>
            )}
        </div>
    );
}

export default SearchComponent;
