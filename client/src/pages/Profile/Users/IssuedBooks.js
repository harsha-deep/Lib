import React, { useEffect } from "react";
import { message, Modal, Table } from "antd";
import { GetIssues } from "../../../apicalls/issues";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import Button from "../../../components/Button";

function IssuedBooks({ showIssuedBooks, setShowIssuedBooks, selectedUser }) {
  const [issuedBooks, setIssuedBooks] = React.useState([]);
  const dispatch = useDispatch();
  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      let response;

      if (selectedUser.role === "patron") {
        response = await GetIssues({
          user: selectedUser._id,
        });
      } else {
        response = await GetIssues({
          issuedBy: selectedUser._id,
        });
      }

      dispatch(HideLoading());
      // console.log(response.data)
      if (response.success) {
        setIssuedBooks(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Book",
      dataIndex: "book",
      render: (book) => book.title,
    },
    {
      title: "Issued On",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Return Date (Due Date)",
      dataIndex: "returnDate",
      render: (dueDate) => moment(dueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Rent",
      dataIndex: "rent",
    },
    {
      title: "Fine",
      dataIndex: "fine",
    },
    {
      title: "Returned On",
      dataIndex: "returnedDate",
      render: (returnedDate) => {
        if (returnedDate) {
          return moment(returnedDate).format("DD-MM-YYYY hh:mm A");
        } else {
          return "Not Returned Yet";
        }
      },
    },
  ];
  return (
    <Modal
      open={showIssuedBooks}

      onCancel={() => setShowIssuedBooks(false)}
      footer={null}
      width={1400}
    >
      <h1 className="text-secondary mb-1 text-xl text-center font-bold">
        {selectedUser.name}'s Issued Books
      </h1>

      <Table columns={columns} dataSource={issuedBooks} />
    </Modal>
  );
}

export default IssuedBooks;