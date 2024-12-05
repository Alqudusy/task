import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase-config";
import { Task } from "./types";

const EditTask = ({ task }: { task: any }) => {
    const [subject, setSubject] = useState(task.subject);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [id, setId] = useState(task.id);
    const [completed, setCompleted] = useState(task.completed);

    useEffect(() => {
        setSubject(task.subject); // Update the form with selected task data
        setDescription(task.description);
        setPriority(task.priority);
        setId(task.id);
        setCompleted(task.completed);
    }, [task]);

    const handleEditTask = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        let previousData = { subject, description, priority, id };
        console.log(previousData);
        const userId = auth.currentUser?.uid
        const formData = new FormData(e.target);
        const updatedData: Task = {
            description: formData.get('description') as string || '',
            id: id,
            priority: formData.get('priority') as 'low' | 'high' | 'medium',
            subject: formData.get('subject') as string || '',
            completed: completed
        }
        if (!userId) return;
        const docRef = doc(db, 'users', userId);
        try {
            const userDoc = await getDoc(docRef);
            const currentTasks = userDoc.data()?.tasks || [];
            const taskToRemove = currentTasks.find((task: Task) => task.id === id);
            if (!taskToRemove) {
                throw new Error("task not found")
            }
            await updateDoc(docRef, {
                tasks: arrayRemove(taskToRemove)
            })
            await updateDoc(docRef, {
                tasks: arrayUnion(updatedData)
            })
            console.log("Task Updated successfully");
            const form = document.getElementById("modalForm") as HTMLFormElement | null;
            form?.reset();
            setTimeout(() => {
                window.location.href = window.location.href;
            }, 3000)
            toast.success("Updated the task successfully")
        } catch (error: any) {
            toast.error(error.message)
        }
        console.log('Updated Task:', { subject, description, priority, id });
    };

    return (
        <div
            className="modal fade"
            id="edit-task-modal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <form id="modalForm" onSubmit={handleEditTask}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    name="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select
                                    className="form-control"
                                    name="priority"
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    required
                                >
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
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
