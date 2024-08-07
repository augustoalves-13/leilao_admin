import "./index.scss";
import { useState } from "react";

const Button = (props) => {
  const root = document.documentElement;
  const [color, setColor] = useState(
    getComputedStyle(root).getPropertyValue(`$${props.color}`).trim()
  );

  const onHover = () => {
    setColor(
      getComputedStyle(root).getPropertyValue(`$${props.color}-hover`).trim()
    );
  };

  switch (props.type) {
    case "outlined":
      return(
        <button
          onMouseLeave={onHover}
          className="button-container-main outlined"
          style={{ borderColor: props.color ? color : "#AC2C42", color: props.color ? color : "#AC2C42"}}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      )

    case "progress":
      return (
        <button
          onMouseLeave={onHover}
          className="button-container-main"
          style={{ backgroundColor: props.color ? color : "#810419", ...(props.size !== null) && {width: `${props.size}rem`, height: `${props.size / 3}rem`}}}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.disabled ? <div className="progress"></div> : props.children}
        </button>
      );
    default:
      return (
        <button
          onMouseLeave={onHover}
          className="button-container-main"
          style={{ backgroundColor: props.color ? color : "#810419", ...(props.size !== null)  && {width: `${props.size}rem`, height: `${props.size / 3}rem`}}}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      );
  }
};

export default Button;
