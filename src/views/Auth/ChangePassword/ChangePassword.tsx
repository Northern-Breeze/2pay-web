import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Notification from "antd/es/notification";

import Server from "../../../networking/server";

import Input from "../../../components/common/Input/Input";

import "./ChangePassword.scss";

type Inputs = {
  password: string;
  password1: string;
};

export default function ChangePassword() {
  const [loading, setLoading] = React.useState(false);
  const [hasToken, setHasToken] = React.useState(false);
  const [otp, setOTP] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      setLoading(true);
      const response = await Server.Auth.updatePassword(data.password, otp);
      if (!response.data.success) {
        Notification.error({
          message: response.data.message,
        });
        setLoading(false);
      } else {
        setLoading(false);
        Notification.success({
          message: response.data.message,
        });
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Notification.error({
        message: "Something went wrong please try again later",
      });
    }
  };
  const onOtpSubmit = () => {
    setHasToken(true);
  };
  return (
    <div className="change-password-container">
      {!hasToken ? (
        <>
          <div className="header">Change Password</div>
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit(onOtpSubmit)}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg">Continue</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="header">Change Password</div>
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <Input
                  label="Password"
                  register={register}
                  required
                  type="password"
                  errors={errors}
                  placeholder="Enter Password"
                  value="email"
                />
              </div>
              <div className="form-group">
                <Input
                  label="Confirm Password"
                  register={register}
                  required
                  type="password"
                  errors={errors}
                  placeholder="Confirm Password"
                  value="password"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg">
                  {loading ? "Loading ..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
