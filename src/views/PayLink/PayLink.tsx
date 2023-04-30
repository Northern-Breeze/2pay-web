import * as React from "react";
import Modal from "antd/es/modal";
import { PaperClipOutlined } from "@ant-design/icons";
import Notification from "antd/es/notification";
import Button from "../../components/common/Button";
import Loading from "../../components/Loading";
import ThankYou from "../../components/ThankYou";
import TemplateWrapper from "../Template";

import "./PayLink.scss";
import Server from "../../networking/server";
import { useStoreState } from "easy-peasy";
import { Model } from "../../store/model";

type SERVER_STATE = "IDLE" | "LOADING" | "ERROR" | "SUCCESS";

export default function PayLink() {
  const [serverState, setServerState] = React.useState<SERVER_STATE>("IDLE");
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [amount, setAmount] = React.useState<number>(0);
  const [paylink, setLink] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  
  const profile = useStoreState<Model>((state) => state.profile);

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as unknown as number;
    setAmount(val);
  };

  const retryPayment = () => {
    console.log("Something");
  };

  const copyClipBoard = () => {
    navigator.clipboard.writeText(paylink);
    Notification.success({
      message: "Link copied to clipboard successfully",
    });
    setModalOpen(false);
  };

  const getUrl = () => "http://localhost:5173";

  const handleClick = async () => {
    try {
      if (amount < 5) {
        Notification.info({
          message:
            "The amount that can be included in the link must be greater than 5",
        });
        return;
      }
      setServerState("LOADING");
      const currency = "ZAR";
      const response = await Server.Transactions.getPaymentLink(
        email,
        firstName,
        lastName,
        amount,
        currency,
        getUrl()
      );
      if (!response.data.success) {
        Notification.error({
          message: response.data.message,
        });
        setServerState("ERROR");
      } else {
        setLink(response.data.data);
        setModalOpen(true);
        setServerState("IDLE");
        Notification.success({
          message: "Successfully create a payment link",
        });
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
              <button className="btn btn-primary btn-lg" onClick={handleClick}>
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
          <div>
            <ThankYou />
          </div>
        )}
      </div>
      <Modal
        centered
        footer={null}
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div className="container">
          <div className="copy-text">
            <input type="text" className="form-control" value={paylink} />
            <button className="btn" onClick={copyClipBoard}>
              <PaperClipOutlined />
            </button>
          </div>
        </div>
      </Modal>
    </TemplateWrapper>
  );
}
