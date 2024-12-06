import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "./firebase-config";

const SignUp = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("password mismatch");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's display name
            if (displayName) {
                await updateProfile(user, { displayName });
            }

            onAuthSuccess(); // Notify parent of successful signup
            toast.success("Signed up successfully")
        } catch (err: any) {
            console.log(err);
            toast.error(err.message)
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sign Up</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="displayName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="displayName"
                        value={displayName}
                        placeholder="Enter your full name"
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
