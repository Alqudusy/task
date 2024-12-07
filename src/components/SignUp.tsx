import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from './firebase-config.ts';
const SignUp = () => {
    const handleSignUp = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { name, email, password } = Object.fromEntries(formData) as {
            name: string;
            email: string;
            password: string;
        };
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
            // Save user data in Firestore with UID
            await setDoc(doc(db, "users", res.user.uid), {
                name: name,
                email: email,
                createdAt: new Date().toISOString(),
                tasks: [],
            });
            toast.success("Account Created Successfully");
        } catch (err: any) {
            console.error(err);
            toast.error(err.message);
        }
    };
    return (
        <div className="sign-up container my-5">
            <h1 className="text-center mb-4">Welcome to Task Management Webapp</h1>
            <form
                className="mx-auto p-4 border rounded shadow-sm"
                style={{ maxWidth: "400px" }}
                onSubmit={handleSignUp}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        name="agree"
                        id="agree"
                        className="form-check-input"
                        required
                    />
                    <label htmlFor="agree" className="form-check-label">
                        By signing up, you agree to our{" "}
                        <a href="#" className="text-decoration-underline">
                            Terms and Conditions
                        </a>.
                    </label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
        </div>
    );
};
export default SignUp;
