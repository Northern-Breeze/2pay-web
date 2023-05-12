import * as React from "react";
import Notification from "antd/es/notification";
import "./QRCode.scss";
import TemplateWrapper from "../Template";

import Server from "../../networking/server";

import Button from "../../components/common/Button";
import Loading from "../../components/Loading";
import CurrencyInput from "react-currency-input-field";

type SERVER_STATE = "IDLE" | "LOADING" | "ERROR" | "SUCCESS";

export default function QRCode() {
  const [serverState, setServerState] = React.useState<SERVER_STATE>("IDLE");
  const [amount, setAmount] = React.useState<number>(0);
  const [image, setImage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const retryPayment = () => {
    console.log("Something");
  };

  const handleClick = async () => {
    try {
      if (amount < 5) {
        Notification.info({
          message: "Please create a charge with a positive value",
        });
        return;
      }
      setServerState("LOADING");
      const currency = "ZAR";
      const response = await Server.Transactions.generateQRCode({
        firstName,
        lastName,
        email,
        amount,
        currency,
      });
      if (!response.data.success) {
        Notification.error({
          message: response.data.message,
        });
        setServerState("ERROR");
      } else {
        setImage(response.data.data);
        Notification.success({
          message: "Successfully create a payment link",
        });
        setServerState("SUCCESS");
      }
    } catch (error) {
      console.log(error);
      setServerState("ERROR");
      Notification.error({
        message: "Something went wrong, please try again later",
      });
    }
  };

  return (
    <TemplateWrapper defaultIndex="10">
      <div className="qrcode-container">
        <div className="pay-link-container">
          {serverState === "IDLE" && (
            <>
              <div className="header">
                Fill in the information so we can create a payment/invoice link
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  className="form-control"
                  onChange={(val) => setFirstName(val.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  className="form-control"
                  onChange={(val) => setLastName(val.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  value={email}
                  className="form-control"
                  onChange={(val) => setEmail(val.target.value)}
                />
              </div>
              <div className="form-group">
                <CurrencyInput
                  id="input-example"
                  name="input-name"
                  className="form-control"
                  placeholder="Please amount"
                  decimalsLimit={2}
                  onValueChange={(value) => {
                    if (Number(value)) {
                      setAmount(Number(value));
                    }
                  }}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleClick}
                >
                  GENERATE LINK
                </button>
              </div>
            </>
          )}
          {serverState === "LOADING" && (
            <div className="loader">
              <Loading />
            </div>
          )}
          {serverState === "ERROR" && (
            <div>
              <div>Something went wrong please try again</div>
              <Button type="primary" clickHandler={retryPayment}>
                Try Again
              </Button>
            </div>
          )}
          {serverState === "SUCCESS" && (
            <div className="scan-qrcode-image">
              <div className="header">Scan the QR Code bellow</div>
              <div>
                <img
                  className="qrc-code-image"
                  src={image}
                  alt="QR code image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </TemplateWrapper>
  );
}
