import React from "react";
function Button({
                    title,
                    variant = "contained",
                    color = "primary",
    type="button",
    onClick,
                }){
    let className="w_100 py_2 ";
    if (variant==="contained"){
    className+="bg_"+color+" text_white";}
    else if(variant==="outlined"){
        className+="border_"+color+" text_"+color;
        }
    return <button className={className} onClick={onClick}>{title} </button>;
}
export default Button