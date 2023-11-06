import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export const SubtitleTable = (props) =>{  
    return (
    <>
    <div className="subtitleTable">
      <div style={{display:"inline-flex"}}>
        <Typography  >
          Legendas:
        </Typography> 
      </div>  
      {props.subtitle.map(({ description, icon }, index) => (
        <div style={{display:"inline-flex"}} key={description}>
          <Typography  >
            {description}
          </Typography> 
          {icon}          
        </div>  
      ))}
    </div>
    <Divider />
  </>
    )
}