import React, { Component } from "react";
import "./Element.css";

const type_list = ["Spotlight", "type2", "type3"];
const subtype_list = ["subtype1", "subtype2", "subtype3"];
const flag_list = ["flag1", "flag2", "flag3"];

const FallbackElement = ({ unrecog_props, component }) => (
  <div className="Error" title={`"${unrecog_props.join(', ')}" is unrecognized! Please provide valid props to component ${component}!`}>
    Unexpected Joyerror: 001
  </div>
);

class Element extends Component {
  render() {
    const { joydex, type, subtype, flag, component } = this.props;
    const unrecog_array = [];

    [type, subtype, flag].forEach((prop, index) => {
      if (!type_list.includes(prop) && !subtype_list.includes(prop) && !flag_list.includes(prop)) {
        unrecog_array.push(prop);
      }
    });

    if (unrecog_array.length > 0) {
      return <FallbackElement unrecog_props={unrecog_array} component={component} />;
    }

    return (
      <div id={joydex} className={type + subtype + flag}>
      </div>
    );
  }
}

export default Element;

