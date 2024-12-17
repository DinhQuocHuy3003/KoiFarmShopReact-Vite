import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import useStore from '../../../app/store';

function AccountManagement() {
    const getAllAccounts = useStore((state) => state.getAllAccounts);

    const accountList = useStore((state) => state.accountList);
    useEffect(() => {
        getAllAccounts();
    }, [])

  return (
    <>
      <ToastContainer />
      <div>
        {userRole === "Manager" ? (
          <>
            <h1 className="section-title">Manage Accounts</h1>

            <Input
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: "20px", width: "30%" }}
            />

            <Table
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                total: filteredData.length,
              }}
            />
          </>
        ) : (
          <h2 style={{ color: "red" }}>
            You are not authorized to access this page.
          </h2>
        )}

        {/* Role Modal */}
        <Modal
          title="Account Roles"
          open={roleModalVisible}
          onCancel={() => setRoleModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setRoleModalVisible(false)}>
              Close
            </Button>,
          ]}
        >
          <Table
            columns={[
              { title: "Role ID", dataIndex: "roleId" },
              { title: "Role Name", dataIndex: "name" },
              {
                title: "Is Disabled",
                dataIndex: "isDisabled",
                render: (isDisabled) => (isDisabled ? "Yes" : "No"),
              },
            ]}
            dataSource={selectedRoles}
            rowKey="roleId"
            pagination={false}
          />
        </Modal>
      </div>
    </>
  );
}

export default AccountManagement;