import React, { useState } from 'react';
import { Table, Checkbox } from 'antd';

const columns = [
  {
    title: 'Sr.#',
    dataIndex: 'code', // Assuming 'code' is the appropriate field for 'Sr.#'
    key: 'code',
  },
  {
    title: 'DOCUMENT TITLE (Pre-Loaded)',
    dataIndex: 'documentTitle',
    key: 'documentTitle',
  },
  {
    title: 'Additional Assigned',
    dataIndex: 'additionalAssigned',
    key: 'additionalAssigned',
  },
  {
    title: 'Area Code',
    dataIndex: 'areaCode',
    key: 'areaCode',
  },
  {
    title: 'Department Code',
    dataIndex: 'departmentCode',
    key: 'departmentCode',
  },
  {
    title: 'Document Content Code',
    dataIndex: 'documentContentCode',
    key: 'documentContentCode',
  },
  {
    title: 'Sequence Number',
    dataIndex: 'sequenceNumber',
    key: 'sequenceNumber',
  },
  {
    title: 'DOCUMENT NUMBER',
    dataIndex: 'document',
    key: 'document',
  },
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
    render: (_, record) => (
      <Checkbox onChange={() => handleSelect(record)} />
    ),
  },
];


const data = [
  // Add your data here
    // Section A: PROJECT MANAGEMENT
    { category: 'PROJECT MANAGEMENT', code: 'A', documentTitle: 'Scope of Work', additionalAssigned: 'e.g. Only for 5 kT Storage Tank Construction', areaCode: '01', departmentCode: 'PM', documentContentCode: 'SOW', sequenceNumber: '00X', document: '2014-01-PM-SOW-00X' },
  { category: 'PROJECT MANAGEMENT', code: 'A.1', documentTitle: 'Scope of Work', areaCode: '01', departmentCode: 'PM', documentContentCode: 'SOW', sequenceNumber: '00X', document: '2014-01-PM-SOW-00X' },
  { category: 'PROJECT MANAGEMENT', code: 'A.2', documentTitle: 'Specification', areaCode: '01', departmentCode: 'PM', documentContentCode: 'SP', sequenceNumber: '00X', document: '2014-01-PM-SP-00X' },
  { category: 'PROJECT MANAGEMENT', code: 'A.3', documentTitle: 'Report', areaCode: '01', departmentCode: 'PM', documentContentCode: 'REP', sequenceNumber: '00X', document: '2014-01-PM-REP-00X' },
  // ... (repeat for other items in section A)

  // Section B: PROCESS
  { category: 'PROCESS', code: 'B', documentTitle: 'Scope of Work', areaCode: '01', departmentCode: 'PRO', documentContentCode: 'SOW', sequenceNumber: '00X', document: '2014-01-PRO-SOW-00X' },
  { category: 'PROCESS', code: 'B.1', documentTitle: 'Scope of Work', areaCode: '01', departmentCode: 'PRO', documentContentCode: 'SOW', sequenceNumber: '00X', document: '2014-01-PRO-SOW-00X' },
  { category: 'PROCESS', code: 'B.2', documentTitle: 'Specification', areaCode: '01', departmentCode: 'PRO', documentContentCode: 'SP', sequenceNumber: '00X', document: '2014-01-PRO-SP-00X' },
  { category: 'PROCESS', code: 'B.3', documentTitle: 'Report', areaCode: '01', departmentCode: 'PRO', documentContentCode: 'REP', sequenceNumber: '00X', document: '2014-01-PRO-REP-00X' },
  // ... (repeat for other items in section B)

  // Section C: MECHANICAL (PIPING)
  { category: 'MECHANICAL (PIPING)', code: 'C', documentTitle: 'Scope of Work', areaCode: '01', departmentCode: 'PIP', documentContentCode: 'SOW', sequenceNumber: '00X', document: '2014-01-PIP-SOW-00X' },
  { category: 'MECHANICAL (PIPING)', code: 'C.1', documentTitle: 'Scope of Work', areaCode: '01', departmentCode: 'PIP', documentContentCode: 'SOW', sequenceNumber: '00X', document: '2014-01-PIP-SOW-00X' },
  { category: 'MECHANICAL (PIPING)', code: 'C.2', documentTitle: 'Specification', areaCode: '01', departmentCode: 'PIP', documentContentCode: 'SP', sequenceNumber: '00X', document: '2014-01-PIP-SP-00X' },
  { category: 'MECHANICAL (PIPING)', code: 'C.3', documentTitle: 'Report', areaCode: '01', departmentCode: 'PIP', documentContentCode: 'REP', sequenceNumber: '00X', document: '2014-01-PIP-REP-00X' },
    { category: 'PROJECT MANAGEMENT', code: 'A.1', documentTitle: 'Scope of Work', areaCode: '01',departmentCode: 'PM',documentContentCode: 'SOW',sequenceNumber: '00X', document: '2014-01-PM-SOW-00X' },
    { category: 'PROJECT MANAGEMENT', code: 'A.2', documentTitle: 'Specification', codeDetails: '01 PM SP 00X', document: '2014-01-PM-SP-00X' },
    // ... (repeat for other items in section A)
  
    // Section B: PROCESS
    { category: 'PROCESS', code: 'B.1', documentTitle: 'Scope of Work', codeDetails: '01 PRO SOW 00X', document: '2014-01-PRO-SOW-00X' },
    // ... (repeat for other items in section B)
  
    // Section C: MECHANICAL (PIPING)
    { category: 'MECHANICAL (PIPING)', code: 'C.1', documentTitle: 'Scope of Work', codeDetails: '01 PIP SOW 00X', document: '2014-01-PIP-SOW-00X' },
    // ... (repeat for other items in section C)
  
    // ... (repeat for other sections)
  ];


  const MdrTemplate = () => {
    const [selectedRows, setSelectedRows] = useState([]);
  
    const handleSelect = (record) => {
      const isSelected = selectedRows.includes(record.key);
      if (isSelected) {
        setSelectedRows(selectedRows.filter((rowKey) => rowKey !== record.key));
      } else {
        setSelectedRows([...selectedRows, record.key]);
      }
    };
  

  return (
    <div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
        <h1>Company Environment Setup</h1>
      </div>
      <h2>MDR Template</h2>
      <Table
        columns={columns}
        dataSource={data.map((item, index) => ({ ...item, key: index }))}
        rowSelection={{
          selectedRowKeys: selectedRows,
          onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
        }}
      />
      <div style={{ marginTop: '16px' }}>
        Selected Rows: {selectedRows.join(', ')}
      </div>
    </div>
  );
};

export default MdrTemplate;