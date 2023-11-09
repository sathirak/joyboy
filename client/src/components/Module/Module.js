import React, { Component} from "react"
import "./Module.css"

class Module extends Component {
    render() {
      const { joydex, type, size, text } = this.props;
      let cardStyles = {};
  
      switch (size) {
        case 'small':
          cardStyles = {
            width: '150px',
            height: '100px',
          };
          break;
        case 'medium':
          cardStyles = {
            width: '250px',
            height: '200px',
          };
          break;
        case 'large':
          cardStyles = {
            width: '350px',
            height: '300px',
          };
          break;
        default:
          
          cardStyles = {
            width: '250px',
            height: '200px',
          };
      }


      switch (type) {
        case 'small':
          cardStyles = {
            width: '150px',
            height: '100px',
          };
          break;
        case 'medium':
          cardStyles = {
            width: '250px',
            height: '200px',
          };
          break;
        case 'large':
          cardStyles = {
            width: '350px',
            height: '300px',
          };
          break;
        default:
          
          cardStyles = {
            width: '250px',
            height: '200px',
          };
      }
  
      return (
        <div id={joydex} style={cardStyles} className="card">
          <p>{text}</p>
        </div>
      );
    }
  }
  
  export default Module;