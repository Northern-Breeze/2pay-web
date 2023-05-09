import * as React from "react";
import { Account } from "../../../store/model";

type Props = {
  account: Account;
};

export default function AccountList(props: Props) {
  const { account } = props;
  return <div>{account.name}</div>;
}
