import React from "react";
import "./validationText.css";

export const ValidationText = ({ status, message }) => {
	return (
		<div className="d-flex align-items-center rse-valid-text">
			{status === "success" ? (
				<span className="aui-icon aui-icon-small aui-iconfont-check-circle-filled rse-success">
					success
				</span>
			) : (
				<span className="aui-icon aui-icon-small aui-iconfont-error rse-error">
					Error!
				</span>
			)}
			<p
				style={{ color: status !== "success" && "#DE350B" }}
				className={status === "success" ? "rse-success" : "rse-error"}
			>
				{message}
			</p>
		</div>
	);
};
