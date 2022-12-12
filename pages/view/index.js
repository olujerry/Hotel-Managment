import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Home = () => {
  const [room_name, setroomname] = useState();
  const [room_price, setroomprice] = useState();
  const [room_description, setroomdescription] = useState();
  const [email, setEmail] = useState("");
  const [bookdate, setBookdate] = useState("");
  const [checkout_date, setCheckout_date] = useState("");
  const [sub, setsub] = useState("");
  const { query } = useRouter();
  const router = useRouter();

  const getsurvey = async (value) => {
    let Tasks = await axios.get("http://localhost:1337/api/rooms/" + value);

    setroomname(Tasks.data.data.attributes.roomName);
    setroomprice(Tasks.data.data.attributes.roomPrice);
    setroomdescription(Tasks.data.data.attributes.roomDescription);
  };
  getsurvey(query.id);

  function subbmit() {
    // alert(fullname);
    console.log(room_price);
    if (
      room_name != "" &&
      room_price != "" &&
      room_description != "" &&
      email != "" &&
      bookdate != "" &&
      checkout_date != ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            RoomName: room_name,
            RoomID: query.id,
            BookDate: bookdate,
            AmountPaid: room_price,
            CheckoutDate: checkout_date,
            Email: email,
          },
        }),
      };
      fetch("http://localhost:1337/api/check-ins", requestOptions).then(
        (response) => response.json()
      );
      alert("Registration Successful...");
      router.push("/view/dashboard");
    }
  }

  useEffect(() => {
    subbmit();
  }, [sub]);

  return (
    <div className="contner">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

      <main>
        <div className="menu">
          <a href="./">
            <span className="title1">MyHotelBook</span>
          </a>
          <a href="view/login">
            <span className="title2">Login</span>
          </a>
          <a href="view/register">
            <span className="title2">Register</span>
          </a>
        </div>
        <div className="menu2"></div>
        <br />
        <br />
        <center>
          <h2>Check Out</h2>
        </center>
        <div className="preview">
          <br />
          <div className="show">
            <img
              className="img"
              src="https://raw.githubusercontent.com/popoolatopzy/hotel/main/1.jpeg"
            />
            <br />
            <center>
              <h2>{room_name}</h2>
            </center>
            <br />
            <span>{room_description}</span>
          </div>

          <div className="checkout">
            <h3>Book Now</h3>

            <form className="wid">
              <div className="form-group">
                <label for="usr">
                  Price Per Night: <strong> ${room_price}</strong>
                </label>
              </div>
              <br />
              <div className="form-group">
                <label for="usr">Check In Day:</label>
                <input
                  type="date"
                  className="form-control"
                  id="usr"
                  defaultValue=""
                  onChange={(event) => setBookdate(event.target.value)}
                />
              </div>{" "}
              <br />
              <div className="form-group">
                <label for="usr">Check Out Day:</label>
                <input
                  type="date"
                  className="form-control"
                  defaultValue=""
                  id="usr"
                  onChange={(event) => setCheckout_date(event.target.value)}
                />
              </div>{" "}
              <br />
              <div className="form-group">
                <label for="usr">Enter Email:</label>
                <input
                  type="email"
                  defaultValue=""
                  className="form-control"
                  placeholder="Enter your registered email"
                  id="usr"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="button"
                  className="form-control btn-info"
                  value="Pay now"
                  onClick={(event) => setsub("enter")}
                />
              </div>
              <br />
            </form>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .menu {
          position: fixed;
          width: 100%;
          height: 70px;
          background-color: #084298;
        }
        .menu2 {
          width: 100%;
          height: 70px;
        }
        .title1 {
          font-size: 25px;
          color: white;
          margin-top: 20px;
          margin-left: 60px;
        }
        .title2 {
          font-size: 25px;
          color: white;
          //   margin-top: 20px;
          margin-right: 60px;
          float: right;
        }

        .preview {
          height: 600px;
          width: 100%;
        }
        .show {
          margin-left: 20px;
          max-width: 420px;
          height: 600px;
          margin-top: 10px;
          float: left;
        }
        .img {
          margin-left: 20px;
          max-height: 270px;
          border-radius: 10px;
        }
        .hide {
          height: 300px;
          width: 100%;
        }
        .checkout {
          height: 300px;
          width: 40%;
          float: right;
          margin-right: 20px;
        }
        .wid {
          width: 300px;
        }
      `}</style>
    </div>
  );
};

export default Home;
