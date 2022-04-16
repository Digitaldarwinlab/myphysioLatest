import ActiveSearch from "../UtilityComponents/ActiveSearch";
import "./InvoiceForm.css";
import { FaRupeeSign} from "react-icons/fa";
import MyPhysioLogo from '../UtilityComponents/MyPhysioLogo';

const InvoiceForm  = ({list, handleDelete, totalAmount,totalDiscount,totalTax, item, handleChange, handleSubmit,setPreview, pName, pEpisodeNumber, pId, cName, cAddress,cPhone,cEmail,cWebsite}) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  
  console.log(today.toLocaleDateString("en-US"));



    return <div className='invoice'>
      
      <div className="invoice-search"><ActiveSearch /></div>
      <div className="client" style={{marginTop:"3rem"}}>
       
        <div className="clinic-info">
          <h2>{cName}</h2>
          <p>{cAddress}</p>
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
          {pName}
          </li>
          <li>
            Patient Id: {pId}
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
      <li>
        Reciept No: APR22-000005
      </li>
      <li>
        Invoice No: APR22-000008
      </li>
    </ul>
      </div>
      <form onSubmit={handleSubmit} style={{marginTop:"2rem"}}>
    <table style={{width:"90%"}} className="invoice-table">
        <thead>
          <tr>
            <td>Treatment By</td>
            <td>Description</td>
            <td>Unit Cost <FaRupeeSign/></td>
            <td>Qty</td>
            <td>Discount (%)</td>
            <td>Tax (%)</td>
            <td>Cost <FaRupeeSign/></td>
          </tr>
        </thead>
        <tbody>
       
{list.map((item,index) => <tr key={item.id}>
        <td></td>
          <td>{item.Description}</td>
            <td>{item.UnitCost}  </td>
            <td>{item.Quantity}</td>
            <td>{item.Discount}</td>
            <td>{item.Tax}</td>
            <td>{item.Amount} </td>
            <td><button className='add-button' onClick={()=>{handleDelete(item.id)}}> - </button></td>
        </tr>)}
        <tr >
        <td style={{width:"12%"}}></td>
          <td className="Description" style={{width:"40%"}}> <input placeholder="Description"  name='Description' type='text' onChange={handleChange} value={item.Description}/></td>
            <td className='UnitCost' > <input  placeholder="Unit Cost"  name='UnitCost' type='Number' onChange={handleChange} value={item.UnitCost}/></td>
            <td className='Quantity'>  <input placeholder="Quantity" name='Quantity' type='Number' onChange={handleChange} value={item.Quantity}/></td>
            <td className="Discount"> <input placeholder="Discount" name='Discount' type='Number' onChange={handleChange} value={item.Discount}/></td>
            <td  className="Tax">  <input  placeholder="Tax" name='Tax' type='Number' onChange={handleChange} value={item.Tax}/></td>
           
            <td style={{width:"6%"}}></td>
            <td>  <button className='add-button' type='submit'> + </button></td>
        </tr>
        </tbody>
      </table>
      </form>
      <div className='amount-form'>
      <hr/>
        <p>Total Cost : {totalAmount} INR</p>
        <p>Total Discount : {totalDiscount} INR</p>
        <p>Total Tax : {totalTax} INR</p>
        <hr/>
        <p>Grand Total : {totalAmount - totalDiscount + totalTax} INR</p>
      </div>
     <div> <p className="invocie-footer"><strong>Generated with PhysioAI.</strong></p></div>
    <button className='add-button' onClick={()=>{setPreview(true)}}>Preview</button>
    </div>
}

export default InvoiceForm;