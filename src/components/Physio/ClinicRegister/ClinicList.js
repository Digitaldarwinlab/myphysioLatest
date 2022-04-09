import { Col, Row, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillUnlock } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { BsFillEyeFill } from 'react-icons/bs'
import { getUserData } from '../../../API/userAuth/userAuth'
import { getClincList } from '../../../API/Physio/PhysioRegister'

const ClinicList = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  let locale = {
    emptyText: 'No Clinics Found',
  };
  useEffect(() => {
    async function getClinicData() {
        setLoading(true);
        const data = await getClincList();
        setLoading(false);
        setClinics(data);
        // setPaginationState({
        //     ...paginationState,
        //     totalPage: data.length / paginationState.pageSize,
        //     minIndex: 0,
        //     maxIndex: paginationState.pageSize,
        // })
    }
    getClinicData();

}, []);
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          fixed: 'left',
          width: "20%",

        },
        {
          title: "Clinic Code",
          dataIndex: "pp_pm_id",
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
          width: "20%",
          render: (text, record) => (
            <Space size="middle">
               <BsFillEyeFill
               //onClick={() => handleView(record)}
               size={20} />
              {/* <BiEdit onClick={() => handleEdit(record)} size={20} />
              <AiFillUnlock onClick={()=>showmodal(record.uid)} size={20} /> */}
            </Space>
          )
        }
      ];

  return (
    <>
             <div style={{ minHeight: "20px" }}></div>
            <Row justify='space-between'>
       <Col  style={{fontSize:"25px"}} span={16}>
       <i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} /> <b>  Clinics</b>
                    </Col>


            </Row>
            <div style={{ minHeight: "20px" }}></div>
             <Row justify="space-between">
             <Col md={12} sm={12} xs={12}>
        {/* <input
                     //   className="p-2 input-field my-3"

                        placeholder="Search Clinic.."
                     //   onChange={onSearch}

                        loading={loading}
                        style={{width:'100%'}}
                    /> */}
                    </Col>

                   {getUserData()==="admin"&& <Row justify="end">

                    <Col md={24} sm={24} xs={24}>

<NavLink to="/physio/clinic/register">
         <i  className="fas fa-user-md"  />  New Clinic
         </NavLink>
 </Col>
             </Row>}

                    </Row>
                    <div style={{ minHeight: "20px" }}></div>
                    <Row>
        <Col className="pag_large" md={24} sm={24} xs={24}>
          <Table
          locale={locale}
          scroll={{ x: 500 }} pagination={{ pageSize: 8}} bordered columns={columns}
          dataSource={clinics}
          />
        </Col>
        <Col style={{display:'none'}} className="pag_mob" md={24} sm={24} xs={24}>
          <Table
          locale={locale}
          scroll={{ x: 500 }} pagination={{ pageSize: 8,size: "small" }} bordered columns={columns}
          dataSource={clinics}
           />
        </Col>
      </Row>
        </>
  )
}

export default ClinicList