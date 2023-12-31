import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import {
  Row,
  Col,
  Form,
  Space,
  Table,
  Input,
  Button,
  Modal,
  message,
} from "antd";

import axios from "axios";
import { RiCloseFill, RiCalendarLine } from "react-icons/ri";
import ProtectedAppPage from "../Protected";
import "react-quill/dist/quill.snow.css";

const columns = [
  {
    title: "Department Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author Id",
    dataIndex: "authorId",
    key: "authorId",
  },
  {
    title: "Author Name",
    dataIndex: "authorName",
    key: "authorName",
  },
  {
    title: "No of Users",
    dataIndex: "noOfUsers",
    key: "noOfUsers",
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

export default function Depatments() {
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));
  const [data, setData] = useState([]);
  const departmentModalShow = () => {
    setDepartmentModalVisible(true);
  };

  const departmentModalCancel = () => {
    setTitle("");
    setDepartmentModalVisible(false);
  };

  const addDepartments = async () => {
    try {
      console.log(user);
      const response = await axios.post(
        "http://127.0.0.1:8083/api/departments/",
        {
          title,
          companyId: user?.user?.companyId,
          authorId: user?.user?.id,
          authorName: `${user?.user?.firstName} ${user?.user?.lastName}`,
        },
        {
          headers: {
            Authorization: user?.accessToken,
            // Add other headers if needed
          },
        }
      );
      // Handle the response as needed
      console.log("response", response);
      message.success(response?.data?.message);
      fetchData();
      departmentModalCancel();
    } catch (error) {
      if (error?.message == "Request failed with status code 401") {
        message.error("Unauthorized");
      }
      console.error("Error adding departments:", error?.message);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8083/api/departments?companyId=${user?.user?.companyId}`,
        {
          headers: {
            Authorization: user?.accessToken,
            // Add other headers if needed
          },
        }
      );
      setData(response.data); // Assuming the response.data is an array of departments
    } catch (error) {
      console.error("Error fetching departments:", error?.message);
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
        title="Add Department"
        width={400}
        centered
        visible={departmentModalVisible}
        onCancel={departmentModalCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Row justify="space-between" align="center">
          <Col span={20}>
            <Form layout="vertical" name="basic">
              <Form.Item
                label="Department Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your title",
                  },
                ]}
              >
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>

              <Row>
                <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={() => addDepartments()}
                  >
                    Submit
                  </Button>
                </Col>

                <Col
                  md={12}
                  span={24}
                  className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12"
                >
                  <Button block onClick={departmentModalCancel}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <Button
          type="primary"
          onClick={departmentModalShow}
          disabled={user?.user?.roleId != 1}
        >
          Add Department
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <ProtectedAppPage />
    </>
  );
}
