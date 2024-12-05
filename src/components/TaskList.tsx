import { onAuthStateChanged } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditTask from "./EditTask";
import { auth, db } from "./firebase-config";
import { Task } from "./types";

const TaskItem = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const docRef = doc(db, "users", userId);

                const unsubscribeSnapshot = onSnapshot(docRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        setTasks(data.tasks || []);
                    } else {
                        console.log("No document found");
                        setTasks([]);
                    }
                    setLoading(false); // Loading finished
                });

                return () => unsubscribeSnapshot();
            } else {
                console.log("No user is logged in");
                setTasks([]);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const handleEditClick = (task: Task) => {
        setSelectedTask(task); // Set the task that is being edited
    };
    const handleMarkAsRead = async (task: Task) => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) return;

            const docRef = doc(db, "users", userId);
            const userDoc = await getDoc(docRef);
            const userTasks = userDoc.data()?.tasks;

            if (!userTasks) throw new Error("Tasks not found");

            const taskToUpdate = userTasks.find((t: Task) => t.id === task.id);
            if (!taskToUpdate) throw new Error("Task not found");

            const updatedTask = { ...taskToUpdate, completed: !task.completed };

            // Remove the old task and add the updated task
            await updateDoc(docRef, {
                tasks: arrayRemove(taskToUpdate),
            });
            await updateDoc(docRef, {
                tasks: arrayUnion(updatedTask),
            });

            toast.success(`Task marked as ${updatedTask.completed ? "completed" : "incomplete"}`);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to update task");
        }
    };
    const handleDeleteTask = async (task: Task) => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) return;
            const docRef = doc(db, 'users', userId);
            const userDoc = await getDoc(docRef);
            const userTasks = userDoc.data()?.tasks;
            if (!userTasks) throw new Error("No task available");
            const taskToDelete = userTasks.find((t: Task) => t.id === task.id);
            await updateDoc(docRef, {
                tasks: arrayRemove(taskToDelete)
            })
            toast.success("Task deleted");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div>
            {loading ? (
                <h3 className="text-center">Loading tasks...</h3>
            ) : tasks.length > 0 ? (
                tasks.map((task) => (
                    <div className="card mt-5 mb-3 mx-auto" style={{ maxWidth: "600px" }} key={`${task.id}`}>
                        <div className="card-body">
                            <h4 className={task.completed ? "card-title text-decoration-line-through" : "card-title"}>{task.subject}</h4>
                            <p className={task.completed ? "card-text text-decoration-line-through" : "card-text"}>{task.description}</p>
                            <p className={task.priority === 'high' ? "badge bg-danger p-2" : task.priority === "medium" ? "badge bg-warning p-2" : "badge bg-secondary p-2"}>
                                Priority: {task.priority}
                            </p>
                            <div className="mt-3 mx-auto d-flex justify-content-evenly flex-wrap gap-2 align-items-center">
                                <button
                                    className="btn btn-primary me-2 px-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit-task-modal"
                                    onClick={() => handleEditClick(task)} // Pass the selected task to state
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-primary me-2 px-3" onClick={() => handleMarkAsRead(task)}>
                                    {!task.completed ? (<i className="fas fa-check"></i>) : (<p>&#10004;</p>)}
                                </button>
                                <button className="btn btn-danger px-3" onClick={() => handleDeleteTask(task)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h3 className="text-center">You have no tasks available</h3>
            )}

            {selectedTask && (
                <EditTask task={selectedTask} />
            )}
        </div>
    );
};

export default TaskItem;
