import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { API } from "../../utils/config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React from "react";
const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleInput = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setLoginError("");
    };

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/signup", {
                name: formData.username,
                key: formData.password,
                secret: "MySecret1",
            });

            localStorage.setItem("key", response.data.data.key);
            localStorage.setItem("secret", response.data.data.secret);
            setAuth(true);
            alert("You have successfully signed in!");
            navigate("/");
        } catch (error) {
            console.error(error);
            setLoginError(
                "Incorrect username or password. Please check and try again."
            );
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md p-10">
                <form onSubmit={submitLogin} className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900">
                        Log In
                    </h1>

                    <label
                        htmlFor="username"
                        className="mb-2 block text-gray-700 text-sm font-medium"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInput}
                        placeholder="Enter username"
                        required
                        className="w-full px-4 py-2 border rounded-md border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <label
                        htmlFor="password"
                        className="mb-2 block text-gray-700 text-sm font-medium"
                    >
                        Password
                    </label>
                    <div className="relative mb-6">
                        <input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInput}
                            placeholder="Enter password"
                            required
                            className="w-full px-4 py-2 border rounded-md border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible((v) => !v)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                            aria-label={passwordVisible ? "Hide password" : "Show password"}
                        >
                            {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                    </div>

                    {loginError && (
                        <p className="text-red-600 text-sm mb-4">{loginError}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-indigo-600 hover:underline">
                        Sign up here
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;
