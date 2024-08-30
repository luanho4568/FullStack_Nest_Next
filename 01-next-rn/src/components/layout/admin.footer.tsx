"use client";

import { Footer } from "antd/es/layout/layout";
import React from "react";

const AdminFooter = () => {
    return (
        <Footer style={{ textAlign: "center" }}>
            Hồ Đình Thanh Luân Design ©{new Date().getFullYear()} Created by @hodinhthanhluan
        </Footer>
    );
};

export default AdminFooter;
