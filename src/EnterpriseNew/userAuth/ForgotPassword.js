import React, { useState } from "react";
import { Modal, Form, Button, Spin,Anchor } from "antd";
import Success from './../UtilityComponents/SuccessHandler';
import Error from './../UtilityComponents/ErrorHandler';
import FormInput from './../UI/antInputs/FormInput';
import { forgotPassword } from '../API/userAuth/userAuth';

const ForgotPassword = () => {
    //Modal Visible State
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { Link } = Anchor;
    //handleSubmit 
    const handleSubmit = async () => {
        setLoading(true);
        if (!username) {
            setLoading(false);
            setError("Field can't be Empty");
        } else {
            const result = await forgotPassword(username);
            setLoading(false);
            if (result && result[0]) {
                setSuccess("An email has been sent on your registered mail-Id for further process.");
                setTimeout(() => {
                    setVisible(false);
                    setSuccess("")
                    setError("")
                    setUsername("");
                    form.resetFields()
                }, 4000);
            } else {
                setError(result[1]);
            }
        }
    }
    return (
        <>

<a className="forgotPassword"
                onClick={() => {
                setVisible(true)
               }}> Forgot Password?</a> 
 
            <Modal
                footer={null}
                visible={visible}
                onCancel={() => setVisible(false)}
                closable
                title="Forgot Password?"
            >
                {success && <Success success={success} />}
                {error && <Error error={error} />}
                {loading && <div style={{ margin: "10px auto" }}><Spin tip="loading" size="large"></Spin></div>}
                <Form
                    layout="vertical"
                    form={form} name="control-hooks"
                    className="m-1"
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <FormInput
                        placeholder="Enter Username"
                        className="formInput"
                        label="Username"
                        value={username}
                        name="username"
                        onChange={(key, value, id = 0) => {
                            setError("");
                            setUsername(value)
                        }}
                        required={true}
                    />
                    <Form.Item>
                        <Button htmlType="submit" className="SchForm">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default ForgotPassword;