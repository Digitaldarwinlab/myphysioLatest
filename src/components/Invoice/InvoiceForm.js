import ActiveSearch from "../UtilityComponents/ActiveSearch";
import "./InvoiceForm.css";
import { FaRupeeSign } from "react-icons/fa";
import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';


const InvoiceForm = ({ list,cId, handleDelete, totalAmount, totalDiscount, totalTax, item, handleChange,handleFinalSubmit, handleSubmit, setPreview, pName, pEpisodeNumber, pId,pCode, cName, cAddress, cPhone, cEmail,showPrint, cWebsite }) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var today = new Date();
  const inoviceRef = useRef(null);
  const [print,setPrint] = useState(false)
  console.log(today.toLocaleDateString("en-US"));

const handleClickPrint = () => {
  console.log("Helloooooooooo")
  setPrint(true);
  setTimeout(() => {
    setPrint(false)
  }, 3000);
}

  return <div className='invoice'>

    <div className="invoice-search"><ActiveSearch /></div>
    <div ref={inoviceRef}>
      <div className="client" style={{ marginTop: "3rem" }}>

        <div className="clinic-info">
          <h2>{cName}</h2>
          <h4>{cAddress}</h4>
        </div>
        <div className="clinic-details">
          <ul >
            <li>Phone: {cPhone}</li>
            <li>Website: {cWebsite}</li>
            <li>Email: {cEmail}</li>
          </ul>
        </div>
        <div className="clinic-logo" ></div>
      </div>

      <div className="patient">
        <hr />
        <h4>Patient Details</h4>
        <ul>
          <li>
            Patient Name: {pName}
          </li>
          <li>
            Patient Code: {pCode}
          </li>
          <li>
            Episode Number: {pEpisodeNumber}
          </li>
        </ul>
      </div>
      <hr />
      <div className="datern">
        <ul>
          <li>
            Date: {today.toLocaleDateString("en-US", options)}
          </li>
          {/* <li>
            Reciept No: APR22-000005
          </li> */}
          <li>
            Invoice No: {cId + "-" + pCode + "-" }
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <div style={{overflowX:"auto"}}>
        <table style={{ width: "90%" }} className="invoice-table table">
          <thead>
            <tr>
              <td>Description</td>
              <td>Unit Cost <FaRupeeSign /></td>
              <td>Qty</td>
              <td>Discount (%)</td>
              <td>Tax (%)</td>
              <td>Cost <FaRupeeSign /></td>
             
            </tr>
          </thead>
          <tbody>

            {list.map((item, index) => <tr key={item.id}>
              <td>{item.Description}</td>
              <td>{item.UnitCost}  </td>
              <td>{item.Quantity}</td>
              <td>{item.Discount}</td>
              <td>{item.Tax}</td>
              <td>{item.Amount} </td>
              <td>{ <button className='add-button' onClick={() => { handleDelete(item.id) }}> - </button>}</td>
            </tr>)}
            <tr className="hide-row">
            
              <td className="Description" style={{ width: "40%" }}> <input placeholder="Description" name='Description' type='text' onChange={handleChange} value={item.Description} /></td>
              <td className='UnitCost' > <input placeholder="Unit Cost" name='UnitCost' type="text" onChange={handleChange} value={item.UnitCost} /></td>
              <td className='Quantity'>  <input placeholder="Quantity" name='Quantity' type="text" onChange={handleChange} value={item.Quantity} /></td>
              <td className="Discount"> <input placeholder="Discount" name='Discount' type="text" onChange={handleChange} value={item.Discount} /></td>
              <td className="Tax">  <input placeholder="Tax" name='Tax' type="text" onChange={handleChange} value={item.Tax} /></td>

              <td style={{ width: "10%" }}></td>
              <td className="hiddee"> { <button className='add-button' type='submit'> + </button>}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <center>{ <button className='add-button hiiddee' type='submit' style={{width:"10%"}}> + </button>}</center>
      </form>
      <div className='amount-form'>
        <hr />
        <ul>
        <li><b>Total Cost :</b><FaRupeeSign /><b> {totalAmount + totalDiscount - totalTax} </b></li>
        <li><b>Total Discount :</b><FaRupeeSign /><b>{totalDiscount} </b></li>
        <li><b>Total Tax </b><FaRupeeSign /><b> {totalTax} </b></li>
        </ul>
        <hr />
       
        <h4>Grand Total :<FaRupeeSign /> {totalAmount} </h4>
      </div>
      <div> <center><h4 className="invocie-footer">PhysioAI www.physioai.care</h4></center>
      </div>
    </div>
    <center>
      <center>{!showPrint && <button className='add-button' onClick={handleFinalSubmit} >Submit</button>}</center>
       {/* <button className='add-button' onClick={() => { setPreview(true) }}>Preview</button> */}
     { showPrint && <ReactToPrint
        trigger={() =><button className='add-button' onClick={handleClickPrint} >Print</button>}
        content={() => inoviceRef.current}
      />}</center>

  </div>


}

export default InvoiceForm;