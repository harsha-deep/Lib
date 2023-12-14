import { Col, message, Row, Table, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteBook, GetAllBooks } from "../../apicalls/books";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import logger from "../../logger/logger";
function Home() {
  const [books, setBooks] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
        // logger.info("Got all book details,Success")
      } else {
        // logger.error("Get all book details by details failed " + response.message)
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div className="mt-3">
      <div style={{ gap: '2px' }} className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-3 pl-10 pt-4">
        {books.map((book) => (
          <div
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
            className="cursor-pointer group rounded bg-white p-4  shadow  gap-1 transform transition duration-300 hover:scale-105 w-full sm:w-full md:w-full lg:w-8/12 xl:w-10/12"
          >
            <div className="relative">
              <Badge.Ribbon
                text={book.availableCopies > 0 ? "Available" : "Not Available"}
                color={book.availableCopies > 0 ? "green" : "red"}
              />
              <img src={book.image} alt={book.title} className="h-96 object-cover w-full rounded" />
            </div>
            <h1 className="text-lg text-secondary font-bold mt-2">
              {book.title}
            </h1>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );


}

export default Home;
