import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Protected({ children, authentication = true }) {
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		if (authentication && authStatus !== authentication) {
			navigate("/login");
		} else if (!authentication && authStatus !== authentication) {
			navigate("/");
		}
		setLoader(false);
	}, [authStatus, navigate, authentication]);

	return loader ? (
		<div className="h-screen w-full bg-[#1f1d1d] text-center flex justify-center relative">
			<span className="absolute loader top-5"></span>
		</div>
	) : (
		<>{children}</>
	);
}
