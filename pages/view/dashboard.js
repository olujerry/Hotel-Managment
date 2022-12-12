import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Home = ({ rooms, error }) => {
  const router = useRouter();
  //   const [rooms, setRooms] = useState();
  function checkelogin() {
    console.log(localStorage.getItem("userID"));
    if (localStorage.getItem("userID") == "null") {
      router.push("/view/login");
    }
  }

  useEffect(() => {
    checkelogin();
  }, []);

  return (
    <div className="contner">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

      <main>
        <div className="menu">
          <a href="/">
            <span className="title1">MyHotel</span>
          </a>
          <a href="/view/dashboard">
            <span className="title2">Account</span>
          </a>
        </div>
        <div className="menu2"></div>

        <br />
        <br />
        <br />
        <br />
        <div className="preview">
          <br />
          <div className="show">
            <img
              className="img"
              src="https://raw.githubusercontent.com/popoolatopzy/hotel/main/1.jpeg"
            />
            <br />
            <center>
              <h2>Jerry Oluseye</h2>

              {/* <br /> */}
              <span> Oluseye@gmail.com</span>
            </center>
          </div>

          <div className="checkout">
            <h3>Checked Rooms</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  {/* <th>Ticket ID</th> */}
                  <th>Room Name</th>
                  <th>Chect Out Date</th>
                  <th>Price</th>
                  {/* <th>Email</th> */}
                </tr>
              </thead>
              <tbody>
                {rooms.data.map((checkin) => (
                  <tr>
                    <td>{checkin.attributes.RoomName}</td>
                    <td>{checkin.attributes.CheckoutDate}</td>
                    <td>${checkin.attributes.AmountPaid}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br />
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
          width: 560px;
          height: 600px;
          margin-top: 10px;
          float: left;
          //  margin-right: 20px;
          // background-color: red;
        }
        .img {
          margin-left: 200px;
          height: 100px;
          width: 100px;
          border-radius: 100%;
        }
        .hide {
          height: 300px;
          width: 100%;
        }
        .checkout {
          height: 300px;
          width: 50%;
          float: right;
          //   background-color: red;
          margin-right: 60px;
        }
        .wid {
          width: 300px;
        }
      `}</style>
    </div>
  );
};
Home.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get("http://localhost:1337/api/check-ins");
    const rooms = res.data;
    return { rooms };
  } catch (error) {
    return { error };
  }
};
export default Home;
