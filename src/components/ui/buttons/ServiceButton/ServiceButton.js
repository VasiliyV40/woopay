import React from 'react';
import classes from './button.module.scss';
import {Link} from "react-router-dom";

const ServiceButton = (props) => {
  const {link} = props
  return (
    <div style={{height: "100%"}}>
      <Link to={`./${link}`}>
        <div className={`${classes.wrapper} ${props.vertical ? classes.vertical : null} ${props.roundIcon ? classes.service : null}`}>
          {
            props.icon ? <img src={props.icon} style={props.bgColor && props.roundIcon ? { background: props.bgColor } : null} className={`${props.roundIcon ? classes.round : null}`}/> : null
          }
          <div className={props.vertical ? classes.verticalText : classes.text}>
            {props?.title}
          </div>
        </div>
      </Link>
    </div>

  );
};

export default ServiceButton;