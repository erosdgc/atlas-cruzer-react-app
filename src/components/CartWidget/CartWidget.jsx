import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { TbLocation } from "react-icons/tb";
import "./CartWidget.css";

const CartWidget = () => {
  const { cart, deleteOne, deleteAll, totalUnities } = useContext(CartContext);
  const unities = totalUnities();

  if (unities === 0) {
    return (
      <div
        className="nav-item cart list-unstyled dropdown-toggle"
        type="button"
        id="cartEmptyWidget"
        aria-expanded="false"
      >
        <Link to="/pre-checkout">
          <TbLocation className="nav-link link-icon dropdown fs-5"></TbLocation>
        </Link>
        <div className="cartEmptyWidget dropdown-menu dropdown-menu-end dropdown-menu-light rounded-0 border-0 bg-tr fade-down shadow-sm bg-blur mt-2">
          <p className=" fs-6 inter-font text-bolder text-center px-4 mt-3">
            No cruises selected.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="nav-item cart list-unstyled dropdown-toggle"
        type="button"
        id="cartWidgetDropdown"
        aria-expanded="false"
      >
        <Link to="/pre-checkout">
          <TbLocation className="nav-link link-icon dropdown fs-5"></TbLocation>
        </Link>
        <div className="position-absolute unities roboto-font">{unities}</div>
        <div className="cartWidgetContainer dropdown-menu dropdown-menu-end dropdown-menu-light rounded-0 border-0 bg-tr fade-down shadow-sm bg-blur mt-2">
          <p className="lead fs-3 inter-font border-bottom border-secondary-subtle text-center p-4">
            Selected cruises:
          </p>
          {cart.map((cruise) => (
            <div
              key={cruise.id}
              aria-labelledby="cartWidgetDropdown"
              role="menu"
            >
              <div className="d-flex flex-column justify-content-center align-items-center px-4 py-3 my-2 border-bottom border-secondary-subtle">
                <h2 className="lead fs-3 inter-font">
                  <Link
                    to={`/detail/${cruise.id}`}
                    className="text-decoration-none"
                  >
                    {cruise.title}
                  </Link>
                </h2>
                <p className="lead fs-6 inter-font my-2 travelers">
                  {cruise.quantity}
                  <span>
                    {" "}
                    {cruise.quantity !== 1 ? "travelers" : "traveler"}
                  </span>
                </p>
                <div className="mt-3"></div>
                <div>
                  <button
                    className="px-3 py-5 btn x-btn btn-danger rounded-0 hover-shadow text-light border-0 remove-cruise text-uppercase"
                    onClick={() => {
                      deleteOne(cruise.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex flex-column align-items-center my-4">
            <button
              className="px-3 py-3 btn x-btn btn-primary rounded-0 hover-shadow text-light border-0 remove-cruise text-uppercase"
              onClick={deleteAll}
            >
              Delete All
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default CartWidget;
