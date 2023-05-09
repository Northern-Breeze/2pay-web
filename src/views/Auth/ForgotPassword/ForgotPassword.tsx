import * as React from "react";
import "./ForgotPassword.scss";
import Input from "../../../components/common/Input/Input";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Notification from "antd/es/notification";
import Server from "../../../networking/server";

type Inputs = {
  email: string;
};

export default function ForgotPassword() {
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      setLoading(true);
      const response = await Server.Auth.passwordUpdateRequest(data.email);
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
        navigate("/change-password");
      }
    } catch (error) {
      Notification.success({
        message: "Something went wrong please try again later",
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="header">Forgot Password</div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Input
              label="Email"
              register={register}
              required
              type="email"
              errors={errors}
              placeholder="Email"
              value="email"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-lg">
              {loading ? "Loading ..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
