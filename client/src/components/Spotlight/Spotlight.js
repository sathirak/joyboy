import React, { useEffect, useState } from "react";
import "./Spotlight.css";
import Module from "../Module/Module";

const data = ["123456-ds","123453-ev","123451-fd"];

function Spotlight() {

	return (
	  <section className="Spotlight">
		{data.map((item, index) => (
		  <Module key={index} joydex={item} size="small" text="Small Card Content" />
		))}
	  </section>
	);
	
  }



export default Spotlight;
