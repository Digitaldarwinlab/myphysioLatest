import {Row, Col,Table,Modal,Space} from "antd";
import { BsFillEyeFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from "react";
import { forgotPassword, getUserData } from "../../API/userAuth/userAuth";
import axios from "axios";
import {getClinicDetails} from "../../API/Physio/ClinicRegister";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    let keyMapping = {
        "pp_patm_id": "Employee Id",
        "first_name": "First Name",
        "middle_name": "Middle Name",
        "last_name": "Last Name",
        "dob": "Date of Birth",
        "patient_code": "Employee Code",
        "Address_1": "Address",
        "Address_2": "",
        "Address_3": "",
        "city": "City",
        "state": "State",
        "country": "Country",
        "pin": "Pin Code",
        "gender": "Gender",
        "mobile_no": "Mobile No",
        "whatsapp_no": "Whatsapp No",
        "landline": "Landline No",
        "email": "Email",
        "facebook": "FAcebook",
        "linkedlin": "LinkedIn",
        "emergence_contact": "Emergency Contact No",
        "blood_group": "Blood Group",
        "allergy_detail": "Allergy Details",
        "patient_medical_history": "Medical History",
        "patient_Family_History": "Family History",
        "status_flag": "Status Flag",
        "last_update_date": "2021-07-17T15:04:24Z",
        "last_update_by": "2021-07-17T15:04:25Z",
        "pp_pm": "PP PM",
        "pp_org": "Organization Code"
        
    };

    let locale = {
        emptyText: 'No Employee Found Please search for Organization',
      };

    const columns = [
        {
            title: "Name",
            dataIndex: "first_name",
            width: "20%",
            fixed: 'left',
           
          },
          {
            title: "Employee Id",
            dataIndex: "pp_patm_id",
            width: "20%",
           
          },
        {
          title: "Date of Birth",
          dataIndex: "dob",
          width: "20%",
         
        },
        {
          title: "Mobile No",
          dataIndex: "mobile_no",
          width: "20%",
         
        },
        {
          title: "Actions",
          dataIndex: "address",
          fixed:'right',
          width: "25%",
          render: (text, record) => (
            <Space size="middle">
               <BsFillEyeFill onClick={() => handleView(record)} size={20} />
              {/* <BiEdit onClick={() => handleEdit(record)} size={20} />
              <AiFillUnlock onClick={()=>showmodal(record.uid)} size={20} /> */}
            </Space>
          )
        }
      ];

    const searchOrganizations = (val) => {

    }

      const onSearch = async (e) => {
        let val=e.target.value
        setLoading(true);
        const searchedData = await searchOrganizations(val);
        setOrganizations(searchedData);
       
    }

      useEffect(async() => {
        const data = getClinicDetails(10);
        console.log(data);
            },[])

      useEffect(() => {
        async function getEmployees() {
            setLoading(true);
            axios.post(process.env.REACT_APP_API+"/empolyee_list/",{id: 1}).then(res => {  setLoading(false);
                const data = res.data;
                setEmployees(res.data);
                
                setPaginationState({
                    ...paginationState,
                    totalPage: data.length / paginationState.pageSize,
                    minIndex: 0,
                    maxIndex: paginationState.pageSize,
                })}).catch(err => console.log(err));
        }
        getEmployees();
 
    }, []);

    const ShowEmployeeInfo = () => {
        return (
            <Modal
                visible={visible}
                footer={null}
                closable
                onCancel={() => setVisible(false)}
                title=""
                centered
            >
                <Table pagination={false}
                    scroll={{ y: 400 }}
                    showHeader={false}
                    columns={[{ title: "Field", dataIndex: "Field", render: (text) => <p className="fw-bold">{text}</p> },
                    { title: "Value", dataIndex: "Value" }]} dataSource={data} />
            </Modal>
        )
    }

      const handleView = (val) => {
        let tempData = [];
        let keys = Object.keys(val);
        let index = 0;
        keys.forEach(key => {
            if (!(["end_date", "status_flag", "roleId", "isLoading", "success", "pp_pm_id"].includes(key))) {
                if (key === "start_date") {
                    tempData.push({
                        key: index,
                        Field: "Start Date",
                        Value: new Date(val.start_date).toISOString().slice(0, 10)
                    });
                    index += 1;
                } else if (key === "Doctor_type") {
                    tempData.push({
                        key: index,
                        Field: "Doctor Type",
                        Value: val.Doctor_type === 1 ? "Treating Doctor" : val.Doctor_type === 2 ? "Referring Doctor" : "Both (Treating And Referring Doctor)"
                    });
                    index += 1;
                } else if (val[key] !== null && val[key] !== "NULL" && (val[key] !== "")) {
                    tempData.push({
                        key: index,
                        Field: keyMapping[key],
                        Value: val[key]
                    });
                    index += 1;
                }
            }
        });
        setData(tempData);
       // console.log(val)
        setVisible(true);
    }

    return  <>
    <div style={{ minHeight: "20px" }}></div>
   <Row justify='space-between'>          
<Col  style={{fontSize:"25px"}} span={16}>
<i className="fas fa-user-md" /> <b> Employee List</b>
           </Col>

          
   </Row>
   <div style={{ minHeight: "20px" }}></div>
    <Row justify="space-between">
    <Col md={12} sm={12} xs={12}>
<input
            //   className="p-2 input-field my-3"
           
               placeholder="Search Organization"
               onChange={onSearch}
           
               loading={loading}
               style={{width:'100%'}}
           /> 
           </Col>
         
          {getUserData()==="admin"&& <Row justify="end">

           <Col md={24} sm={24} xs={24}>

<NavLink to="/employee-register">
<i  className="fas fa-user-md"  /> New Employee 
</NavLink>
</Col>
    </Row>}
         
           </Row>
           <div style={{ minHeight: "20px" }}></div>
           <Row>
<Col md={24} sm={24} xs={24}>
 <Table locale={locale} scroll={{ x: 500 }} pagination={{ pageSize: 8 }} bordered columns={columns} dataSource={employees} />
</Col>
</Row>
   {ShowEmployeeInfo()}
   {/* {show_password_modal()} */}
</>
}

export default EmployeeList;