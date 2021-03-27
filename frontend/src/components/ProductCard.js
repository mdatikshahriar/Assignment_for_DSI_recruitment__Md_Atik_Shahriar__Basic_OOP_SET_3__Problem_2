import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import URL from '../URL';

export default function ProductCard(props) {

  const [show, setShow] = useState(false);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(URL.product_api + "deleteProduct", { data: { id: id } })
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
  };

  const handleClose = () => setShow(false);
  
  const handleShow = () => setShow(true);

  return (
    <div className={props.size}>
      <div className="mm-product-card">
        <button type="button" onClick={() => handleShow()} class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <Modal show={show} onHide={() => handleClose()}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body closeButton>Do you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleDelete(props.id)}>
              Yes
            </Button>
            <Button variant="primary" onClick={() => handleClose()}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <a href={props.url} target="_blank" rel="noreferrer">
          <div className="mm-card-image">
            <img
              src={
                props.img_url ||
                "https://madebyloop.co.uk/images/products/slider/memphis/memphis-pattern-animated.gif"
              }
              alt={""}
            />
          </div>
          <div className="mm-card-content">
            <h5 className="text-center text-dark">{props.name}</h5>
            <h6 className="text-center text-danger">
              <small>
                ৳ {props.price}
              </small>
            </h6>
          </div>
        </a>
      </div>
    </div>
  );
}