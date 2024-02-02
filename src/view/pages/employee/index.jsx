// EmployeeForm.js
import React from 'react';
import { Form, Input, Select, Button,message } from 'antd';
import { useHistory } from 'react-router-dom'; 
import { useState } from 'react';
import { AddUser } from 'react-iconly';
import axios from "axios";

const { Option } = Select;

const EmployeeForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [roleId, setRole] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubmit = () => {
    form.validateFields().then((values) => {
        addUser()
      onSubmit(values);
      form.resetFields();
    });
  };
  const [mdrTemplateVisible, setMdrTemplateVisible] = useState(false);

  const showMdrTemplate = () => {
    setMdrTemplateVisible(true);
  };

  const hideMdrTemplate = () => {
    setMdrTemplateVisible(false);
  };
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));
  const addUser = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8083/api/users`,
        {
          email,
          firstName,
          lastName,
          roleId,
          companyId:user?.user?.companyId
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
  
    } catch (error) {
      // Handle errors
      console.error("Error adding user:", error);
      // message.error("Error adding user");
    }
  };
  const history = useHistory();
  const navigateToMdrTemplate = () => {
    history.push('/pages/config_document_number'); // Replace '/path-to-mdr-template' with the actual route path to the MDR Template component
};
const handleRoleChange = (value) => {
  // Set the role based on the selected designation
  switch (value) {
    case "Head":
      setRole("2");
      break;
    case "Senior":
      setRole("3");
      break;
    case "Junior":
      setRole("4");
      break;
    case "Designer":
      setRole("5");
      break;
    default:
      setRole("");
      break;
  }
};
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div style={{ textAlign: 'center', marginTop: 20 }}>
        <h2>Add Employees</h2>
      </div>
      <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
        <Input 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
        <Input 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input   value={email}
              onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <Form.Item name="designation" label="Designation" rules={[{ required: true }]}>
        <Select onChange={handleRoleChange}>
          <Option value="Head">Head of Dept</Option>
          <Option value="Senior">Senior Engineer</Option>
          <Option value="Junior">Junior Engineer</Option>
          <Option value="Designer">Designer</Option>
        </Select>
      </Form.Item>
      <Form.Item name="department" label="Department" rules={[{ required: true }]}>
        <Select>
          <Option value="Project Management">Project Management</Option>
          <Option value="Process">Process</Option>
          <Option value="Mechanical">Mechanical</Option>
          <Option value="Electrical">Electrical</Option>
          <Option value="Instrumentation">Instrumentation</Option>
          <Option value="Civil">Civil / Structure</Option>
          <Option value="Finance">Finance</Option>
          <Option value="HR">HR / Admin</Option>
          <Option value="Quality">Quality</Option>
        </Select>
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
  <Button type="primary" htmlType="submit">
    Add Employee
  </Button>
</Form.Item> <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button type="primary" htmlType="submit" onClick={navigateToMdrTemplate}>
          Proceed
        </Button>
      </div>

      {mdrTemplateVisible && <MdrTemplate />}
    </Form>
  );
};

export default EmployeeForm;
// OrganizationChart.js
