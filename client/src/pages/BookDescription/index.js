import { Col, message, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetBookById } from "../../apicalls/books";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import logger from "../../logger/logger";
import ModalImage from "react-modal-image";

function BookDescription() {
  const [bookData, setBookData] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getBook = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookById(id);
      dispatch(HideLoading());

      if (response.success) {
        setBookData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    bookData && (
      <div>
        <Row gutter={[16, 16]} align="middle" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="flex flex-col gap-2">
            <h1 className="text-2xl text-gray-600 font-bold mt-2">
              {bookData.title}
            </h1>
            <hr className="border-t-2 border-secondary" />
            <ModalImage
              small={bookData.image}
              large={bookData.image}
              alt={bookData.title}
            />
            <p className="text-xl">{bookData.description}</p>

            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Author</h1>
              <p className="text-xl">{bookData.author}</p>
            </div>

            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Publisher</h1>
              <p className="text-xl">{bookData.publisher}</p>
            </div>

            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Published Date</h1>
              <p className="text-xl">
                {moment(bookData.publishedDate).format("MMMM Do YYYY")}
              </p>
            </div>

            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Available Copies</h1>
              <p className="text-xl">{bookData.availableCopies}</p>
            </div>
          </Col>
        </Row>
        {isImagePopupOpen && (
          <ModalImage
            small={bookData.image}
            large={bookData.image}
            alt={bookData.title}
            onClose={() => setIsImagePopupOpen(false)}
          />
        )}
      </div>
    )
  );
}

export default BookDescription;
