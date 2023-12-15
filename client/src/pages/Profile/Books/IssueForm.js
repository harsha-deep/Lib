import { Modal, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../apicalls/axiosInstance";

import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { EditIssue, IssueBook, get_id_by_email } from "../../../apicalls/issues";
import { GetUserById } from "../../../apicalls/users";
import logger from "../../../logger/logger";
const baseUrl = process.env.REACT_APP_BASE_URL;
function IssueForm({
  open = false,
  setOpen,
  selectedBook,
  setSelectedBook,
  getData,
  selectedIssue,
  type,
}) {
  const { user } = useSelector((state) => state.users);
  const [validated, setValidated] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [patronData, setPatronData] = useState(null);
  const [patronId, setPatronId] = React.useState(
    type === "edit" ? selectedIssue.user._id : ""
  );
  const [patronEmail, setPatronEmail] = useState("");
  const [returnDate, setReturnDate] = React.useState(
    type === "edit" ? moment(selectedIssue.returnDate).format("YYYY-MM-DD") : ""
  );
  const dispatch = useDispatch();

  const validate = async () => {
    try {
      dispatch(ShowLoading());

      const response = await get_id_by_email({ email: patronEmail });

      if (response.success) {
        if (response.userId && response.role === "patron") {
          setPatronData(response);
          setPatronId(response.userId)
          setValidated(true);
          setErrorMessage("");
        } else {
          setValidated(false);
          setErrorMessage("This user is not a patron");
        }
      } else {
        setValidated(false);
        setErrorMessage(response.message);

      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      setValidated(false);
      setErrorMessage(error.message);
    }
  };

  const onIssue = async () => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type !== "edit") {

        response = await IssueBook({
          book: selectedBook._id,
          user: patronId,
          issueDate: new Date(),
          returnDate,
          rent:
            moment(returnDate).diff(moment(), "days") *
            selectedBook?.rentPerDay,
          fine: 0,
          issuedBy: user._id,
        });
      } else {
        response = await EditIssue({
          book: selectedBook._id,
          user: patronData._id,
          issueDate: selectedIssue.issueDate,
          returnDate,
          rent:
            moment(returnDate).diff(moment(), "days") *
            selectedBook?.rentPerDay,
          fine: 0,
          issuedBy: user._id,
          _id: selectedIssue._id,
        });
      }
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        // logger.info("Issue success " + selectedBook._id)
        getData();
        setPatronId("");
        setReturnDate("");
        setValidated(false);
        setErrorMessage("");
        setSelectedBook(null);
        setOpen(false);
      } else {
        // logger.error("issue edit/add failed " + response.messages)
        message.error(response.message);
      }
    } catch (error) {
      // logger.error("issue edit/add failed " + error.messages)
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const GetUserBy_Id = async (id) => {

    try {
      const response = await axiosInstance.get(baseUrl + `/api/users/get-user-by-id/${id}`);
      console.log(response.data.data.email)
      setPatronEmail(response.data.data.email)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (type === "edit") {

      GetUserBy_Id(selectedIssue.user._id);
      validate();
    }
  }, [open]);


  return (
    <Modal
      title=""
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-secondary font-bold text-2xl uppercase text-center">
          {type === "edit" ? "Edit / Renew Issue" : "Issue Book"}
        </h1>

        <div className="flex flex-col mb-4">
          <label htmlFor="patronEmail" className="text-gray-700">
            Student Email
          </label>
          <input
            id="Sudent Email"
            type="email"
            value={patronEmail}

            placeholder="Patron Email"
            disabled={type === "edit"}
            className="input-field"
            onChange={(e) => setPatronEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="returnDate" className="text-gray-700">
            Return Date
          </label>
          <input
            id="returnDate"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            placeholder="Return Date"
            min={moment().format("YYYY-MM-DD")}
            className="input-field"
          />
        </div>

        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}

        {validated && (
          <div className="bg-secondary p-4 text-black rounded">
            <h1 className="text-md">Patron: {patronData.name}</h1>
            <h1 className="text-md">
              Number Of Days: {moment(returnDate).diff(moment(), "days")}
            </h1>
            <h1 className="text-md">Rent per Day: {selectedBook.rentPerDay}</h1>
            <h1 className="text-md">
              Rent:{" "}
              {moment(returnDate).diff(moment(), "days") *
                selectedBook?.rentPerDay}
            </h1>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            title="Cancel"
            variant="outlined"
            onClick={() => setOpen(false)}
          />
          {type === "add" && (
            <Button
              title="Validate"
              disabled={patronEmail === "" || returnDate === ""}
              onClick={validate}
            />
          )}
          {validated && (
            <Button
              title={type === "edit" ? "Edit" : "Issue"}
              onClick={onIssue}
              disabled={patronEmail === "" || returnDate === ""}
            />
          )}
        </div>
      </div>
    </Modal>

  );
}

export default IssueForm;
