import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const Home = () => {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [sub, setsub] = useState("");
  const { query } = useRouter();

  function subbmit() {
    // alert(fullname);
    if (fullname != "" && email != "" && phone != "" && password != "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            fullname: fullname,
            email: email,
            phone_no: phone,
            password: password,
          },
        }),
      };

      fetch("http://localhost:1337/api/customers", requestOptions).then(
        (response) => response.json()
      );
      alert("Registration Successful...");
      router.push("/view/login");
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
        <div className="checkout">
          <form className="wid">
            <div className="form-group">
              <center>
                {" "}
                <h4> Register</h4>
              </center>
            </div>

            <br />
            <div className="form-group">
              <label for="usr">Enter fullname:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter fullname"
                onChange={(event) => setFullname(event.target.value)}
              />
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
              <label for="usr">Phone number:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter phone number"
                onChange={(event) => setPhone(event.target.value)}
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
                value="Sign Up"
                onClick={(event) => setsub("enter")}
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
