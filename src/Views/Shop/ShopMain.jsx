import React, { useState } from "react";
import PageName from "../../Components/Common/PageName";
import ShopHome from "./ShopHome";
import ShopPage2 from "./ShopPage2";

export default function ShopMain() {
    // manage which page is visible 
    const [activePage, setActivePage] = useState(1);

    return (
        <>
            <PageName />

            {/* Conditional Rendering: Show ShopHome on page 1, ShopPage2 on page 2 */}
            {activePage === 1 && <ShopHome setActivePage={setActivePage} activePage={activePage} />}
            {activePage === 2 && <ShopPage2 setActivePage={setActivePage} activePage={activePage} />}
        </>
    );
}