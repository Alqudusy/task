import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase-config";
import Footer from "./components/Footer";
import Form from "./components/Form";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import TaskItem from "./components/TaskList";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        console.log("Success");
      } else {
        setUser(null);
        console.log("No user found");
      }
    })
    return () => unsubscribe();
  }, []);
  return (
    <>
      {user ? (
        <>
          <NavBar />
          <TaskItem />
          <Footer />
        </>
      ) : (
        <>
          <Form />
        </>
      )}
      <Notification />
    </>
  )
}

export default App
