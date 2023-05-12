import * as React from "react";
import Notification from "antd/es/notification";
import Empty from "antd/es/empty";
import Server from "../../networking/server";
import TemplateWrapper from "../Template";
import Transaction from "../../components/Transaction";
import Error from "../../components/Error";
import { Transact } from '../../interface/Transactions.interface';

import "./Transactions.scss";
import Loading from "../../components/Loading";
import { useStoreState, State } from "easy-peasy";

import { Model, Profile } from "../../store/model";

type SERVER_STATE = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";

export default function Transactions() {
  const [trans, setTrans] = React.useState<Transact[]>([]);
  const [serverState, setServerState] = React.useState<SERVER_STATE>("IDLE");
  
  const profile: Profile = useStoreState<Model>((store: State<Model>) => store.profile);

  const fetchTransactions = React.useCallback(async () => {
    try {
      setServerState("LOADING");
      const response = await Server.Users.getTransactions();
      if (!response.data.success) {
        setServerState("ERROR");
        Notification.error({
          message: response.data.message,
        });
      } else {
        setServerState("SUCCESS");
        setTrans(response.data.data);
        Notification.success({
          message: "Successfully fetched notifications",
        });
      }
    } catch (error) {
      console.log(error);
      setServerState("ERROR");
      Notification.error({
        message: "Something went wrong please try again later",
      });
    }
  }, []);

  React.useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <TemplateWrapper defaultIndex="6">
      <div className="transaction-wrapper">
        <div className="row">
          {serverState === "SUCCESS" &&
            ((trans.length === 0 && (
              <div className="empty-list">
                <Empty />
              </div>
            )) ||
              trans.map((i, index) => <Transaction key={'key-' + index} payload={i} profile={profile} />))}
          {serverState === "ERROR" && (
            <Error message="Failed to load transactions" />
          )}
          {serverState === 'LOADING' && <Loading />}
        </div>
      </div>
    </TemplateWrapper>
  );
}
