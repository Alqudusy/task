import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Form = () => {
    const [isUserSignedUp, setIsUserSignedUp] = useState(true);

    return (
        <>
            {isUserSignedUp ? <LogIn /> : <SignUp />}
            <p className="text-center mt-5">
                {isUserSignedUp ? 'You Dont an Account??' : 'Already have an account??'}
                <button className="btn btn-link text-decoration-none" onClick={() => setIsUserSignedUp((prevState) => !prevState)}>{isUserSignedUp ? 'Sign Up' : 'Sign In'}</button>
            </p>
        </>
    );
}
export default Form;
