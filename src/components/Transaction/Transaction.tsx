import * as React from "react";
import { formatRelative } from "date-fns";
import ReactCountryFlag from "react-country-flag";

import "./Transaction.scss";
import { Profile } from "../../store/model";

type Props = {
  payload: {
    first_name: string;
    last_name: string;
    email: string;
    paidAt: string;
    currency: string;
    amount: number;
    location: {
      country: string;
      countryISO: string;
    };
    avatar: {
      image: string;
      username: string;
    };
  };
  profile: Profile;
};

export default function Transaction(props: Props) {
  const { profile, payload } = props;
  const { first_name, last_name, currency, amount, paidAt, avatar, location, email } =
    payload;
  return (
    <div className="transaction-container">
      <div className="image-container">
        <img src={avatar.image} alt="User Image" className="user-image" />
      </div>
      <div className="display-container">
        <div className="info-container">
          <div className="name">{first_name + " " + last_name}</div>
          <div className="dates">
            {formatRelative(new Date(paidAt), new Date())}
          </div>
          <div className="location">
            <div className="country-name">{location.country}</div>
            <div className="country-iso">
              <ReactCountryFlag
                className="emojiFlag"
                countryCode={location.countryISO}
                svg
              />
            </div>
          </div>
        </div>
        <div className="transaction">
          <div className="currency-container">
            <span>{currency}</span>
          </div>
          <div className="amount-container">
            <span>
              {profile.email === email ? '-' : '+'}
              {amount / 100}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
