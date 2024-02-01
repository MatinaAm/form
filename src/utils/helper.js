
import Highlighter from "react-highlight-words";
import strings from "./localization";
import React from "react";
import { Button, Divider, Flex, InputNumber, Select } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { Controller } from "react-hook-form";

export function toPersianDigits(nums) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return nums.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}


export  const HighlighterWrapper = ( ( searchWords, textToHighlight ) => (
  <Highlighter
    highlightStyle={{
      backgroundColor: '#a0ff69',
      padding: 0,
    }}
    searchWords={[searchWords]}
    autoEscape
    textToHighlight={textToHighlight ? textToHighlight.toString() : ''}
  />
))

export const headerSection = (strings, flag) => {
  return (
    <Flex gap="18px" align="center" >
      <span>{strings}</span>
      <span className="header__modalDetail"> {flag}</span>

    </Flex>
  );
};


export const moneyDetailSection = (stringText, amount) => {
  return (
    <>
    <Divider type="vertical"/>

  <Flex gap="24px" align="start" vertical >
      <span className="font-size-md">{stringText}</span>
    <div>
      <span className="color-primary-main font-size-lg"> {amount}     </span>
      <span>
        ریال
      </span>
    </div>
    </Flex>

      <div className={"break-line"}/>
      <Flex  align="start" vertical >
        <Divider type="vertical"/>

      </Flex>
      <ButtonGroup>
      <Button  type="primary">
        {strings.toAccount}
      </Button>
      <Button  > {strings.toWallet} </Button>
      </ButtonGroup>

    </>
  );
};


export    const formattedNum =(num)=>{
 const formatNum =num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return  toPersianDigits(formatNum) ;
}