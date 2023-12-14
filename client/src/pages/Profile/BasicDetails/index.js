import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

function BasicDetails() {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="rounded bg-secondary text-black flex flex-col p-2 w-2/5">
      <div className="flex justify-between">
        <h1 className="text-base">Name</h1>
        <h1 className="text-base">{user.name}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-base">Email</h1>
        <h1 className="text-base">{user.email}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-base">Phone</h1>
        <h1 className="text-base">{user.phone}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-base">Role</h1>
        <h1 className="text-base uppercase">{user.role}</h1>
      </div>

      <div className="flex justify-between">
        <h1 className="text-base">Registered On</h1>
        <h1 className="text-base">
          {moment(user.createdAt).format("MMM Do YYYY, h:mm a")}
        </h1>
      </div>
    </div>
  )
}

export default BasicDetails;
