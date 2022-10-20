import * as React from "react";
import Notification from "antd/es/notification";
import "./QRCode.scss";
import TemplateWrapper from "../Template";

import Server from "../../networking/server";

import Button from "../../components/common/Button";
import Loading from "../../components/Loading";

type SERVER_STATE = "IDLE" | "LOADING" | "ERROR" | "SUCCESS";

export default function QRCode() {
  const [serverState, setServerState] = React.useState<SERVER_STATE>("IDLE");
  const [amount, setAmount] = React.useState<number>(0);
  const [image, setImage] = React.useState("");
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as unknown as number;
    setAmount(val);
  };

  const retryPayment = () => {
    console.log("Something");
  };

  const handleClick = async () => {
    try {
      if (amount < 100) {
        Notification.info({
          message: "Please create a charge with a positive value",
        });
        return;
      }
      setServerState("LOADING");
      const currency = "ZAR";
      const response = await Server.Transactions.generateQRCode({
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
    <TemplateWrapper defaultIndex="1">
      <div className="qrcode-container">
        <div className="pay-link-container">
          {serverState === "IDLE" && (
            <div>
              <div className="header">
                Enter the amount you would want to include in the QR Code
              </div>
              <div>
                <div className="amount-enter">
                  <div className="input-group mb-3">
                    <span className="input-group-text">ZAR</span>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      onChange={handleAmount}
                      aria-label="Amount (to the nearest dollar)"
                    />
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2">
                <Button type="primary" clickHandler={handleClick} size="large">
                  GENERATE QR CODE
                </Button>
              </div>
            </div>
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
                <img className="qrc-code-image" src={image} alt="QR code image" />
              </div>
            </div>
          )}
        </div>
      </div>
    </TemplateWrapper>
  );
}
