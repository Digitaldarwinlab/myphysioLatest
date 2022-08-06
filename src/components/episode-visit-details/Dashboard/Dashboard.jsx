// import React, { useEffect, useState } from "react";
// // import PivotTable from "pivottable";
// import PivotTable from "react-pivottable/PivotTable";
// import PivotTableUI from "react-pivottable/PivotTableUI";
// import { fetchDashboardDetails } from "../../../API/episode-visit-details/episode-visit-api";
// import $ from "jquery";
// import "react-pivottable/pivottable.css";
// import "./Dash.css";

// const Dashboard = (props) => {
//   useEffect(() => {
//     async function data() {
//       let a = [];
//       let response = await fetchDashboardDetails(251);
//       let objLength = Object.keys(response).length;
//       for (let i = 0; i < objLength; i++) {
//         const [name, array] = Object.entries(response)[i];
//         for (let j = 0; j < Object.keys(array).length; j++) {
//           const [arrayName, arrayValue] = Object.entries(array)[j];
//           if (Object.values(arrayValue).length === 9) {
//             for (let l = 0; l < 9; l++) {
//               const [mainName, mainValue] = Object.entries(arrayValue)[l];
//               let b = { date: name, ExerciseName: arrayName };
//               if (mainName !== "image_url" && mainName !== "") {
//                 b["Metrix"] = mainName;
//                 b["value"] = mainValue;
//                 a.push(b);
//               }
//             }
//           } else if (Object.values(arrayValue).length === 5) {
//             for (let m = 0; m < 5; m++) {
//               const [mainName, mainValue] = Object.entries(arrayValue)[m];
//               let b = { date: name, ExerciseName: arrayName };
//               if (mainName !== "image_url" && mainName !== "") {
//                 b["Metrix"] = mainName;
//                 b["value"] = mainValue;
//                 a.push(b);
//               }
//             }
//           }

//           // a.push({
//           //     date: name,
//           //     ExerciseName: arrayName,
//           //     Metrix: array2
//           //   })
//         }
//       }
//       setValue(a);
//     //   console.log(a);
//       //   $("#output").pivot(a, {
//       //     cols: ["date"],
//       //     rows: ["ExerciseName", "Metrix"],
//       //     vals: ["val"],
//       //   });
//     }
//     if (props.patientId) {
//       data();
//     }
//   }, []);
//   const [value, setValue] = useState();
//   return (
//     <div id="output" style={{ width: "100%", height: "100%" }}>
//       {value && (
//         <PivotTableUI
//         data={value}
//         onChange={(s) => setValue(s)}
//           cols={["date"]}
//           rows={["ExerciseName", "Metrix"]}
//           vals={["value"]}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";

import PivotTableUI from "react-pivottable/PivotTableUI";
import PivotTable from "react-pivottable/PivotTable";
import { sortAs } from "react-pivottable/Utilities";

import "react-pivottable/pivottable.css";
import "./Dash.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideConstructor: true,
      pivotTable: {
        rows: ["ExerciseName", "Metrix"],
        cols: ["date"],
        aggregatorName: "Sum",
        vals: ["value"],
        
      }
    };
  }

  render() {
    return (
      <div>

        <PivotTableUI
          data={this.props.value}
          onChange={s => this.setState({ pivotTable: s })}
          {...this.state.pivotTable}
        />
      </div>
    );
  }
}

export default Dashboard;

