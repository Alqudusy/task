import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "./firebase-config";
const LogIn: React.FC = () => {
    const handleSignIn = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData) as {
            email: string;
            password: string;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("user signed in successfully");
        } catch (error: any) {
            console.log(error)
            toast.error("An error Occurred", error.message);
        }
    }
    return (
        <div className="sign-in">
            <h1 className="text-center mb-4">Welcome Back Please LogIn</h1>
            <form className="mx-auto p-4 border rounded shadow-sm" style={{ maxWidth: "400px" }} onSubmit={handleSignIn}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" name="password" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>
        </div>
    )
}

export default LogIn;
