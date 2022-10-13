import * as React from "react";
import TemplateWrapper from "../Template";
import { QrReader } from "react-qr-reader";
import "./Scan.scss";

export default function Scan() {
  return (
    <TemplateWrapper defaultIndex="2">
      <div className="scanner-container">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              console.log(result?.getText());
            }

            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{
            width: 100,
            height: 100,
          }}
          videoStyle={{
            width: "100%",
            height: "800px",
            borderRadius: "40px",
          }}
          className="video"
          containerStyle={{
            width: "100%",
            borderRadius: "10px",
          }}
        />
      </div>
    </TemplateWrapper>
  );
}
