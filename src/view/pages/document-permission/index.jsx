import React, { useState, useEffect } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  Space,
  Table,
  Select,
  Input,
  DatePicker,
  TimePicker,
  Modal,
  message,
  Upload,
} from "antd";
import { RiCloseFill, RiCalendarLine } from "react-icons/ri";
import axios from "axios";
// import InfoProfile from "./personel-information";
// import MenuProfile from "./menu";
// import PasswordProfile from "./password-change";
// import ProtectedAppPage from "../Protected";

const columns = [
  {
    title: "Project Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Project Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Department Id",
    dataIndex: "departmentId",
    key: "departmentId",
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
    title: "Project Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "No of Users",
    dataIndex: "numberOfUsers",
    key: "numberOfUsers",
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

export default function Projects() {
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [projName, setProjName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [status, setStatus] = useState("");
  const [code, setCode] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));
  const [data, setData] = useState([]);
  const [departmentOptions, setDepartments] = useState([]);
  const [projectOptions, setProjects] = useState([]);

  const [projectId, setProjectId] = useState("");

  const projectModalShow = () => {
    setProjectModalVisible(true);
  };

  const projectModalCancel = () => {
    setCode("");
    setStatus("");
    setProjName("");
    setDepartmentId("");
    setProjectModalVisible(false);
  };

  const permissionModalShow = () => {
    setPermissionModalVisible(true);
  };
  const permissionModalCancel = () => {
    setPermissionModalVisible(false);
  };
  const addProject = async () => {
    console.log("inside");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8083/api/projects/",
        {
          title: projName,
          departmentId,
          status,
          code,
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
      console.log(response);
      message.success(response?.data?.message);
      fetchData();
      projectModalCancel();
    } catch (error) {
      // Handle errors
      console.error("Error adding projects:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8083/api/projects?companyId=${user?.user?.companyId}`,
        {
          headers: {
            Authorization: user?.accessToken,
            // Add other headers if needed
          },
        }
      );
      setData(response.data); // Assuming the response.data is an array of projects
      const options = [];
      for (const item of response?.data) {
        options.push({ value: item?.id, label: item?.title });
      }
      setProjects(options); // Assuming the response.data is an array of projects
    } catch (error) {
      console.error("Error fetching projects:", error?.message);
    }
  };
  const fetchDepartments = async () => {
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
      const options = [];
      for (const item of response?.data) {
        options.push({ value: item?.id, label: item?.title });
      }
      setDepartments(options); // Assuming the response.data is an array of projects
    } catch (error) {
      console.error("Error fetching departments:", error?.message);
    }
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("user")));
    // Fetch data when the component mounts
    fetchDepartments();
    fetchData();
  }, []);
  return (
    <>
      <Modal
        title="Add Project"
        width={416}
        centered
        visible={projectModalVisible}
        onCancel={projectModalCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Form layout="vertical" name="basic">
          <Form.Item label="Project Name" name="projName">
            <Input
              value={projName}
              onChange={(e) => setProjName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Project Code" name="code">
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
          </Form.Item>

          <Form.Item label="Department Name" name="departmentId">
            <Select
              options={departmentOptions}
              value={departmentId}
              onChange={(e) => setDepartmentId(e)}
            />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              defaultValue="ongoing"
              options={[
                { value: "ongoing", label: "Ongoing" },
                { value: "complete", label: "Complete" },
                { value: "notstarted", label: "Not Started" },
              ]}
              value={status}
              onChange={(e) => setStatus(e)}
            />
          </Form.Item>
          <Row>
            <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
              <Button
                block
                type="primary"
                htmlType="submit"
                onClick={() => addProject()}
              >
                Add
              </Button>
            </Col>

            <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
              <Button block onClick={projectModalCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Document Permissions"
        width={416}
        centered
        visible={permissionModalVisible}
        onCancel={permissionModalCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Form layout="vertical" name="basic">
          <Form.Item label="Project Name" name="projectId">
            <Select
              options={projectOptions}
              value={projectId}
              onChange={(e) => setProjectId(e)}
            />
          </Form.Item>

          <Row>
            <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
              <Button
                block
                type="primary"
                htmlType="submit"
                onClick={() => addProject()}
              >
                Add
              </Button>
            </Col>
            <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
              <Button block onClick={projectModalCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <Button type="primary" onClick={projectModalShow}>
          Add Project
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
