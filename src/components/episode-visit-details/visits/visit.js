import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button, Space } from "antd";
import { fetchVisits } from "../../../API/episode-visit-details/episode-visit-api";
import AddButton from "./../AddButton";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { delete_visit } from "../../../API/Visit/visitApi";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { AiFillDelete } from "react-icons/ai";
const columns = [
  {
    title: "Visit",
    dataIndex: "visit",
    width:'15%',
    fixed: 'left'
  },
  {
    title: "Date",
    dataIndex: "date",
    width:'20%'
  },
  {
    title: "Location",
    dataIndex: "Location",
    width:'20%'
  },
  {
    title: "Time",
    dataIndex: "time",
    width:'20%'
  },
  {
    title: "VideoCon Link",
    dataIndex: "conLink",
    width:'20%',
    render: (link) => (
      <a href={"/physio" + link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    ),
  },
  {
    title: "Delete",
    dataIndex: "Delete",
    width:'20%',
    fixed: 'right',
  },
];

const Visits = ({ handleClick, patId }) => {
  const history = useHistory();
  const [visitsData, setVisitData] = useState([]);
  const { confirm } = Modal;
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.episodeReducer);

  const handleEdit = (id) => {
    // console.log(id, "Visit Edit Button");
  };

  const consultClick = () => {
    history.push({
      pathname: "/assessment/1",
      state: {
        type: "Consultation",
      },
    });
  };
  function showDeleteConfirm(value) {
    confirm({
      title: "Are you sure delete this Visit?",
      icon: <ExclamationCircleOutlined />,
      content: "This Visit will be deleted forever",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        remove_visit(value);
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  const remove_visit = async (e) => {
    // console.log('on clicsk')
    // console.log(e.pp_vd_id)
    const response = await delete_visit(e.pp_vd_id);
    // console.log(response)
    if (state.patient_code) {
      const newdata = await fetchVisits(state.patient_code);

      const filteredData1 = newdata.map((val, index) => {
        // console.log('visit iss')
        // console.log(val)
        return {
          key: val.pp_vd_id,
          visit: index + 1,
          date: new Date(val.appointment_detail.startDate)
            .toISOString()
            .slice(0, 10),
          Location: val.location,
          time: val.appointment_detail.start_time,
          edit: (
            <BiEdit
              className="iconClass3"
              title="Edit"
              onClick={() => handleEdit(val.pp_vd_id)}
            />
          ),
          conLink: val.video_link,
          Delete: (
            <Button
              className=""
              type="primary"
              danger
              onClick={() => showDeleteConfirm(val)}
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </Button>
          ),
        };
      });
      setVisitData(filteredData1);
    } else {
      //console.log('nope')
      setVisitData([]);
    }
  };

  useEffect(() => {
    async function getVisitsForPatient() {
      setLoading(true);
      if (state.patient_code) {
        const data = await fetchVisits(state.patient_code);
        // console.log(data)
        const filteredData = data.map((val, index) => {
          return {
            key: val.pp_vd_id,
            visit: index + 1,
            date: new Date(val.appointment_detail.startDate)
              .toISOString()
              .slice(0, 10),
            Location: val.location,
            time: val.appointment_detail.start_time,
            edit: (
              <BiEdit
                className="iconClass3"
                title="Edit"
                onClick={() => handleEdit(val.pp_vd_id)}
              />
            ),
            conLink: val.video_link,
            Delete: (
              <Button
               
                type="primary"
                danger
                onClick={() => showDeleteConfirm(val)}
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </Button>
            ),
          };
        });
        setVisitData(filteredData);
      } else {
        //console.log('nope')
        setVisitData([]);
      }
      setLoading(false);
    }
    getVisitsForPatient();
  }, [state.patient_code]);
  return (
    <div className="px-2 py-2">
      <Row>
        <Col span={24} className="text-end mb-3">
          <Space>
            <AddButton onClick={handleClick} />
            <Button onClick={consultClick}>Consultation</Button>
          </Space>
        </Col>
        <Col span={24} className="mt-2">
          <Table
            columns={columns}
            scroll={{x:500}}
            dataSource={visitsData}
            bordered
            loading={loading}
            sticky
          />
        </Col>
      </Row>
    </div>
  );
};

export default Visits;
