import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sub, setsub] = useState("");
  const router = useRouter();
  function subbmit() {
    if (email != "" && password != "") {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      fetch("http://localhost:1337/api/customers", requestOptions).then(
        (response) =>
          response.json().then((data) => {
            var test = data.data;
            // console.log(data.data);
            test.forEach((element) => {
              if (
                element.attributes.email == email &&
                element.attributes.password == password
              ) {
                console.log("hh");
                localStorage.setItem("userID", element.id);
                router.push("/view/dashboard");
              }
            });
          })
      );
    }
  }

  useEffect(() => {
    subbmit();
  }, [sub]);

  // function

  return (
    <div className="contner">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

      <main>
        <div className="checkout">
          <form className="wid">
            <div className="form-group">
              <center>
                {" "}
                <h4> Login</h4>
              </center>
            </div>

            <br />
            <div className="form-group">
              <label for="usr">Email address:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label for="usr">Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="button"
                className="form-control btn-info"
                value="Login"
                onClick={(event) => subbmit()}
              />
            </div>
            <br />
          </form>
        </div>
      </main>

      <style jsx global>{`
        .checkout {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .wid {
          width: 300px;
        }
      `}</style>
    </div>
  );
};

export default Home;
