import AdminContent from "@/components/layout/admin.content";
import AdminFooter from "@/components/layout/admin.footer";
import AdminHeader from "@/components/layout/admin.header";
import AdminSideBar from "@/components/layout/admin.sidebar";
import { Layout } from "antd";
import React from "react";

const AdmimLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Layout>
            <AdminSideBar />
            <Layout>
                <AdminHeader />
                <AdminContent>{children}</AdminContent>
                <AdminFooter />
            </Layout>
        </Layout>
    );
};

export default AdmimLayout;
