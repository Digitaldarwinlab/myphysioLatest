import { Col, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillUnlock } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { getUserData } from "../../../API/userAuth/userAuth";
import { getClincList, searchClinic } from "../../../API/Physio/PhysioRegister";
import { useDispatch } from "react-redux";
import { CLINIC_STATE_CHANGE } from "../../../contextStore/actions/ClinicRegister";
import { useHistory } from "react-router-dom";
import { keyMapping } from "../PhysioList/PhysioList";
const ClinicList = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clinicData, setClinicData] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let locale = {
    emptyText: "No Clinics Found",
  };
  useEffect(() => {
    async function getClinicData() {
      setLoading(true);
      const data = await getClincList();
      let rev = data.reverse();
      setLoading(false);
       setClinics(rev);
      // setPaginationState({
      //     ...paginationState,
      //     totalPage: data.length / paginationState.pageSize,
      //     minIndex: 0,
      //     maxIndex: paginationState.pageSize,
      // })
    }
    getClinicData();
  }, []);
  const handleView = (val) => {
    console.log(val);
    let tempData = [];
    let keys = Object.keys(val);
    let index = 0;
    keys.forEach((key) => {
      if (
        ![
          "last_update_date",
          "last_update_by",
          "status_flag",
          "pp_cm_id"
        ].includes(key)
      ) {
        if (key === "start_date") {
          tempData.push({
            key: index,
            Field: "Start Date",
            Value: new Date(val.start_date).toISOString().slice(0, 10),
          });
          index += 1;
        } else if (key === "name") {
          tempData.push({
            key: index,
            Field: "Clinic",
            Value: val.name
          });
          index += 1;
        } else if (key === "address_1") {
          tempData.push({
            key: index,
            Field: "Address 1",
            Value: val.address_1 
          });
          index += 1;
        }else if (key === "address_2") {
          tempData.push({
            key: index,
            Field: "Address 2",
            Value: val.address_2 
          });
          index += 1;
        }else if (key === "address_3") {
          tempData.push({
            key: index,
            Field: "Address 3",
            Value: val.address_3 
          });
          index += 1;
        } else if (
          val[key] !== null &&
          val[key] !== "NULL"
        ) {
          tempData.push({
            key: index,
            Field: keyMapping[key],
            Value: val[key],
          });
          index += 1;
        }
      }
    });
    console.log(tempData);
    setClinicData(tempData);
    // console.log(val)
    setVisible(true);
  };
  const onSearch = async (e) => {
    let val = e.target.value;
    setLoading(true);
    const data = await searchClinic(val);
    let rev = data.reverse();
    setLoading(false);
    setClinics(rev);
  };
  const ShowPhysioInfo = () => {
    return (
      <Modal
        visible={visible}
        footer={null}
        closable
        onCancel={() => setVisible(false)}
        title=""
        centered
      >
        <Table
          pagination={false}
          scroll={{ y: 400 }}
          showHeader={false}
          columns={[
            {
              title: "Field",
              dataIndex: "Field",
              render: (text) => <p className="fw-bold">{text}</p>,
            },
            { title: "Value", dataIndex: "Value" },
          ]}
          dataSource={clinicData}
        />
      </Modal>
    );
  };
  const handleEdit = (record) => {
    if (Object.keys(record).length > 0) {
      Object.keys(record).map((data) => {
        if (record[data] !== null) {
          if ((data !== "last_update_date" && data !== "last_update_by")) {
            console.log(data," ", record[data])
            dispatch({
              type: CLINIC_STATE_CHANGE,
              payload: {
                key: data,
                value: record[data],
              },
            });
           }
        }
      });
    }
    dispatch({
      type: CLINIC_STATE_CHANGE,
      payload: {
        key: "status_flag",
        value: false,
      },
    });
    history.push("/clinic/update");
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: "20%",
    },
    {
      title: "Clinic Code",
      dataIndex: "clinic_code",
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
      fixed: "right",
      width: "20%",
      render: (text, record) => (
        <Space size="middle">
          <BsFillEyeFill
            onClick={() => handleView(record)}
            size={20}
          />
          <BiEdit onClick={() => handleEdit(record)} size={20} />
          {/* <AiFillUnlock onClick={()=>showmodal(record.uid)} size={20} /> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ minHeight: "20px" }}></div>
      <Row justify="space-between">
        <Col style={{ fontSize: "25px" }} span={16}>
          <i
            className="fas fa-clinic-medical"
            size={18}
            style={{ position: "relative", top: "1px", fontSize: "18px" }}
          />{" "}
          <b> Clinics</b>
        </Col>
      </Row>
      <div style={{ minHeight: "20px" }}></div>
      <Row justify="space-between">
        <Col md={12} sm={12} xs={12}>
          <input
            //   className="p-2 input-field my-3"

            placeholder="Search Clinic.."
            onChange={onSearch}
            loading={loading}
            style={{ width: "100%" }}
          />
        </Col>

        {getUserData() === "admin" && (
          <Row justify="end">
            <Col md={24} sm={24} xs={24}>
              <NavLink to="/clinic/register">
                <i     className="fas fa-clinic-medical" /> New Clinic
              </NavLink>
            </Col>
          </Row>
        )}
      </Row>
      <div style={{ minHeight: "20px" }}></div>
      <Row>
        <Col className="pag_large" md={24} sm={24} xs={24}>
          <Table
            locale={locale}
            scroll={{ x: 500 }}
            pagination={{ pageSize: 8 }}
            bordered
            columns={columns}
            dataSource={clinics}
          />
        </Col>
        <Col
          style={{ display: "none" }}
          className="pag_mob"
          md={24}
          sm={24}
          xs={24}
        >
          <Table
            locale={locale}
            scroll={{ x: 500 }}
            pagination={{ pageSize: 8, size: "small" }}
            bordered
            columns={columns}
            dataSource={clinics}
          />
        </Col>
      </Row>
      {ShowPhysioInfo()}
    </>
  );
};

export default ClinicList;
