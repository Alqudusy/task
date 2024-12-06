import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Form = () => {
    const [isUserSignedUp, setIsUserSignedUp] = useState(true);
    const navigate = useNavigate();

    const handleAuthSuccess = () => {
        navigate("/tasks");
    };

    return (
        <div>
            {isUserSignedUp ? (
                <LogIn onAuthSuccess={handleAuthSuccess} />
            ) : (
                <SignUp onAuthSuccess={handleAuthSuccess} />
            )}
            <p className="text-center mt-5">
                {isUserSignedUp ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
                <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => setIsUserSignedUp((prevState) => !prevState)}
                >
                    {isUserSignedUp ? 'Sign Up' : 'Sign In'}
                </button>
            </p>
        </div>
    );
};

export default Form;
