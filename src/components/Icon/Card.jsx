import React from "react";

const Card = ({ children }) => {
	return (
		<div className="card bg-base-100 w-96 shadow-xl border border-gray-200">
			<div className="card-body">{children}</div>
		</div>
	);
};

export default Card;