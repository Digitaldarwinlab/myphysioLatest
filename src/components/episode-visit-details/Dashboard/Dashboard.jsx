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
        // aggregatorName: "Sum",
        vals: ["value"],
      },
    };
  }
  render() {
      console.log(this.props.value)
    return (
      <div style={{maxWidth:'fit-content',overflow:'auto'}}>
        {this.props.value !== undefined ? (
          <> 
            {this.props.value.length > 0 ? (
              <PivotTableUI
                data={this.props.value}
                onChange={(s) => this.setState({ pivotTable: s })}
                {...this.state.pivotTable}
              />
            ) : (
              <p className="fw-bold text-center">No Data Found..</p>
            )}
          </>
        )
    :<p className="fw-bold text-center">No Data Found..</p>}
      </div>
    );
  }
}

export default Dashboard;
