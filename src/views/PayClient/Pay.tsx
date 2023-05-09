import * as React from "react";
import { usePaystackPayment } from "react-paystack";
import { useLocation, useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";

import Button from "../../components/common/Button/Button";
import TemplateWrapper from "../Template";
import configs from "../../configs/config";
import Notification from "antd/es/notification";

import Server from "../../networking/server";
import Loading from "../../components/Loading";
import ThankYou from "../../components/ThankYou";

import "./Pay.scss";

type Reference = {
  message: string;
  redirect: string;
  reference: string;
  trans: string;
  status: string;
  transaction: string;
  trxref: string;
};

type SERVER_STATE = "IDLE" | "LOADING" | "ERROR" | "SUCCESS";

export default function Pay() {
  const [amount, setAmount] = React.useState(0);
  const [serverState, setServerStates] = React.useState<SERVER_STATE>("IDLE");
  const navigate = useNavigate();
  const location = useLocation();

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as unknown as number;
    setAmount(val);
  };

  const retryPayment = () => {
    navigate("/search");
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: location.state.profile.email,
    amount: amount * 100,
    publicKey: configs.PAY_STACK_PUBLIC,
    currency: "ZAR",
    firstname: location.state.profile.firstName,
    lastname: location.state.profile.lastName,
    metadata: {
      payer: {
        firstName: location.state.profile.firstName,
        lastName: location.state.profile.lastName,
        email: location.state.profile.email,
        avatar: location.state.profile.avatar,
      },
      payee: {
        email: location.state.email,
        firstName: location.state.firstName,
        lastName: location.state.lastName,
        avatar: location.state.avatar,
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: Reference) => {
    (async () => {
      try {
        setServerStates("LOADING");
        const { reference: token } = reference;
        const response = await Server.Transactions.verifyPayment({
          token,
          id: location.state.userId,
          source: "PAYSTACK",
        });
        if (!response.data.success) {
          setServerStates("ERROR");
          Notification.error({
            message: response.data.message,
          });
        } else {
          setServerStates("SUCCESS");
          Notification.success({
            message: response.data.message,
          });
        }
      } catch (error) {
        console.log(error);
        setServerStates("ERROR");
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        {serverState === "IDLE" && (
          <>
            <div className="header">
              {location.state.firstName + " " + location.state.lastName}
            </div>
            <div className="image-container">
              <img src={location.state.avatar} className="image" alt="User" />
            </div>
            <div>
              <div className="amount-enter">
                <CurrencyInput
                  id="input-example"
                  name="input-name"
                  className="form-control"
                  placeholder="Please amount"
                  decimalsLimit={2}
                  onValueChange={(value) => {
                    if (Number(value)) {
                      setAmount(Number(value))
                    }
                  }}
                />
              </div>
            </div>
            <div className="d-grid gap-2">
              <Button type="primary" clickHandler={handleClick} size="large">
                Appreciate
              </Button>
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
    </TemplateWrapper>
  );
}
