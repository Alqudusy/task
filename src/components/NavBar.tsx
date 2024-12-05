import { signOut } from "firebase/auth";
import AddTask from "./AddTask";
import { auth } from "./firebase-config";

const NavBar = () => {
    const handleSignout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Task Manager</a>
                    <div>
                        <button className="btn btn-outline-light me-2" onClick={handleSignout}>
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
            <div className="navbar navbar-expand-lg bg-secondary">
                <div className="container-fluid">
                    <button className="btn btn-outline-light me-2">Dark Theme</button>
                    {/* Modal Trigger */}
                    <button
                        type="button"
                        className="btn btn-outline-light me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#add-task-modal"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <AddTask />
        </>
    );
};

export default NavBar;
