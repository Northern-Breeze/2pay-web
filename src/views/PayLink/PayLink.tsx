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
  const [amount, setAmount] = React.useState<number>(0);
  const [paylink, setLink] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const profile = useStoreState<Model>((state) => state.profile);

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as unknown as number;
    setAmount(val);
  };

  const retryPayment = () => {
    console.log('Something')
  };

  const copyClipBoard = () => {
    navigator.clipboard.writeText(paylink);
    Notification.success({
      message: 'Link copied to clipboard successfully'
    })
    setModalOpen(false);
  }

  const getUrl = () => "http://localhost:5173";

  const handleClick = async () => {
    try {
      if (amount < 100) {
        Notification.info({
          message: "Please create a charge with a positive value",
        });
        return;
      }
      setServerState('LOADING');
      const currency = "ZAR";
      const response = await Server.Transactions.getPaymentLink(
        profile.email,
        amount,
        currency,
        getUrl()
      );
      if (!response.data.success) {
        Notification.error({
          message: response.data.message,
        });
        setServerState('ERROR');
      } else {
        setLink(response.data.data);
        setModalOpen(true);
        setServerState('IDLE');
        Notification.success({
          message: "Successfully create a payment link",
        });
      }
    } catch (error) {
      console.log(error);
      setServerState('ERROR');
      Notification.error({
        message: "Something went wrong, please try again later",
      });
    }
  };
  return (
    <TemplateWrapper defaultIndex="1">
      <div className="pay-link-container">
        {serverState === "IDLE" && (
          <div>
            <div className="header">
              Enter the amount you would want to include in the link
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
                GENERATE LINK
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
