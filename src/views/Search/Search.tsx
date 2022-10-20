import * as React from "react";
import Notification from "antd/es/notification";
import TemplateWrapper from "../Template";
import "./Search.scss";
import Server from "../../networking/server";
import Card from "../../components/Card";
import { useStoreState } from "easy-peasy";
import { Model } from "../../store/model";

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
  const [placeholder, setPlaceHolder] = React.useState<User[]>([])
  const [users, setUsers] = React.useState<User[]>([]);
  const profile = useStoreState<Model>((state) => state.profile)
  // refs
  const mounted = React.useRef(true);

  const handleSearch = (data: string): void => {
    if (data.length === 0) {
      setPlaceHolder(users);
    } else {
      const val = data.toLowerCase()
      const results = users.filter((i) => i.first_name.toLowerCase().indexOf(val) > -1 || i.last_name.toLowerCase().indexOf(val) > -1);
      setPlaceHolder(results);
    }
    setSearch(data);
  };

  const fetchUsers = React.useCallback(async () => {
    try {
      const response = await Server.Users.fetchUser();
      if (response.data.success) {
        setUsers(response.data.data);
        setPlaceHolder(response.data.data)
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
  },[]);

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
              : placeholder.map((item, index) => (
                  <Card key={index + "-key"} item={item} isLocal={false} profile={profile} />
                ))}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  );
}
