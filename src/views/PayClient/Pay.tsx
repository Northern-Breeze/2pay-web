import * as React from "react";
import { usePaystackPayment } from "react-paystack";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import TemplateWrapper from "../Template";
import configs from "../../configs/config";
import Notification from "antd/es/notification";

import "./Pay.scss";
import Server from "../../networking/server";

type Props = {
  location: {
    state: {
      userId: number;
      firstName: string;
      lastName: string;
      email: string;
      avatar: string;
      sessionId: number;
    };
  };
};

type Reference = {
  message: string;
  redirect: string;
  reference: string;
  trans: string;
  status: string;
  transaction: string;
  trxref: string;
};
export default function Pay() {
  const [amount, setAmount] = React.useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: location.state.email,
    amount: amount * 100,
    publicKey: configs.PAY_STACK_PUBLIC,
    currency: "ZAR",
  };

  // @ts-ignore
  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: Reference) => {
    (async () => {
      try {
        const { reference: token } = reference;
        const response = await Server.verifyPayment({
          token,
          id: location.state.userId,
        });
        if (!response.data.success) {
          Notification.error({
            message: response.data.message,
          });
        } else {
          Notification.success({
            message: response.data.message,
          });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        Notification.error({
          message: "Something went wrong please try again later",
        });
      }
    })();
  };

  const onClose = () => {
    console.log("closed");
  };

  const handleClick = () => {
    // @ts-ignore
    initializePayment(onSuccess, onClose);
  };

  if (!location.state) {
    return (
      <TemplateWrapper defaultIndex="1">
        <div className="pay-container">Error</div>
      </TemplateWrapper>
    );
  }
  return (
    <TemplateWrapper defaultIndex="1">
      <div className="pay-container">
        <div className="header">
          {location.state.firstName + " " + location.state.lastName}
        </div>
        <div className="image-container">
          <img src={location.state.avatar} className="image" alt="User" />
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
            Appreciate
          </Button>
        </div>
      </div>
    </TemplateWrapper>
  );
}
