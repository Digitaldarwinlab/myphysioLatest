import ActiveSearch from "../UtilityComponents/ActiveSearch";
import "./InvoiceForm.css";
import moment from "moment";
import { FaRupeeSign } from "react-icons/fa";
import { BiArrowFromLeft } from "react-icons/bi";
import React, { useRef, useState } from "react";
import { DatePicker } from "antd";
import ReactToPrint from "react-to-print";

const InvoiceForm = ({
  list,
  cId,
  handleDelete,
  totalAmount,
  totalDiscount,
  totalTax,
  item,
  handleChange,
  handleFinalSubmit,
  handleSubmit,
  setPreview,
  pName,
  pEpisodeNumber,
  pId,
  pCode,
  cName,
  cAddress,
  cPhone,
  cEmail,
  showPrint,
  cWebsite,
  invoiceNo,
  setStartDate,
        setEndDate
}) => {
  var options = { year: "numeric", month: "long", day: "numeric" };
  var today = new Date();
  const inoviceRef = useRef(null);
  const [print, setPrint] = useState(false);
  console.log(today.toLocaleDateString("en-US"));

  const handleClickPrint = () => {
    console.log("Helloooooooooo");
    setPrint(true);
    setTimeout(() => {
      setPrint(false);
    }, 3000);
  };
  function disabledDate(current) {
    return current && current > moment().endOf('day');
  }
  return (
    <div className="invoice">
      <div className="invoice-search">
        <ActiveSearch />
      </div>
      <div ref={inoviceRef}>
        <div className="client" style={{ marginTop: "3rem" }}>
          <div className="clinic-info">
            <h2>{cName}</h2>
            <h4>{cAddress}</h4>
          </div>
          <div className="clinic-details">
            <ul>
              {cPhone && <li>Phone: {cPhone}</li>}
              {cWebsite && <li>Website: {cWebsite}</li>}
              {cEmail && <li>Email: {cEmail}</li>}
            </ul>
          </div>
          <div className="clinic-logo"></div>
        </div>

        <div className="patient">
          <hr />
          <h4>Patient Details</h4>
          <ul>
            <li>Patient Name: {pName}</li>
            <li>Patient Code: {pCode}</li>
            <li>Episode Number: {pEpisodeNumber}</li>
          </ul>
        </div>
        <hr />
        <div className="datern">
          <ul>
            <li style={{ display: "flex", justifyContent: "end" }}>
              <div style={{ width: "450px", textAlign: "left" }}>
                <span style={{ display: "flex", justifyContent: "end" }}>
                  <span style={{marginTop:'10px'}}>Date:&nbsp;</span>
                  <div style={{ width: "150px", textAlign: "left" }}>
                    <DatePicker  disabledDate={disabledDate} placeholder="Start Date" onChange={(value) => {setStartDate(value)}} format="DD MMMM YYYY" />
                  </div>
                  <span style={{marginTop:'10px'}}><BiArrowFromLeft/></span>
                  <div style={{ width: "150px", textAlign: "left" }}>
                    <DatePicker disabledDate={disabledDate} placeholder="End Date" onChange={(value) => {setEndDate(value)}} format="DD MMMM YYYY" />
                  </div>
                </span>
              </div>
            </li>
            {/* <li>
            Reciept No: APR22-000005
          </li> */}
            <li>Invoice No: {cId + "/" + pCode + "/" + invoiceNo}</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "90%" }} className="invoice-table ">
              <thead>
                <tr>
                  <td className="Description">Description</td>
                  <td className="unit-cost">
                    Unit Cost <FaRupeeSign />
                  </td>
                  <td>Qty</td>
                  <td>Discount (%)</td>
                  <td>Tax (%)</td>
                  <td>
                    Cost <FaRupeeSign />
                  </td>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.Description}</td>
                    <td>{item.UnitCost} </td>
                    <td>{item.Quantity}</td>
                    <td>{item.Discount}</td>
                    <td>{item.Tax}</td>
                    <td>{item.Amount.toFixed(2)} </td>
                    <td className="hiddee">
                      {
                        <button
                          className="add-button"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          {" "}
                          -{" "}
                        </button>
                      }
                    </td>
                  </tr>
                ))}
                <tr className="hide-row">
                  <td
                    className="Description"
                    style={{ width: "40% !important" }}
                  >
                    {" "}
                    <input
                      placeholder="Description"
                      name="Description"
                      type="text"
                      onChange={handleChange}
                      value={item.Description}
                    />
                  </td>
                  <td className="unit-cost">
                    {" "}
                    <input
                      placeholder="Unit Cost"
                      name="UnitCost"
                      type="text"
                      onChange={handleChange}
                      value={item.UnitCost}
                    />
                  </td>
                  <td className="Quantity">
                    {" "}
                    <input
                      placeholder="Quantity"
                      name="Quantity"
                      type="text"
                      onChange={handleChange}
                      value={item.Quantity}
                    />
                  </td>
                  <td className="Discount">
                    {" "}
                    <input
                      placeholder="Discount"
                      name="Discount"
                      type="text"
                      onChange={handleChange}
                      value={item.Discount}
                    />
                  </td>
                  <td className="Tax">
                    {" "}
                    <input
                      placeholder="Tax"
                      name="Tax"
                      type="text"
                      onChange={handleChange}
                      value={item.Tax}
                    />
                  </td>

                  <td style={{ width: "10%" }}></td>
                  <td className="hiddee">
                    {" "}
                    {
                      <button className="add-button" type="submit">
                        {" "}
                        +{" "}
                      </button>
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <center>
            {
              <button
                className="add-button hiiddee"
                type="submit"
                style={{ width: "10%" }}
              >
                {" "}
                +{" "}
              </button>
            }
          </center>
        </form>
        <div className="amount-form">
          <b>
            <hr className="hhhrrr" />
          </b>
          <ul>
            <li>
              <b>Total Cost :</b>
              <FaRupeeSign />
              <b> {(totalAmount + totalDiscount - totalTax).toFixed(2)} </b>
            </li>
            <li>
              <b>Total Discount :</b>
              <FaRupeeSign />
              <b>{totalDiscount.toFixed(2)} </b>
            </li>
            <li>
              <b>Total Tax :</b>
              <FaRupeeSign />
              <b> {totalTax.toFixed(2)} </b>
            </li>
          </ul>
          <hr className="hhhrrr" />

          <h4>
            Grand Total :<FaRupeeSign /> {totalAmount}{" "}
          </h4>
        </div>
        <div>
          {" "}
          <center>
            <h4 className="invocie-footer">PhysioAI www.physioai.care</h4>
          </center>
        </div>
      </div>
      <center>
        <center>
          {!showPrint && (
            <button className="add-button" onClick={handleFinalSubmit}>
              Submit
            </button>
          )}
        </center>
        {/* <button className='add-button' onClick={() => { setPreview(true) }}>Preview</button> */}
        {showPrint && (
          <ReactToPrint
            trigger={() => (
              <button className="add-button" onClick={handleClickPrint}>
                Print
              </button>
            )}
            content={() => inoviceRef.current}
          />
        )}
      </center>
    </div>
  );
};

export default InvoiceForm;
