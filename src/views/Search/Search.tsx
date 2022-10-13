import * as React from "react";
import Notification from "antd/es/notification";
import TemplateWrapper from "../Template";
import "./Search.scss";
import Server from "../../networking/server";
import Card from "../../components/Card";

type User = {
  first_name: string;
  last_name: string;
  profession: string;
  avatar: string;
  id: number;
  email: string;
};

export default function Search() {
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState<User[]>();
  // refs
  const mounted = React.useRef(true);

  const handleSearch = (data: string): void => {
    setSearch(data);
  };

  const fetchUsers = async () => {
    try {
      const response = await Server.fetchUser();
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        Notification.error({
          message: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      Notification.error({
        message: "Something went wrong, please try again later",
      });
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <TemplateWrapper defaultIndex="3">
      <div className="search-container">
        <div className="search-wrapper">
          <input
            className="form-control"
            name="search"
            placeholder="Search for users"
            value={search}
            onChange={(value) => {
              handleSearch(value.target.value);
            }}
          />
        </div>
        <div className="users-container">
          <div className="cards">
            {!users
              ? "Loading ..."
              : users.map((item, index) => (
                  <Card key={index + "-key"} item={item} isLocal={false} />
                ))}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  );
}
