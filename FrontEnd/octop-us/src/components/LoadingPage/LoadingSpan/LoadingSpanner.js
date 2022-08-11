import React from "react";
import { LoadingForm, LoadingText } from "./Styles";
import Card from "../../Card/Card";

export default () => {
  return (
    <Card>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <LoadingForm>
        <img src={"/images/spinner.gif"} width="15%" />
      </LoadingForm>
    </Card>
  );
};
