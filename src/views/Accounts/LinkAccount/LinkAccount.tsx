import * as React from "react";
import Select from "react-select";
import Notification from "antd/es/notification";
import TemplateWrapper from "../../Template";

import Server from "../../../networking/server";

import "./LinkAccount.scss";
import { useNavigate } from "react-router-dom";

type BankItems = {
  name: string;
  code: string;
};

export default function LinkAccount() {
  const [accountNumber, setAccountNumber] = React.useState("");
  const [bankCode, setBankCode] = React.useState({ value: "", label: "" });
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [idNumber, setIdNumber] = React.useState('');
  const [accountHolder, setAccountHolder] = React.useState('');

  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const response = await Server.Accounts.fetchVerifiedAccounts();
      if (!response.data.success) {
        Notification.open({
          type: "error",
          message: response.data.message,
        });
      } else {
        const options = response.data.data.map((item: BankItems) => {
          return {
            value: item.code,
            label: item.name,
          };
        });
        setOptions(options);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      setLoading(true);
      const response = await Server.Accounts.linkAccount({
        bankCode: bankCode.value,
        accountNumber: accountNumber,
      });
      if (!response.data.success) {
        Notification.open({
          type: "error",
          message: response.data.message,
        });
      } else {
        navigate("/accounts");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      Notification.open({
        type: "error",
        message: "Something went wrong please try again later",
      });
    }
  };

  React.useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <TemplateWrapper defaultIndex="7">
      <div className="link-account">
        <div className="header">Link you bank account to receive payment</div>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Account Name</label>
              <input
                name="accountName"
                className="form-control"
                placeholder="Account holder name"
                value={accountHolder}
                onChange={(event) => setAccountHolder(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>ID Number</label>
              <input
                name="idnUMBER"
                className="form-control"
                placeholder="ID number"
                value={idNumber}
                onChange={(event) => setIdNumber(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Account Type</label>
              <Select
                className="select"
                name="accountType"
                placeholder="Select Account Type"
                options={[
                  { label: "Personal", value: "personal" },
                  { label: "Business", value: "business" },
                ]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankAccount">Bank Name</label>
              <Select
                className="select"
                name="accountType"
                placeholder="Select Account Type"
                options={options}
                // value={bankName}
                onChange={(val) => setBankCode(val || { value: "", label: "" })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                className="form-control"
                name="accountNumber"
                placeholder="Account Number"
                type="number"
                value={accountNumber}
                onChange={(val) => setAccountNumber(val.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary">
                {loading ? "Loading ..." : "Link Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </TemplateWrapper>
  );
}
