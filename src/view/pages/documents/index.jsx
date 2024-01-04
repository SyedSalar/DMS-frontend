import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import {
  Row,
  Col,
  Divider,
  Form,
  Space,
  Table,
  Select,
  Tag,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Modal,
  message,
  Upload,
} from "antd";
import { Radio } from "antd";
import axios from "axios";
import { RiCloseFill, RiCalendarLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import ProtectedAppPage from "../Protected";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const uploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const columns = [
  {
    title: "Document Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Document Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Dept Id",
    dataIndex: "departmentId",
    key: "departmentId",
  },
  {
    title: "Project Id",
    dataIndex: "projectId",
    key: "projectId",
  },
  {
    title: "MDR",
    dataIndex: "masterDocumentId",
    key: "masterDocumentId",
  },
  {
    title: ".exe",
    dataIndex: "extension",
    key: "extension",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
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

export default function Document() {
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [extension, setExtension] = useState("");
  const [mdr, setMDR] = useState("");
  const [file, setFile] = useState(null);
  const [textEditorValue, setTextEditorValue] = useState("");
  const [departmentOptions, setDepartments] = useState([]);
  const [projectOptions, setProjects] = useState([]);
  const [mdrOptions, setMdrData] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));
  const [data, setData] = useState([]);

  const documentModalShow = () => {
    setDocumentModalVisible(true);
  };

  const documentModalCancel = () => {
    setMDR("");
    setDocTitle("");
    setExtension("");
    setProjectId("");
    setDepartmentId("");
    setTextEditorValue("");
    setDocumentModalVisible(false);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addDocument = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const mdrObj = mdrOptions.find((item) => item?.value == mdr);
      console.log(mdrObj, mdr, user);
      const obj = {
        title: docTitle,
        departmentId: mdrObj?.departmentId,
        projectId: mdrObj?.projectId,
        masterDocumentId: mdr,
        content: textEditorValue,
        extension,
        companyId: user?.user?.companyId,
        roleId: user?.user?.roleId,
        userId: user?.user?.id,
        userName: `${user?.user?.firstName} ${user?.user?.lastName}`,
      };
      Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axios.post(
        "http://127.0.0.1:8083/api/documents/",
        formData,
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
      documentModalCancel();
    } catch (error) {
      // Handle errors

      if (error?.message == "Request failed with status code 403") {
        message.error("Permission Denied to create document on this MDR");
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8083/api/documents?companyId=${user?.user?.companyId}`,
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
  const fetchProjects = async () => {
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
      const options = [];
      for (const item of response?.data) {
        options.push({ value: item?.id, label: item?.title });
      }
      setProjects(options); // Assuming the response.data is an array of projects
    } catch (error) {
      console.error("Error fetching departments:", error?.message);
    }
  };
  const fetchMDR = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8083/api/documents/mdr?companyId=${user?.user?.companyId}`,
        {
          headers: {
            Authorization: user?.accessToken,
            // Add other headers if needed
          },
        }
      );
      const options = [];
      for (const item of response?.data) {
        options.push({
          value: item?.id,
          label: item?.title,
          projectId: item?.projectId,
          departmentId: item?.departmentId,
        });
      }

      setMdrData(options); // Assuming the response.data is an array of projects
    } catch (error) {
      console.error("Error fetching departments:", error?.message);
    }
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("user")));
    // Fetch data when the component mounts
    fetchDepartments();
    fetchProjects();
    fetchMDR();
    fetchData();
  }, []);
  return (
    <>
      <Modal
        title="Upload Document"
        width={1000}
        centered
        visible={documentModalVisible}
        onCancel={documentModalCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Row justify="space-between" align="center">
          <Col span={15}>
            <ReactQuill
              style={{ height: "300px" }}
              theme="snow"
              value={textEditorValue}
              onChange={setTextEditorValue}
            />
          </Col>
          <Col span={7}>
            <Form layout="vertical" name="basic">
              <Form.Item
                label="Document Title"
                name="docTitle"
                rules={[
                  {
                    required: true,
                    message: "Please input your title",
                  },
                ]}
              >
                <Input
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                />
              </Form.Item>

              {/* <Form.Item */}
              {/* label="Department Name" */}
              {/* name="deptName" */}
              {/* rules={[ */}
              {/* { */}
              {/* required: true, */}
              {/* message: "Please select Department Name", */}
              {/* }, */}
              {/* ]} */}
              {/* > */}
              {/* <Select */}
              {/* options={departmentOptions} */}
              {/* value={departmentId} */}
              {/* onChange={(value) => setDepartmentId(value)} */}
              {/* /> */}
              {/* </Form.Item> */}

              {/* <Form.Item */}
              {/* label="Project Name" */}
              {/* name="projectName" */}
              {/* rules={[ */}
              {/* { */}
              {/* required: true, */}
              {/* message: "Please select Project Name", */}
              {/* }, */}
              {/* ]} */}
              {/* > */}
              {/* <Select */}
              {/* options={projectOptions} */}
              {/* value={projectId} */}
              {/* onChange={(value) => setProjectId(value)} */}
              {/* /> */}
              {/* </Form.Item> */}
              <Form.Item
                label="MDR"
                name="mdr"
                rules={[
                  {
                    required: true,
                    message: "Please select MDR",
                  },
                ]}
              >
                <Select
                  options={mdrOptions}
                  value={mdr}
                  onChange={(value) => setMDR(value)}
                />
              </Form.Item>
              <Form.Item
                label="Extension"
                name="extension"
                rules={[
                  {
                    required: true,
                    message: "Please select Extention",
                  },
                ]}
              >
                <Select
                  options={[
                    { value: ".pdf", label: ".pdf" },
                    { value: ".docx", label: ".docx" },
                  ]}
                  value={extension}
                  onChange={(value) => setExtension(value)}
                />
              </Form.Item>

              {/* <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload> */}
              <input type="file" onChange={handleFileChange} />
              <Row>
                <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={() => addDocument()}
                  >
                    Submit
                  </Button>
                </Col>

                <Col
                  md={12}
                  span={24}
                  className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12"
                >
                  <Button block onClick={documentModalCancel}>
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
          onClick={documentModalShow}
          disabled={user?.user?.roleId == 3}
        >
          Add Documents
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <ProtectedAppPage />
    </>
  );
}
