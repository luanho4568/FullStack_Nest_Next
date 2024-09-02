"use client";
import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, Modal, notification, Steps } from "antd";
import { useState } from "react";
import { SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { sendRequest } from "@/utils/api";

const ModalReactive = (props: any) => {
    const { isModalOpen, setIsModalOpen, userEmail } = props;
    const [current, setCurrent] = useState(0);
    const [userId, setUserId] = useState("");
    const hasMounted = useHasMounted();
    if (!hasMounted) return <></>;

    const onFinishStep0 = async (values: any) => {
        const { email } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
            method: "POST",
            body: { email },
        });
        if (res?.data) {
            setCurrent(1);
            setUserId(res?.data?._id);
        } else {
            notification.error({
                message: "Call APIs Error",
                description: res?.message,
            });
        }
    };
    const onFinishStep1 = async (values: any) => {
        const { code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            method: "POST",
            body: { code, _id: userId },
        });
        if (res?.data) {
            setCurrent(2);
        } else {
            notification.error({
                message: "Call APIs Error",
                description: res?.message,
            });
        }
    };
    return (
        <>
            <Modal
                title="Kích hoạt tài khoản"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                footer={null}
            >
                <Steps
                    current={current}
                    items={[
                        {
                            title: "Login",
                            // status: "finish",
                            icon: <UserOutlined />,
                        },
                        {
                            title: "Verification",
                            // status: "finish",
                            icon: <SolutionOutlined />,
                        },
                        {
                            title: "Done",
                            // status: "wait",
                            icon: <SmileOutlined />,
                        },
                    ]}
                />
                {current === 0 && (
                    <>
                        <div style={{ margin: "20px 0" }}>Tài khoản của bạn chưa được kích hoạt</div>

                        <Form name="verify1" onFinish={onFinishStep0} autoComplete="off" layout="vertical">
                            <Form.Item label="" name="email" initialValue={userEmail}>
                                <Input disabled />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Resend
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                {current === 1 && (
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Vui lòng nhập mã xác nhận</p>
                        </div>

                        <Form name="verify2" onFinish={onFinishStep1} autoComplete="off" layout="vertical">
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input code email!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Active
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}

                {current === 2 && (
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Tài khoản của bạn đã được kích hoạt thành công. Vui lòng đăng nhập lại</p>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
};

export default ModalReactive;
