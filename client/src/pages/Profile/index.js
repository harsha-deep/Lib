import React from "react";
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";
import Reports from "./Reports";
import { useSelector } from "react-redux";
import BasicDetails from "./BasicDetails";
import BorrowedBooks from "./BorrowedBooks/index";

const TabPane = Tabs.TabPane;

function Profile() {
  const { user } = useSelector((state) => state.users);
  const role = user.role;

  return (
    <div className="text-lg p-4">
      <Tabs
        className="text-sm font-mulis"
        defaultActiveKey="1"
      >
        <TabPane

          tab={<div className="custom-tab">General</div>}
          key="1"
        >
          <BasicDetails />
        </TabPane>

        {role === "patron" && (
          <TabPane tab={<div className="custom-tab">Books Borrowed</div>} key="2">
            <BorrowedBooks />
          </TabPane>
        )}

        {role !== "patron" && (
          <TabPane tab={<div className="custom-tab">Books</div>} key="3">
            <Books />
          </TabPane>
        )}
        {role !== "patron" && (
          // <TabPane tab="Patrons" key="4">
          <TabPane tab={<div className="custom-tab">Students</div>} key="4">
            <Users role="patron" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab={<div className="custom-tab">Librarians</div>} key="5">
            <Users role="librarian" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab={<div className="custom-tab">Admins</div>} key="6">
            <Users role="admin" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab={<div className="custom-tab">Reports</div>} key="7">
            <Reports />
          </TabPane>
        )}
      </Tabs>
    </div >
  );
}

export default Profile;
