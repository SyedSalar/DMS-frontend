import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";


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
  Select,Divider
} from "antd";
import { RiMore2Line, RiMenuFill, RiCloseFill } from "react-icons/ri";

import Breadcrumbs from "../../../layout/components/content/breadcrumbs";
import CustomizedTables from "../../common/BaseTable";
// import InfoProfile from "./personel-information";
// import MenuProfile from "./menu";
// import PasswordProfile from "./password-change";
// import ProtectedAppPage from "../Protected";


export default function Projects() {
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Project Name",
      dataIndex: "ProjectName",
      key: "ProjectName",
    },
    {
      title: "Project Code",
      dataIndex: "ProjectCode",
      key: "ProjectCode",
    },
    {
      title: "InHouse Status",
      dataIndex: "InHouseStatus",
      key: "InHouseStatus",
    },
    {
      title: "Client Status",
      dataIndex: "ClientStatus",
      key: "ClientStatus",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      key: "StartDate",
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      key: "EndDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Change Actions</a>
          <a onClick={() => statusModalShow(record)}>Add Status</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Osama",
      ProjectName:"TechXperts",
      ProjectCode : "0001",
      InHouseStatus : "Hold",
      ClientStatus : "Pending Review",
      StartDate : "1-Jan-24",
      EndDate:"10-Jan-2024",
      // tags: ["", "developer"],
    },
    {
      key: "1",
      name: "Ahmad",
      ProjectName:"DropMe",
      ProjectCode : "0002",
      InHouseStatus : "Pending Approval",
      ClientStatus : "Pending Review",
      StartDate : "1-Jan-24",
      EndDate:"10-Jan-2024",
      // tags: ["nice", "developer"],
    },
    {
      key: "1",
      name: "Ali",
      ProjectName:"CompostConnect",
      ProjectCode : "0003",
      InHouseStatus : "Reviewed",
      ClientStatus : "Approved",
      StartDate : "1-Jan-24",
      EndDate:"10-Jan-2024",
      // tags: ["nice", "developer"],
    },
    {
      key: "1",
      name: "Jibran",
      ProjectName:"AquaRevive",
      ProjectCode : "0004",
      InHouseStatus : "Approved",
      ClientStatus : "Pending Review",
      StartDate : "1-Jan-24",
      EndDate:"10-Jan-2024",
      // tags: ["nice", "developer"],
    },
    {
      key: "1",
      name: "Askari",
      ProjectName:"LogiSync",
      ProjectCode : "0005",
      InHouseStatus : "Pending Review",
      ClientStatus : "Pending Review",
      StartDate : "1-Jan-24",
      EndDate:"10-Jan-2024",
      // tags: ["nice", "developer"],
    },
    {
      key: "1",
      name: "Abbas",
      ProjectName:"WebTech",
      ProjectCode : "0006",
      InHouseStatus : "In-Progress",
      ClientStatus : "Hold",
  
      StartDate : "1-Jan-24",
      EndDate:"10-Jan-2024",
      // tags: ["nice", "developer"],
    }
  ];
  const [statusModalVisible, setStatusModalVisible] = useState(false);
const [selectedStatus, setSelectedStatus] = useState("");
const statusModalShow = () => {
  setStatusModalVisible(true);
};

const statusModalCancel = () => {
  setSelectedStatus("");
  setStatusModalVisible(false);
};
const handleStatusChange = (selectedStatus) => {
  // Perform your logic to update the status here
  // You can use the selectedStatus along with the record data
  // to update the status in the data array or make an API call
  // After updating, close the modal using statusModalCancel()
  statusModalCancel();
};
  return <>
<Modal
  title="Change Status"
  width={400}
  centered
  visible={statusModalVisible}
  onCancel={statusModalCancel}
  footer={null}
  closeIcon={<RiCloseFill className="remix-icon text-color-black-100" size={24} />}
>
  <Row justify="space-between" align="center">
    <Col span={20}>
      <Form layout="vertical" name="basic">
        <Form.Item
          label="Select Status"
          name="selectedStatus"
          rules={[
            {
              required: true,
              message: "Please select a status",
            },
          ]}
        >
          <Select
            options={[
              { label: "On-going", value: "on-going" },
              { label: "Completed", value: "completed" },
              { label: "Pending", value: "pending" },
              // ... (add other status options)
            ]}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
          />
        </Form.Item>
        {/* ... (your existing code) */}
        <Row>
          <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={() => handleStatusChange(selectedStatus)}
            >
              Submit
            </Button>
          </Col>
          <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
            <Button block onClick={statusModalCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  </Row>
</Modal>
{user?.user?.roleId === 1 ? (
        <Table columns={columns} dataSource={data} />
      ) : (
        <div>
          <Divider />
          <p>You do not have permissions to view.</p>
        </div>
      )}
  
  </>;
}