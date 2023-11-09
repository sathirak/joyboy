import React, { useEffect, useState } from "react";
import "./Spotlight.css";
import Element from "../Element/Element";

const data = ["123456-ds","123453-ev","123451-fd"];

function Spotlight() {

	return (
	  <section className="Spotlight">
		{data.map((item, index) => (
		  <Element key={index} joydex={item} type="Spotlight" subtype="Unfocused" component="Spotlight" />
		))}
	  </section>
	);
	
  }



export default Spotlight;
