import React, { Component } from "react";
import "./FormFlowTab.css";

export class FormFlowTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let _tabNumber = this.props.tabNumber;
    let _bgColor2 =
      _tabNumber === 2 || _tabNumber === 3 ? "#ffb800" : "#dfe5ea";
    let _bgColor3 = this.props.tabNumber === 3 ? "#ffb800" : "#dfe5ea";

    return (
      <div className="formflow-row">
        <div className="formflow-circle" style={{ backgroundColor: "#ffb800" }}>
          1
        </div>
        <div
          className="formflow-line"
          style={{ backgroundColor: _bgColor2 }}
        ></div>
        <div className="formflow-circle" style={{ backgroundColor: _bgColor2 }}>
          2
        </div>
        <div
          className="formflow-line"
          style={{ backgroundColor: _bgColor3 }}
        ></div>
        <div className="formflow-circle" style={{ backgroundColor: _bgColor3 }}>
          3
        </div>
      </div>
    );
  }
}

export default FormFlowTab;
