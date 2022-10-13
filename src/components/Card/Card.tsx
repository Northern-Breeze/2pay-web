import * as React from "react";
import Description from "../Description";
import { useNavigate } from "react-router-dom";

import "./Card.scss";

interface Props {
  item: {
    first_name: string;
    last_name: string;
    profession: string;
    avatar: string;
    id: number;
    email: string;
  };
  isLocal: boolean;
}

export default function Article(props: Props) {
  const { item } = props;
  const navigate = useNavigate();

  return (
    <div
      className="card-container"
      onClick={() => {
        navigate("/pay", {
          state: {
            userId: item.id,
            firstName: item.first_name,
            lastName: item.last_name,
            email: item.email,
            avatar: item.avatar,
            sessionId: Math.random(),
          },
        });
      }}
    >
      <img src={item.avatar} alt={item.first_name + " " + item.last_name} />
      <div className="card-details">
        <h2 className="header">{item.first_name + " " + item.last_name}</h2>
        <div>
          <Description description={item.profession} />
        </div>
      </div>
    </div>
  );
}
