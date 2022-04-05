import "./Invoicer.css"

const Invoicer = ({ list, totalAmount,setPreview }) => {
  return (
    <div className="invoice">
      <div className="client">
        <div className="clinic-logo">Logo</div>
        <div className="clinic-info">
          <h2>Clinic Name</h2>
          <p>orem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa</p>
        </div>
        <div className="clinic-details">
          <ul >
            <li>Phone: 123 456 789</li>
            <li>Website: myphysiodigitaldarwin.gmail.com</li>
            <li>Email: abc@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="patient">
        <h4>Patient Details</h4>
        <ul>
          <li>
          Abcd Pqur
          </li>
          <li>
            Patient Id: A11
          </li>
          <li>
            Male, 22 Years
          </li>
        </ul>
      </div>
      <hr />
      <div className="datern"> 
    <ul>
      <li>
        Date: 03-04-2022
      </li>
      <li>
        Reciept No: APR22-000005
      </li>
      <li>
        Invoice No: APR22-000008
      </li>
    </ul>
      </div>
      <table style={{ width: "90%" }} className="invoice-table">
        <thead>
          <tr>
            <td>Treatment By</td>
            <td>Description</td>
            <td>Unit Cost</td>
            <td>Qty</td>
            <td>Discount</td>
            <td>Tax</td>
            <td>Cost</td>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.id}>
              <td>Dr. ABC</td>
              <td>{item.Description}</td>
              <td>{item.UnitCost}</td>
              
              <td>{item.Quantity}</td>
              <td>{item.Discount}</td>
              <td>{item.Tax}</td>
              <td>{item.Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="amount">
        <hr />
        <p>Total Cost : {totalAmount} INR</p>
        <p>Total Discount : {totalAmount} INR</p>
        <p>Total Tax : {totalAmount} INR</p>
        <hr />
        <p>Grand Total : 0 INR</p>
      </div>
      <button className='add-button' onClick={()=>{setPreview(false)}}>Back</button>
    </div>
  );
};

export default Invoicer;
