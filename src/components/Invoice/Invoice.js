import { useState } from "react";
// import "./Invoice.css";
import InvoiceForm from "./InvoiceForm";
import Invoicer from "./Invoicer";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getClinicDetails} from "../../API/Physio/ClinicRegister";
import axios from "axios";

function Invoice() {
  const patientDetails = useSelector(state => state.carePlanRedcucer);
  const [list, setList] = useState([]);
  const [item, setItem] = useState({
    Description:"",
    UnitCost: "",
    Quantity: "",
    Discount: "",
    Tax: "",
    Amount: "",
  });
  const [preview, setPreview] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount,setTotalDiscount] = useState(0);
  const [totalTax,setTotalTax] = useState(0);
  const [clinic, setClinic] = useState({});

useEffect(() => {

  let tDiscount = 0 ;
        let tTax = 0 ;

      for(let item in list){
        const cost = Number(list[item].UnitCost);
        const quantity =Number( list[item].Quantity);
        const disc = Number(list[item].Discount);
        const taxx = Number(list[item].Tax);
        console.log(typeof(cost))
        console.log(typeof(quantity))
        console.log(typeof(disc))
        console.log(typeof(taxx))
        const discount = cost * quantity * disc / 100;
        const tax = ((cost * quantity - (discount)) * taxx/ 100);
        tDiscount = discount + tDiscount;
        tTax = tTax + tax;
      }

      setTotalDiscount(Math.round(tDiscount));
      setTotalTax(Math.round(tTax));
},[list])
 

  useEffect(() =>{
    const id = JSON.parse(localStorage.getItem('userId')).clinic_id;
    axios.post(process.env.REACT_APP_API + "/get-clinic-physio/",{id:id}).then(res => setClinic(res.data[0]));
    },[])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const newItem = {
      ...item,
      [name]: value,
    };

   

   

    console.log(newItem);

    setItem(newItem);
  };

  console.log("clinic",clinic);

  const CalculateAmount = (desc,cost, quantity,discount,tax) => {
    let Cost = +cost;
    let Quantity = +quantity;
    let Discount = +discount;
    let Tax = + tax;
    

    return Math.round(Cost * Quantity - Cost * Quantity*Discount/100 +( Cost * Quantity - Cost * Quantity*Discount/100 )*Tax / 100)
    // return Cost * Quantity;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.Description && item.UnitCost && item.Quantity && item.Discount && item.Tax) {
      const Amount = CalculateAmount(
        item.Description,
        item.UnitCost,
        item.Quantity,
        item.Discount,
        item.Tax
      );
      setList(() => [...list, { ...item, id: Math.random() * 99999, Amount }]);

      
      


      setTotalAmount((prevAmount) => prevAmount + Amount);
      setItem({
        Description:"",
        UnitCost: "",
        Quantity: "",
        Discount: "",
        Tax: "",
        Amount: "",
      });
    } else {
      alert("Fill all the details");
      return;
    }
  };

  const handleDelete = (id) => {
    setList((prevList) =>
      prevList.filter((item) => {
        if (item.id === id) {
          setTotalAmount(totalAmount - item.Amount);
        }
        return item.id !== id;
      })
    );
  };

  console.log(list);

  return (
    <div className="App">
      {preview ? <Invoicer list={list} totalAmount={totalAmount} setPreview={setPreview}/>: <InvoiceForm
        handleDelete={handleDelete}
        list={list}
        item={item}
        totalAmount={totalAmount}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setPreview={setPreview}
        pName={patientDetails.patient_name}
        pId={patientDetails.pp_ed_id}
        pEpisodeNumber = {patientDetails.episode_number}
        cName = {clinic.name}
        cAddress = {clinic.address_1+', '+clinic.address_2+', '+clinic.address_3}
        cPhone = {clinic.mobile_no}
        cWebiste={clinic.website_url}
        cEmail = {clinic.email}
        totalDiscount = {totalDiscount}
        totalTax = {totalTax}
      />}
    </div>
  );
}   

export default Invoice;
