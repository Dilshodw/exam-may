import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { API } from "../../utils/config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formError, setFormError] = useState("");
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleInput = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setFormError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setFormError("Passwords do not match!");
            return;
        }

        try {
            const res = await API.post("/signup", {
                name: formData.username,
                email: formData.email,
                key: formData.password,
                secret: "MySecret1",
            });

            localStorage.setItem("key", res.data.data.key);
            localStorage.setItem("secret", res.data.data.secret);
            setAuth(true);
            alert("You have successfully signed up!");
            navigate("/");
        } catch (error) {
            console.error(error);
            setFormError("Username or password is incorrect! Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md p-10">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
                        Register
                    </h2>

                    <label
                        htmlFor="username"
                        className="mb-2 block text-gray-700 text-sm font-medium"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleInput}
                        required
                        className="w-full px-4 py-2 border rounded-md border-gray-300 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <label
                        htmlFor="email"
                        className="mb-2 block text-gray-700 text-sm font-medium"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInput}
                        required
                        className="w-full px-4 py-2 border rounded-md border-gray-300 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <label
                        htmlFor="password"
                        className="mb-2 block text-gray-700 text-sm font-medium"
                    >
                        Password
                    </label>
                    <div className="relative mb-5">
                        <input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 border rounded-md border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible((v) => !v)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                            aria-label={passwordVisible ? "Hide password" : "Show password"}
                        >
                            {passwordVisible ? (
                                <AiOutlineEyeInvisible size={20} />
                            ) : (
                                <AiOutlineEye size={20} />
                            )}
                        </button>
                    </div>

                    <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-gray-700 text-sm font-medium"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInput}
                        required
                        className={`w-full px-4 py-2 rounded-md mb-5 border ${formData.password !== formData.confirmPassword &&
                                formData.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                            } focus:outline-none focus:ring-2 ${formData.password !== formData.confirmPassword &&
                                formData.confirmPassword
                                ? "focus:ring-red-500"
                                : "focus:ring-indigo-500"
                            }`}
                    />

                    {formError && (
                        <p className="text-red-600 text-sm mb-5">{formError}</p>
                    )}

                    <button
                        type="submit"
                        className="py-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
                    >
                        Submit
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-indigo-600 hover:underline">
                        Sign in here
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Register;
