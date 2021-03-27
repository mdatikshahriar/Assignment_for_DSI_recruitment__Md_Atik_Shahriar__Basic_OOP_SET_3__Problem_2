import React, { Component } from "react";
import { Alert, DropdownButton, Dropdown } from "react-bootstrap";
import ProductCard from "./ProductCard";
import axios from 'axios';
import querystring from "querystring";
import URL from '../URL';

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded_products: [],
      inputUrl: "",
      error: "",
      loading: false,
    };

    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(URL.product_api + "getProducts")
      .then((response) => {
        console.log("succeeded" );
        if (response.status === 200) {
          this.setState({
            loaded_products: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  onHandleChange(e) {
    this.setState({
      inputUrl: e.target.value
    });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    this.setState({
      error: "",
      loading: true
    });
    
    var self = this;
    
    axios.post(
      URL.product_api + "addProduct",
      querystring.stringify({
        url: self.state.inputUrl,
      })
    )
      .then(function (response) {
        if (response.status === 200) {
          console.log("succeeded 2");
          self.setState({
            inputUrl: "",
            loading: false
          });
          window.location.reload();
        } else if (response.status === 209){
          console.log("Failed! Duplicate entry.");
          self.setState({
            inputUrl: "",
            error: "This product already exist",
            loading: false
          });
        } else {
          console.log(response);
          self.setState({
            inputUrl: "",
            error: "Invalid url",
            loading: false
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          error: "Invalid url",
          loading: false
        });
      })
      .finally(function () {});
  };

  sortArrayAscendingPrice() {
    const sortProperty = 'price';
    const sorted = this.state.loaded_products.sort((a, b) => b[sortProperty] - a[sortProperty]);
    console.log(sorted);
    this.setState({loaded_products: sorted});
  };

  sortArrayDescendingPrice() {
    const sortProperty = 'price';
    const sorted = this.state.loaded_products.sort((a, b) => a[sortProperty] - b[sortProperty]);
    console.log(sorted);
    this.setState({loaded_products: sorted});
  };

  sortArrayAscendingDate() {
    const sortProperty = 'createdAt';
    const sorted = this.state.loaded_products.sort((a, b) => new Date(b[sortProperty]) - new Date(a[sortProperty]));
    console.log(sorted);
    this.setState({loaded_products: sorted});
  };

  sortArrayDescendingDate() {
    const sortProperty = 'createdAt';
    const sorted = this.state.loaded_products.sort((a, b) => new Date(a[sortProperty]) - new Date(b[sortProperty]));
    console.log(sorted);
    this.setState({loaded_products: sorted});
  };

  render() {
    return (
      <div className="overflow-hidden">
        <div className="container">
          <form className="d-flex mt-5" onSubmit={this.onSubmitForm}>
            <input
              type="url"
              name="url"
              className="form-control"
              placeholder="Enter a valid url of any Amazon product"
              value={this.state.inputUrl}
              onChange={this.onHandleChange}
              required
            />
            <div className="ml-2">
              {this.state.loading ? (
                <div class="spinner-border text-info" role="status">
                  <span class="sr-only" >Loading...</span>
                </div>
              ) : (
              <button type="submit" className="btn btn-success"> Add </button>
              )}
            </div>
          </form>
          {this.state.error ? (
            <Alert className="mt-2" variant="danger" onClose={() => this.setState({error: ""})} dismissible>
              {this.state.error}
            </Alert>
          ) : (
            <div />
          )}
          <DropdownButton id="dropdown-basic-button" className="mt-5" title="Sort">
            <Dropdown.Item onClick={() => this.sortArrayAscendingPrice()}>Price - Ascending</Dropdown.Item>
            <Dropdown.Item onClick={() => this.sortArrayDescendingPrice()}>Price - Descending</Dropdown.Item>
            <Dropdown.Item onClick={() => this.sortArrayAscendingDate()}>Date - Ascending</Dropdown.Item>
            <Dropdown.Item onClick={() => this.sortArrayDescendingDate()}>Date - Descending</Dropdown.Item>
          </DropdownButton>
          <div className="row mt-5">
            <h2>Products</h2>
            <div className="row">
              {this.state.loaded_products.map((product) => (
                <ProductCard
                  size="col-md-3"
                  id={product.id}
                  name={product.name}
                  url={product.url}
                  img_url={product.img_url}
                  price={product.price}
                />
              ))}
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
