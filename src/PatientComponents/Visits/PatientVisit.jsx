import React, { useState, useEffect } from "react";
import { fetchVisits } from "../../API/episode-visit-details/episode-visit-api";

const PatientVisit = () => {
  const [allvisits, Setvisits] = useState([]);
  useEffect(async () => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    const patientVisits = await fetchVisits(userId);
    console.log(patientVisits);
    Setvisits(patientVisits);
  }, []);
  return <div>PatientVisit</div>;
};

export default PatientVisit;
