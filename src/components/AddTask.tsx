import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase-config";
import { Task } from "./types";

const AddTask = () => {
    const handleAddTask = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const subject = formData.get("subject") as string;
        const description = formData.get("description") as string;
        const priority = formData.get("priority") as "low" | "medium" | "high";

        if (!subject || !description || !priority) {
            console.error("Form is missing required fields");
            return;
        }

        const task: Task = {
            id: new Date().toISOString(),
            subject,
            description,
            priority,
            completed: false,
        };

        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error("No user logged in");
            return;
        }

        try {
            const docRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(docRef);
            if (userDocSnap.exists()) {
                await updateDoc(docRef, {
                    tasks: arrayUnion(task),
                });
                toast.success("Successfully created a task!");
                console.log(task);
                const form = document.getElementById("modalForm") as HTMLFormElement | null;
                form?.reset();
                setTimeout(() => {
                    window.location.href = window.location.href;
                }, 3000)
            } else {
                console.log("No document found!");
            }
        } catch (error: any) {
            toast.error(error.message);
            console.error(error);
        }
    };

    return (
        <div
            className="modal fade"
            id="add-task-modal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Task</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <form id="modalForm" onSubmit={handleAddTask}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    name="subject"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select className="form-control" name="priority" id="priority" required>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
