import * as React from "react";
import Notification from "antd/es/notification";
import { useNavigate } from "react-router-dom";

import { Account } from "../../store/model";
import TemplateWrapper from "../Template";

import AccountList from "./AccountList/AccountList";

import Server from "../../networking/server";

import "./Accounts.scss";

type STATES = "LOADING" | "IDLE" | "ERROR";

export default function Accounts() {
  const [SERVER_STATE, setServerState] = React.useState<STATES>("LOADING");
  const [_, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  const [selectOptions, setSelectOptions] = React.useState<{
    id: number;
    isDefault: boolean;
    accountName: string;
    accountNumber: string;
  }>();
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  const handleOptions = (isDefault: boolean, id: number) => {
    const options = accounts.filter((account) => account.id === id)[0];
    setSelectOptions({
      id,
      isDefault,
      accountName: options.name,
      accountNumber: options.accountNumber,
    });
    setIsOpen(true);
  };

  const fetchAccounts = async () => {
    try {
      const response = await Server.Accounts.getAccounts();
      if (!response.data.success) {
        Notification.open({
          message: response.data.message,
        });
        setServerState("ERROR");
      } else {
        setAccounts(response.data.data);
        setServerState("IDLE");
      }
    } catch (error) {
      console.log(error);
      Notification.open({
        message: "Something went wrong, please try again later",
        type: "error",
      });
    }
  };

  const makeDefaultAccount = async () => {
    try {
      setServerState("LOADING");
      const response = await Server.Accounts.makeDefaultAccount(
        selectOptions?.id
      );
      if (!response.data.success) {
        Notification.open({
          message: response.data.message,
        });
        setIsOpen(false);
        setServerState("IDLE");
      } else {
        setAccounts(response.data.data);
        setIsOpen(false);
        setServerState("IDLE");
      }
    } catch (error) {
      console.log(error);
      Notification.open({
        message: "Something went wrong, please try again later",
        type: "error",
      });
      setServerState("IDLE");
    }
  };

  const deleteAccount = async () => {
    try {
      setServerState("LOADING");
      const response = await Server.Accounts.deleteAccount(
        selectOptions?.id || 0
      );
      if (!response.data.success) {
        Notification.open({
          message: response.data.message,
          type: "error",
        });
        setServerState("IDLE");
      } else {
        setAccounts(response.data.data);
        setIsOpen(false);
        setServerState("IDLE");
        Notification.open({
          message: "Successfully deleted the account",
          type: "info",
        });
      }
    } catch (error) {
      console.log(error);
      Notification.open({
        message: "Something went wrong, please try again later",
        type: "error",
      });
      setServerState("IDLE");
    }
  };

  const linkBankAccount = () => {
    navigate("/accounts/link-account");
  };

  const updateBankAccount = () => {
    navigate("/accounts/update-account");
  };
  React.useEffect(() => {
    fetchAccounts();
  }, []);
  return (
    <TemplateWrapper defaultIndex="7">
      <div className="link-accounts-container">
        {SERVER_STATE === "LOADING" && <div className="loading">LOADING</div>}
        {SERVER_STATE === "ERROR" && <div className="error">ERROR</div>}
        {SERVER_STATE === "IDLE" && (
          <>
            {accounts.length === 0 && (
              <div className="action-buttons">
                <div>
                  <button className="btn btn-primary" onClick={linkBankAccount}>Link Account</button>
                  <button className="btn btn-primary" onClick={updateBankAccount}>
                    Update Bank Account
                  </button>
                </div>
              </div>
            )}
            {accounts.length > 0 && (
              <div className="account-list">
                {accounts.map((account, index) => (
                  <AccountList key={index.toString()} account={account} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </TemplateWrapper>
  );
}
