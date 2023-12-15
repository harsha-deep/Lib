import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import moment from "moment";
import { GetAllUsers } from "../../../apicalls/users";
import Button from "../../../components/Button";
import IssuedBooks from "./IssuedBooks";
import logger from "../../../logger/logger";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function Users({ role }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      console.log(response)
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const buttonStyle = "text-white bg-primary hover:bg-primary-dark";

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "text-gray-800 text-base",
      render: (name) => capitalizeFirstLetter(name),
    },
    {
      title: "Id",
      dataIndex: "_id",
      className: "text-gray-600 text-base",
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "text-gray-800 text-base",
      render: (email) => (
        <a href={`mailto:${email}`} className="">
          {email.toLowerCase()}
        </a>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      className: "text-base",
      render: (phone) => (
        <a href={`tel:${phone}`} className="text-md">
          {phone}
        </a>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
      className: "text-indigo-800 text-base",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      className: "text-gray-800 text-base",
      render: (actions, record) => (
        <div>
          <Button
            title="Books"
            variant="outlined"
            onClick={() => {
              setSelectedUser(record);
              setShowIssuedBooks(true);
            }}
            className={buttonStyle}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} />

      {showIssuedBooks && (
        <IssuedBooks
          showIssuedBooks={showIssuedBooks}
          setShowIssuedBooks={setShowIssuedBooks}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}

export default Users;
