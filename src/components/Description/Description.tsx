import * as React from "react";
import { format } from "date-fns";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import "./Description.scss";

type Props = {
  description: string;
  handleClick: () => void;
};

export default function Description(props: Props) {
  const { description, handleClick } = props;
  return (
    <div className='description'>
      <div className='description-text' onClick={handleClick}>{description}</div>
    </div>
  );
}