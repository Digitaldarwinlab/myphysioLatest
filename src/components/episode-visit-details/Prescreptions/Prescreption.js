{
  /* aswin start 10/30/2021 start */
}
import React, { useState, useEffect } from "react";
import { get_prescription } from "../../../API/Prescription/PresriptionApi";
import { Button, Row, Col, Pagination } from "antd";
import { ImPlus } from "react-icons/im";
import { useHistory } from "react-router-dom";
import "../../../styles/Layout/Episode.css";
import { useSelector } from "react-redux";
import { getEpisode } from "../../../API/Episode/EpisodeApi";
import Loading from "../../UtilityComponents/Loading";
const Prescreptions = ({ prescriptionClick }) => {
  const state = useSelector((state) => state.episodeReducer);
  const [prescriptions, Setprescriptions] = useState([]);
  const history = useHistory();
  const onClick = () => {
    history.push("/notes");
  };

  //  const pp=get_prescription()
  const [paginationState, setPaginationState] = useState({
    totalPage: 5,
    current: 1,
    minIndex: 0,
    maxIndex: 1,
    pageSize: 1,
  });
  const PaginationChange = (page, pageSize = paginationState.pageSize) => {
    setPaginationState({
      ...paginationState,
      pageSize: pageSize,
      total: prescriptions.length / pageSize,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    console.log("stateee");
    console.log(state);
    setLoading(true);
    //    try{
    //     const data=await getEpisode(state.patient_code)

    // //console.log(data[0].pp_ed_id)

    //     const pp=await get_prescription(data[0].pp_ed_id)
    //     console.log('pp is')
    //     console.log(pp)
    // Setprescriptions(pp)

    //    }
    //    catch(err)
    //    {
    //        console.log(err)
    //    }

    const episode = await getEpisode(state.patient_code);
    if (episode[0].pp_ed_id) {
      const prescriptionData = await get_prescription(episode[0].pp_ed_id);
      Setprescriptions(prescriptionData);
      setLoading(false);
      setPaginationState({
        ...paginationState,
        pageSize: 1,
        total: prescriptionData.length / 1,
        current: 1,
        minIndex: (2 - 1) * 1,
        maxIndex: 1 * 2,
      });
    }
  }, [state.patient_code]);

  console.log("HHHHHHHHHHHHsH");
  console.log(prescriptions);
  console.log(typeof prescriptions);
  return (
    <Col span={24} className="px-3 py-3">
      <Row className="m-2">
        <Col lg={18} md={18} sm={18} xs={24}>
          <h4 className="fw-bold">Prescreptions</h4>
        </Col>
        <Col lg={6} md={6} sm={6} xs={24} className="text-end">
          {/* Dipsikha start 23/10 */}
          <Button
            className="button1"
            style={{ color: "white" }}
            id="bnid"
            onClick={prescriptionClick}
          >
            <ImPlus className="me-2" /> {"  "}Add
          </Button>
        </Col>
      </Row>

      {/* {
                
                prescriptions.notes
                ?
        
                        <div  className="border p-1 m-2">
                            <Row className="p-1" justify="space-between">
                <Col  >
                    <h5 className="fw-bold">Date : {prescriptions.date}</h5>
                </Col>
                <Col >
                    <p className="fw-bold" style={{fontSize:'18px'}}><b> Note </b>{prescriptions.notes}</p>
                </Col>
                
                </Row>
             <Row> 
                 <Col lg={18} md={18} sm={18} xs={24}>
            <p>

            {
                            prescriptions.lab_tests && prescriptions.lab_tests.length>0
                            ?
                            prescriptions.lab_tests.map((item,index)=>{
                                return (

                                    <h4><b>Lab Test {index+1} </b> : {  item.path_lab_test} , <b> Radio Lab Test : </b> { item.radio_lab_test} </h4> 
                                )

                            })

                            :
                             null
                        }

                    <h4> <b> Instructions  </b> :   {prescriptions.medication_detail ? prescriptions.medication_detail.length>0 ?  prescriptions.medication_detail[0].instruction : 'No MEdication' : 'No MEdication'}{prescriptions.medication_detail[0].instruction.length===0&&"No Instruction Available"}</h4>
                    <h4> <b> Medicine  </b> :    {prescriptions.medication_detail ? prescriptions.medication_detail.length>0 ? prescriptions.medication_detail.map(item=>{return item.medic_notes})  : null : null} </h4>
                    <h4> <b> Medication Note  </b> :    {prescriptions.medication_detail ? prescriptions.medication_detail.length>0 ? prescriptions.medication_detail.map(item=>{return item.medic_notes}) : null : null} </h4>
                    </p>  
                    </Col> 

                    
                    </Row>  
                    
            </div>
                  
                :
                prescriptions.length==0
                ?

               <h4>NO prescriptions</h4>
               :
               null
                
              
       } */}
      {/* aswin 11/1/2021 start */}
      {prescriptions.length === 1
        ? prescriptions.map(
            (data, index) =>
              //aswin 10/25/2021 start
              index >= paginationState.minIndex ||
              (index + 1 == paginationState.minIndex &&
                index < paginationState.maxIndex && (
                  //aswin 10/25/2021 stop
                  <div key={index} className="px-1 py-1">
                    <Col span={24} className="px-3">
                      {loading && <Loading />}
                      {prescriptions.length === 0 ? (
                        <p className="fw-bold">No Assesment Present..</p>
                      ) : (
                        <>
                          <div className="border p-1 m-2">
                            <Row className="" justify="space-between">
                              <Col>
                                <h5 className="fw-bold">Date : {data.date} </h5>
                              </Col>
                              <Col>
                                <p
                                  className="fw-bold"
                                  style={{ fontSize: "18px" }}
                                >
                                  <b> Note : </b>
                                  {data.notes}
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={18} md={18} sm={18} xs={24}>
                                <p>
                                  {data.lab_tests && data.lab_tests.length > 0
                                    ? data.lab_tests.map((item, index) => {
                                        return (
                                          <h4>
                                            <b>Lab Test {index + 1} </b> :{" "}
                                            {item.path_lab_test} ,{" "}
                                            <b> Radio Lab Test : </b>{" "}
                                            {item.radio_lab_test}{" "}
                                          </h4>
                                        );
                                      })
                                    : null}

                                  <h4>
                                    {" "}
                                    <b> Instructions </b> :{" "}
                                    {data.medication_detail
                                      ? data.medication_detail.length > 0
                                        ? data.medication_detail[0].instruction
                                        : "No MEdication"
                                      : "No MEdication"}
                                    {data.medication_detail[0].instruction
                                      .length === 0 &&
                                      "No Instruction Available"}
                                  </h4>
                                  <h4>
                                    {" "}
                                    <b> Medicine </b> :{" "}
                                    {data.medication_detail
                                      ? data.medication_detail.length > 0
                                        ? data.medication_detail.map((item) => {
                                            return item.medic_notes;
                                          })
                                        : null
                                      : null}{" "}
                                  </h4>
                                  <h4>
                                    {" "}
                                    <b> Medication Note </b> :{" "}
                                    {data.medication_detail
                                      ? data.medication_detail.length > 0
                                        ? data.medication_detail.map((item) => {
                                            return item.medic_notes;
                                          })
                                        : null
                                      : null}{" "}
                                  </h4>
                                </p>
                              </Col>
                            </Row>
                          </div>
                          <center>
                            <Pagination
                              pageSize={paginationState.pageSize}
                              current={paginationState.current}
                              total={prescriptions.length}
                              onChange={PaginationChange}
                              style={{ marginBottom: "10px" }}
                            />
                          </center>
                        </>
                      )}
                    </Col>
                  </div>
                ))
          )
        : prescriptions.map(
            (data, index) =>
              //aswin 10/25/2021 start
              index >= paginationState.minIndex &&
              index < paginationState.maxIndex && (
                //aswin 10/25/2021 stop
                <div key={index} className="px-1 py-1">
                  <Col span={24} className="px-3">
                    {loading && <Loading />}
                    {prescriptions.length === 0 ? (
                      <p className="fw-bold">No Assesment Present..</p>
                    ) : (
                      <>
                        <div className="border p-1 m-2">
                          <Row className="" justify="space-between">
                            <Col>
                              <h5 className="fw-bold">Date : {data.date} </h5>
                            </Col>
                            <Col>
                              <p
                                className="fw-bold"
                                style={{ fontSize: "18px" }}
                              >
                                <b> Note : </b>
                                {data.notes}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={18} md={18} sm={18} xs={24}>
                              <p>
                                {data.lab_tests && data.lab_tests.length > 0
                                  ? data.lab_tests.map((item, index) => {
                                      return (
                                        <h4>
                                          <b>Lab Test {index + 1} </b> :{" "}
                                          {item.path_lab_test} ,{" "}
                                          <b> Radio Lab Test : </b>{" "}
                                          {item.radio_lab_test}{" "}
                                        </h4>
                                      );
                                    })
                                  : null}

                                <h4>
                                  {" "}
                                  <b> Instructions </b> :{" "}
                                  {data.medication_detail
                                    ? data.medication_detail.length > 0
                                      ? data.medication_detail[0].instruction
                                      : "No MEdication"
                                    : "No MEdication"}
                                  {data.medication_detail[0].instruction
                                    .length === 0 && "No Instruction Available"}
                                </h4>
                                <h4>
                                  {" "}
                                  <b> Medicine </b> :{" "}
                                  {data.medication_detail
                                    ? data.medication_detail.length > 0
                                      ? data.medication_detail.map((item) => {
                                          return item.medic_notes;
                                        })
                                      : null
                                    : null}{" "}
                                </h4>
                                <h4>
                                  {" "}
                                  <b> Medication Note </b> :{" "}
                                  {data.medication_detail
                                    ? data.medication_detail.length > 0
                                      ? data.medication_detail.map((item) => {
                                          return item.medic_notes;
                                        })
                                      : null
                                    : null}{" "}
                                </h4>
                              </p>
                            </Col>
                          </Row>
                        </div>
                        <center>
                          <Pagination
                            pageSize={paginationState.pageSize}
                            current={paginationState.current}
                            total={prescriptions.length}
                            onChange={PaginationChange}
                            style={{ marginBottom: "10px" }}
                          />
                        </center>
                      </>
                    )}
                  </Col>
                </div>
              )
          )}
      {}
    </Col>
  );
};
{
  /* aswin 11/1/2021 stop */
}
{
  /* aswin start 10/30/2021 stop */
}
export default Prescreptions;
