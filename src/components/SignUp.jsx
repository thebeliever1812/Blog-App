import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/auth/authSlice";
import { Button, Input } from "./index";

function SignUp() {
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	async function accountCreation(data) {
		setError("");
		try {
			const session = await authService.createAccount(data);
			if (session) {
				const userData = authService.getCurrentUser();
				if (userData) {
					dispatch(authLogin(userData));
					navigate("/");
				}
			}
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<div className="flex items-center justify-center">
			<div
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to create account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Already have an account?&nbsp;
					<Link
						to="/login"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}

				<form onSubmit={handleSubmit(accountCreation)}>
					<div className="space-y-5">
						{/* Input Field for Name */}
						<Input
							label="Full Name:"
							type="password"
							placeholder="Enter Full Name"
							{...register("name", {
								required: true,
								maxLength: 20,
								pattern: {
									value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
									message: "Enter a valid full name",
								},
							})}
							aria-invalid={errors.name ? "true" : "false"}
						/>
						{errors.name && <p role="alert">{errors.name.message}</p>}

						{/* Input Field for Email */}
						<Input
							label="E-mail: "
							type="email"
							placeholder="Enter your email"
							{...register("email", {
								required: true,
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Invalid email address",
								},
							})}
							aria-invalid={errors.email ? "true" : "false"}
						/>
						{errors.email?.type === required && (
							<p role="alert">Email address is required</p>
						)}

						{/* Input Field for Password */}
						<Input
							label="Password"
							type="password"
							placeholder="Enter password"
							{...register("password", { required: true })}
							aria-invalid={errors.password ? "true" : "false"}
						/>
						{errors.password && <p role="alert">Password is incorrect</p>}

                        <Button type="submit" className="w-full">Sign Up</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
