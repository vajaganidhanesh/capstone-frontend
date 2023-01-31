import { useRef } from "react";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "./email";

import Header from "../components/header";

function CreateItem() {
  let loginDetails = useRef(
    JSON.parse(localStorage.getItem("rest_login_details"))
  );
  let navigate = useNavigate();
  let form = useRef();
  let items = new FormData();
  let name = useRef();
  let price = useRef();
  let stock = useRef();
  let quality = useRef();
  let description = useRef();
  let file = useRef();
  let error = useRef();
  let message = useRef();
  let inputForm1 = useRef();
  let inputForm2 = useRef();
  let inputForm3 = useRef();
  let inputForm4 = useRef();
  let inputForm5 = useRef();

  let inputs = [name, price, stock, quality, description, file];
  let inputForms = [inputForm1, inputForm2, inputForm3, inputForm4, inputForm5];

  items.append("restaurant", loginDetails.current.userid);

  function readValue(property, value) {
    items.append(property, value);
    console.log(items);
  }

  function itemcreation() {
    fetch("http://localhost:8000/items/create", {
      method: "POST",
      headers: {
        authorization: `Bearer ${loginDetails.current.token}`,
      },
      body: items,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          navigate("/allitems");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function inputErrorMessage(message, input, text) {
    message.current.style.marginLeft = "0%";
    input.current.style.border = "1px solid red";
    message.current.innerText = text;
  }

  function loginDetail() {
    if (items.name !== undefined || items.price !== undefined) {
      if (!emailRegex.test(items.name)) {
        let name = "please enter cusine name";
        inputErrorMessage(name, inputForm1, name);
        inputError(name, inputForm1);
      } else if (items.description.length < 6) {
        let description = "enter about the cusine";
        inputErrorMessage(description, inputForm4, description);
        inputError(description, inputForm4);
      } else {
        console.log("call login function");
        itemcreation();
      }
    } else {
      let null_message = "Please provide the details!...";
      errorMessage(null_message);

      setTimeout(() => {
        moveSlider();
      }, 5000);
    }
  }

  function errorMessage(null_message) {
    error.current.style.left = "0%";
    error.current.style.color = "red";
    message.current.innerText = null_message;
    error.current.style.backgroundColor = "#fb000026";

    inputForms.map((val, index) => {
      return (val.current.style.border = "1px solid red");
    });

    inputs.map((value, index) => {
      return (value.current.style.marginLeft = "0%");
    });
  }

  function moveSlider() {
    error.current.style.left = "100%";
    inputForms.map((val) => {
      return (val.current.style.border = "1px solid transparent");
    });
    inputs.map((value, index) => {
      return (value.current.style.marginLeft = "100%");
    });
  }

  function inputError(message, input) {
    setTimeout(() => {
      message.current.style.marginLeft = "100%";
      input.current.style.border = "1px solid transparent";
    }, 5000);
  }

  return (
    <>
      <Header />

      <div className="notification" id="notification" ref={error}>
        <div className="notification_message">
          <div ref={message}></div>

          <div className="messageIcon">
            <i id="messageIcon" className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
      <div className="rest_main_class rest_main_login_class">
        <div className="restaurant_image landpage_image restaurant_login">
          <img src="../assets/cooking.svg" alt="uploadimage" />
        </div>

        <div className="restaurant_authentication">
          <div className="landpage_container">
            <h3>Post your cusine or dish details</h3>
            <div className="restaurant_container">
              <form ref={form} className="restaurant_login_form">
                <div>
                  <input
                    className="input_field"
                    type="text"
                    placeholder="enter name of the dish"
                    onChange={(event) => {
                      readValue("name", event.target.value);
                    }}
                    ref={inputForm1}
                  />
                  <small ref={name}>enter valid name</small>
                </div>

                <div>
                  <input
                    className="input_field"
                    type="number"
                    placeholder="enter food quantity"
                    required
                    onChange={(event) => {
                      readValue("quantity", event.target.value);
                    }}
                    defaultValue={1}
                  />
                  <small ref={quality}>enter valid number</small>
                </div>

                <div>
                  <input
                    className="input_field"
                    type="number"
                    placeholder="enter price"
                    required
                    onChange={(event) => {
                      readValue("price", event.target.value);
                    }}
                    ref={inputForm2}
                  />
                  <small ref={price}>enter valid price</small>
                </div>

                <div>
                  <input
                    className="input_field"
                    type="number"
                    placeholder="enter available stock"
                    required
                    onChange={(event) => {
                      readValue("stock", event.target.value);
                    }}
                    ref={inputForm3}
                  />
                  <small ref={stock}>enter valid stock</small>
                </div>

                <div>
                  <input
                    className="input_field"
                    type="text"
                    placeholder="enter item description"
                    required
                    onChange={(event) => {
                      readValue("description", event.target.value);
                    }}
                    ref={inputForm4}
                  />
                  <small ref={description}>enter valid description</small>
                </div>

                <div>
                  <input
                    className="input_field"
                    type="file"
                    placeholder="enter item pic"
                    required
                    onChange={(event) => {
                      readValue("picture", event.target.files[0]);
                    }}
                    ref={inputForm5}
                  />
                  <small ref={file}>please upload img</small>
                </div>

                <div className="btns_restaurant">
                  <button
                    type="button"
                    className="button button_iw"
                    onClick={() => {
                      loginDetail();
                    }}
                  >
                    createItem
                  </button>
                </div>
              </form>

              <div className="signup_footer">
                <p>lets check the your items..</p>
                <span
                  onClick={() => {
                    navigate("/allitems");
                  }}
                >
                  Items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateItem;
