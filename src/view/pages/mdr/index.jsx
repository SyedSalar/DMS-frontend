import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from 'react-router-dom'; 

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
  Checkbox
} from "antd";
import { Radio } from "antd";
import axios from "axios";
import { RiCloseFill, RiCalendarLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ProtectedAppPage from "../Protected";
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

export default function MDR() {
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [mdrCode, setMdrCode] = useState("");
  const [noOfDocuments, setNoOfDocuments] = useState("");
  const [projectOptions, setProjects] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));
  const [data, setData] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState([]);

  const [mdrTemplateVisible, setMdrTemplateVisible] = useState(false);
  const [departmentOptions,setDepartmentOptions] = useState([])
  const [userOptions, setUserData] = useState([]);

  const showMdrTemplate = () => {
    setMdrTemplateVisible(true);
  };

  const hideMdrTemplate = () => {
    setMdrTemplateVisible(false);
  };

  const history = useHistory();
  const navigateToMdrTemplate = () => {
    const project = projectOptions.find((item) => item?.value == projectId);
    console.log('departmentOptions',departmentOptions);
    const serializedDepartmentOptions = JSON.stringify(departmentOptions);
const serializedProjectOptions = JSON.stringify(projectOptions);
    history.push(`/pages/initialMDR?projectCode=${project.code}&mdrCode=${mdrCode}&departmentOptions=${serializedDepartmentOptions}&projectOptions=${serializedProjectOptions}&projectId=${projectId}&departmentId=${selectedDepartments}&title=${title}`);};
 
  
  const documentModalShow = () => {
    setDocumentModalVisible(true);
  };

  const documentModalCancel = () => {
    setTitle("");
    setProjectId("");
    setDepartmentId("");
    setDocumentModalVisible(false);
  };



  
  const addDocument = async () => {
    try {
      const project = projectOptions.find((item) => item?.value == projectId);
      const department = departmentOptions.find(
        (item) => item?.value == departmentId
      );

      const response = await axios.post(
        "http://127.0.0.1:8083/api/documents/mdr",
        {
          title,
          departmentId,
          projectId,
          noOfDocuments,
          companyId: user?.user?.companyId,
          authorId: user?.user?.id,
          authorName: `${user?.user?.firstName} ${user?.user?.lastName}`,
          mdrCode,
          projectCode: project?.code,
          departmentName: department?.label,
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
      documentModalCancel();
    } catch (error) {
      // Handle errors
      console.error("Error adding documents:", error);
    }
  };
  const exportCSV = async (record) => {
    try {
      console.log(record);
      const response = await axios.post(
        `http://127.0.0.1:8083/api/documents/export/${record?.id}?companyId=${user?.user?.companyId}`,
        {
          headers: {
            Authorization: user?.accessToken,
            // Add other headers if needed
          },
        }
      );

      message.success(response?.data?.message);
    } catch (error) {
      console.error("Error fetching documents:", error?.message);
    }
  };
  const fetchData = async () => {
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
      console.log('mdr data',response.data);
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
      setDepartmentOptions(options); // Assuming the response.data is an array of projects
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
  
      // Use Set to store unique titles
      const uniqueTitlesSet = new Set();
  
      const options = response?.data.reduce((acc, item) => {
        // Check if the title is not in the Set
        if (!uniqueTitlesSet.has(item.title)) {
          // Add title to the Set
          uniqueTitlesSet.add(item.title);
  
          // Push the option to the result array
          acc.push({ value: item.id, label: item.title, code: item.code });
        }
  
        return acc;
      }, []);
  
      console.log(response.data);
      setProjects(options); // Assuming the response.data is an array of projects
      console.log(projectOptions);
    } catch (error) {
      console.error("Error fetching departments:", error?.message);
    }
  };
  const fetchUsers = async () => {
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
      console.log(response?.data, "UUUAUA");
      const options = [];
     
      for (const item of response?.data) {
        var role='Engineer'
        if(item.roleId==1){
           role ='CEO'
        } if(item.roleId==2){
          role ='HEAD'
       }
        options.push({
          value: item?.id,
          label: `${item?.firstName} ${item?.lastName} ${role}`,
        });
      }

      setUserData(options); // Assuming the response.data is an array of DocumentPermissions
    } catch (error) {
      console.error("Error fetching departments:", error?.message);
    }
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("user")));
    // Fetch data when the component mounts
    fetchDepartments();
    fetchProjects();
    fetchUsers();
    fetchData();
  }, []);
  return (
    <>
      <Modal
        title="Upload Document"
        width={400}
        centered
        visible={documentModalVisible}
        onCancel={documentModalCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Row justify="space-between" align="center">
          <Col span={20}>
            <Form layout="vertical" name="basic">
              <Form.Item
                label="MDR Title"
                name="docTitle"
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
              <Form.Item
                label="MDR Code"
                name="docCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your code",
                  },
                ]}
              >
                <Input
                  value={title}
                  onChange={(e) => setMdrCode(e.target.value)}
                />
              </Form.Item>

              <Form.Item
        label="Departments"
        name="departmentIds"
        rules={[{ required: true, message: 'Please select at least one department' }]}
      >
        <Checkbox.Group options={departmentOptions} value={selectedDepartments} onChange={setSelectedDepartments} />
      </Form.Item>

              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[
                  {
                    required: true,
                    message: "Please select Project Name",
                  },
                ]}
              >
 <Select
                  options={projectOptions}
                  value={projectId}
                  onChange={(value) => setProjectId(value)}
                />              </Form.Item>
              <Form.Item
                label="Add Reviewers"
                name="reviewers"
                rules={[
                  {
                    required: true,
                    message: "Please select Reviewers Name",
                  },
                ]}
              >
                              <Checkbox.Group options={userOptions} value={selectedReviewer} onChange={setSelectedReviewer} />

              </Form.Item> <Form.Item
                label="Add Approvers"
                name="approvers"
                rules={[
                  {
                    required: true,
                    message: "Please select Approvers Name",
                  },
                ]}
              >
               <Checkbox.Group options={userOptions} value={selectedApprover} onChange={setSelectedApprover} />
              </Form.Item>
              {/* <Form.Item
                label="No of Documents"
                name="noOfDocuments"
                rules={[
                  {
                    required: true,
                    message: "Please input No of Documents",
                  },
                ]}
              >
                <Input
                  type="number"
                  value={noOfDocuments}
                  onChange={(e) => setNoOfDocuments(e.target.value)}
                />
              </Form.Item> */}

              <Row>           
              <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
                  <Button block onClick={navigateToMdrTemplate} type="primary"htmlType="submit">MDR template</Button>
                </Col>
                <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
                  <Button block onClick={navigateToMdrTemplate} type="primary"htmlType="submit">Create Custom</Button>
                </Col>
                
              </Row>

              <Row>
                {/* <Col md={12} span={24} className="hp-pr-sm-0 mt-2 hp-pr-12 ">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={() => addDocument()}
                  >
                    Submit
                  </Button>
                </Col> */}

                {/* <Col
                  md={12}
                  span={24}
                  className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12"
                >
                  <Button block onClick={documentModalCancel}>
                    Cancel
                  </Button>
                </Col> */}
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <Button
          type="primary"
          onClick={documentModalShow}
          disabled={user?.user?.roleId != 1}
        >
          Add Master Document Register
        </Button>
      {mdrTemplateVisible && <MdrTemplate />}
      </div>
      <Table
        columns={[
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
            title: "No of Documents",
            dataIndex: "noOfDocuments",
            key: "noOfDocuments",
          },

          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <>
                <Space size="middle">
                  <Button
                    key={record?.id}
                    onClick={() => {
                      exportCSV(record);
                    }}
                    disabled={user?.user?.roleId != 1}
                  >
                    Export
                  </Button>
                </Space>
              </>
            ),
          },
        ]}
        dataSource={data}
      />
      <ProtectedAppPage />
    </>
  );
}
