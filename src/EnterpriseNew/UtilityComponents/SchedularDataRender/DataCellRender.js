import React from "react";
import Utils from './Utils';
export default function DataCell(props) {
  const { startDate, text } = props.itemData;
  const isDisableDate = Utils.isValidDate(startDate);
  return (
    <div className={isDisableDate?"disable-date":null}>
      {text}
    </div>
  );
}