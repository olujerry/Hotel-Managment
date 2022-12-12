import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { render } from "react-dom";

const Home = ({ rooms, error }) => {
  const router = useRouter();

  return (
    <>
      <div className="contner">
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

        <main>
          <div className="menu2"></div>
          <div>
            <center>
              <h3>Available Rooms</h3>
            </center>
            <br />
          </div>
          <div className="rooms">
            {rooms.data.map((restaurant) => (
              <div className="room" key={restaurant.id}>
                <img
                  className="room_img"
                  src="https://raw.githubusercontent.com/popoolatopzy/hotel/main/1.jpeg"
                />
                <span className="price">{restaurant.attributes.roomName}</span>
                <span className="price2">
                  ${restaurant.attributes.roomPrice}
                </span>
                <br />
                <br />
                <center>
                  <span>{restaurant.attributes.roomDescription}</span> <br />
                  <button className="btn-default">
                    <a href={restaurant.attributes.Link}>Book Now </a>
                  </button>
                </center>
              </div>
            ))}
          </div>{" "}
          <br />
          <br />
          <br />
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

          .price {
            font-size: 22px;
            font-weight: lighter;
            margin-left: 10px;
          }
          .price2 {
            float: right;
            margin-right: 20px;
            color: #ffb300;
            font-size: 24px;
            font-weight: lighter;
          }
          .static {
            width: 100%;
            height: 300px;
            background-color: blue;
            background-image: url("1.jpeg");
            background-size: 100% 300px;
          }
          .rooms {
            width: 100%;
            height: 360px;
            /*background-color:blue;*/
          }
          .room {
            float: left;
            margin-left: 90px;
            width: 23%;
            height: 360px;
            /*background-color:red;*/
            border-radius: 10px;
            border: 7px solid #f8f9fc;
          }
          .room_img {
            width: 100%;
            max-height: 170px;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
          }
        `}</style>
      </div>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get("http://localhost:1337/api/rooms");
    const rooms = res.data;
    return { rooms };
  } catch (error) {
    return { error };
  }
};

export default Home;
