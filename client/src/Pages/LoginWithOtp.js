import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/homepage.png';

function LoginWithOtp(props) {
    const [portal, setPortal] = useState(false);
    const [number, setnumber] = useState('');
    const mobileRef = React.createRef();
    const otpRef = React.createRef();
    const navigate = useNavigate();

    const sendOtp = () => {
        const phone = mobileRef.current.value;
        if (mobileRef.current.value !== '') {
            axios
                .post('http://localhost:4000/api/auth/sendotp', {
                    phone,
                })
                .then((response) => {
                    setPortal(true);
                    setnumber(response.data.phone);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const verifyotp = () => {
        const otp = otpRef.current.value;
        const phone = number;
        if (otpRef.current.value !== '') {
            axios
                .post('http://localhost:4000/api/auth/verifyotp', {
                    phone,
                    otp,
                })
                .then((response) => {
                    localStorage.setItem('loginToken', response.data.token);
                    console.log(
                        'lets go to chatroom with token',
                        response.data.token
                    );

                    props.setupSocket();
                    navigate('/chatroom');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="block md:flex">
            <div className="flex basis-1/2 h-screen justify-center items-center">
                <div className="flex flex-col bg-fuchsia-300 w-11/12 md:w-2/3 rounded-lg justify-center items-center">
                    <h2 className="text-2xl text-gray-900 font-semibold m-4 p-4 font-mono">
                        Login
                    </h2>
                    {portal ? (
                        <div className='flex flex-col justify-center items-center w-full'>
                            <div className="w-4/5">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Enter Otp
                                </label>
                                <input
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="enter Otp"
                                    ref={otpRef}
                                />
                            </div>

                            <button
                                className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-4/5 px-5 py-2.5 text-center my-4"
                                onClick={verifyotp}
                            >
                                Verify
                            </button>
                        </div>
                    ) : (
                        <div className='flex flex-col justify-center items-center w-full'>
                            <div className="w-4/5">
                                <label
                                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                                    htmlFor="email"
                                >
                                    Mobile no.
                                </label>
                                <input
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="enter mobile no."
                                    ref={mobileRef}
                                />
                            </div>

                            <button
                                className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-4/5 px-5 py-2.5 text-center my-4"
                                onClick={sendOtp}
                            >
                                Send otp
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-slate-400 h-screen basis-1/2 hidden md:block">
                <img
                    className="w-full h-full"
                    src={background}
                    alt="homepage icon"
                />
            </div>
        </div>

        /*{<div className="card">
            <div className="cardHeader">Login</div>
            {portal ? (
                <div className="cardBody">
                    <div className="inputGroup">
                        <label htmlFor="email">Enter Otp</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="enter Otp"
                            ref={otpRef}
                        />
                    </div>

                    <button onClick={verifyotp}>Verify</button>
                </div>
            ) : (
                <div className="cardBody">
                    <div className="inputGroup">
                        <label htmlFor="email">Mobile no.</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="enter mobile no."
                            ref={mobileRef}
                        />
                    </div>

                    <button onClick={sendOtp}>Send otp</button>
                </div>
            )}
        </div>
}*/
    );
}

export default LoginWithOtp;
