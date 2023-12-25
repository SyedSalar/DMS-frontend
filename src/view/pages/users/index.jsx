import React, { useState, useEffect } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  Space,
  Table,
  Input,
  Modal,
  message,
} from "antd";
import { RiCloseFill, RiCalendarLine } from "react-icons/ri";
import axios from "axios";
// import InfoProfile from "./personel-information";
// import MenuProfile from "./menu";
// import PasswordProfile from "./password-change";
// import ProtectedAppPage from "../Protected";
import ProtectedAppPage from "../Protected";
const columns = [
  {
    title: "User ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "roleTitle",
    key: "roleTitle",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function Users() {
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));
  const [data, setData] = useState([]);
  const UserModalShow = () => {
    setUserModalVisible(true);
  };

  const UserModalCancel = () => {
    setUserModalVisible(false);
  };

  const addUser = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8083/api/users`,
        {
          email,
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: user?.accessToken,
            // Add other headers if needed
          },
        }
      );

      // Handle the response as needed
      console.log(response);
      message.success(response?.data?.message);
      fetchData();
      UserModalCancel();
    } catch (error) {
      // Handle errors
      console.error("Error adding user:", error);
      // message.error("Error adding user");
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8083/api/users?companyId=${user?.user?.companyId}&roleId=2`,
        {
          headers: {
            Authorization: user?.accessToken,
            // Add other headers if needed
          },
        }
      );
      setData(response.data); // Assuming the response.data is an array of projects
    } catch (error) {
      console.error("Error fetching documents:", error?.message);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("user")));
    // Fetch data when the component mounts

    fetchData();
  }, []);

  return (
    <>
      <Modal
        title="Add User"
        width={416}
        centered
        visible={userModalVisible}
        onCancel={UserModalCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Form layout="vertical" name="basic">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your firstName!",
              },
            ]}
          >
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastName!",
              },
            ]}
          >
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="E-mail :"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Row>
            <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
              <Button
                block
                type="primary"
                htmlType="submit"
                onClick={() => addUser()}
                disabled={
                  !(
                    email.length &&
                    firstName.length &&
                    lastName.length &&
                    isEmailValid
                  )
                }
                className={
                  !(
                    email.length &&
                    firstName.length &&
                    lastName.length &&
                    isEmailValid
                  )
                    ? "disabled-button"
                    : ""
                }
              >
                Add
              </Button>
            </Col>

            <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
              <Button block onClick={UserModalCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <Button type="primary" onClick={UserModalShow}>
          Add User
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <ProtectedAppPage />
    </>
  );
}
