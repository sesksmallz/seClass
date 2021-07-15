import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { BeatLoader } from 'react-spinners';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import loginSvg from '../assets/time-management-animate.svg';
import api from '../network/api';
import setAuthToken from '../network/set-auth.token';
import K from '../constants';
import { setUser } from '../store/reducers/auth.reducer';
import parseServerErrors from '../utils/parse-server-errors';

const AuthPage = () => {
	const [tabNo, setTabNo] = useState(0);
	const [registering, setRegistering] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);
	const [, setCookie] = useCookies([K.ACCESS_TOKEN]);
	const history = useHistory();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	// redirect to tasks page if logged in
	useEffect(() => {
		if (auth.authenticated) {
			history.push('/tasks');
		}
	}, [auth.authenticated, history]);

	const loginForm = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			setLoggingIn(true);
			try {
				const { data } = await api.post('/auth/login', values);

				// set auth token
				setAuthToken(data.token);
				setCookie(K.ACCESS_TOKEN, data.token);

				dispatch(setUser(data.user));
			} catch (error) {
				const msg = parseServerErrors(error);
				toast.error(msg);
				setLoggingIn(false);
			}
		},
		validationSchema: Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().min(8).max(32).required(),
		}),
	});

	const registerForm = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
		onSubmit: async (values) => {
			setRegistering(true);
			try {
				const { data } = await api.post('/auth/register', values);

				// set auth token
				setAuthToken(data.token);
				setCookie(K.ACCESS_TOKEN, data.token);

				dispatch(setUser(data.user));
			} catch (error) {
				const msg = parseServerErrors(error);
				toast.error(msg);
				setRegistering(false);
			}
		},
		validationSchema: Yup.object({
			username: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().min(8).max(32).required(),
			password_confirmation: Yup.string()
				.oneOf([Yup.ref('password')], 'Passwords should match')
				.required('Confirm password is required'),
		}),
	});

	return (
		<>
			<div className="form-body container-fluid">
				<div className="website-logo">
					<Link to="/">
						<div className="logo">
							<h3 className="app-logo">Taskly</h3>
						</div>
					</Link>
				</div>
				<div className="row">
					<div className="img-holder">
						<div className="bg" />
						<div className="info-holder">
							<img src={loginSvg} alt="login-svg" />
						</div>
					</div>
					<div className="form-holder">
						<div className="form-content">
							<div className="form-items">
								<h3>
									<span className="logo-txt">Taskly</span> - Just do it
								</h3>
								<p>Manage Your Tasks With Ease</p>
								<div className="page-links">
									<span
										onClick={() => setTabNo(0)}
										className={`tab ${tabNo === 0 ? 'active' : ''}`}
									>
										Login
									</span>
									<span
										onClick={() => setTabNo(1)}
										className={`tab ${tabNo === 1 ? 'active' : ''}`}
									>
										Register
									</span>
								</div>
								{tabNo === 0 ? (
									<form onSubmit={loginForm.handleSubmit}>
										<input
											className={`form-control ${loginForm.errors.email ? 'form-error' : ''}`}
											id="email"
											type="text"
											name="email"
											placeholder="E-mail Address"
											onChange={loginForm.handleChange}
											value={loginForm.values.email}
										/>
										<input
											className={`form-control ${loginForm.errors.password ? 'form-error' : ''}`}
											type="password"
											name="password"
											placeholder="Password"
											onChange={loginForm.handleChange}
											value={loginForm.values.password}
										/>
										<ul>
											{Object.values(loginForm.errors).map(
												(error) =>
													({ error } && (
														<li className="error-p" key={error}>
															{error}
														</li>
													))
											)}
										</ul>
										<div className="form-button">
											<button id="submit" disabled={loggingIn} type="submit" className="ibtn">
												{loggingIn ? <BeatLoader size={10} color="#0093ff" /> : 'Login'}
											</button>
										</div>
									</form>
								) : (
									<form onSubmit={registerForm.handleSubmit}>
										<input
											className={`form-control ${registerForm.errors.username ? 'form-error' : ''}`}
											type="text"
											name="username"
											placeholder="Username"
											onChange={registerForm.handleChange}
											value={registerForm.values.username}
										/>
										<input
											className={`form-control ${registerForm.errors.email ? 'form-error' : ''}`}
											type="text"
											name="email"
											placeholder="E-mail Address"
											onChange={registerForm.handleChange}
											value={registerForm.values.email}
										/>
										<input
											className={`form-control ${registerForm.errors.password ? 'form-error' : ''}`}
											type="password"
											name="password"
											placeholder="Password"
											onChange={registerForm.handleChange}
											value={registerForm.values.password}
										/>
										<input
											className={`form-control ${
												registerForm.errors.password_confirmation ? 'form-error' : ''
											}`}
											type="password"
											name="password_confirmation"
											placeholder="Confirm password"
											onChange={registerForm.handleChange}
											value={registerForm.values.password_confirmation}
										/>
										<ul>
											{Object.values(registerForm.errors).map(
												(error) =>
													({ error } && (
														<li className="error-p" key={error}>
															{error}
														</li>
													))
											)}
										</ul>
										<div className="form-button">
											<button id="submit" disabled={registering} type="submit" className="ibtn">
												{registering ? <BeatLoader size={10} color="#0093ff" /> : 'Register'}
											</button>
										</div>
									</form>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default AuthPage;
