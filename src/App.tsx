import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { auth } from "./components/firebase-config";
import Footer from "./components/Footer";
import Form from "./components/Form";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import TaskItem from "./components/TaskList";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <h1 className='text-center'>Loading...</h1>; // Optional loading indicator

  return (
    <Router>
      <Notification />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/tasks" /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={user ? <Navigate to="/tasks" /> : <Form />} />
        <Route path="/tasks" element={user ? <AuthenticatedApp /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const AuthenticatedApp = () => (
  <>
    <NavBar />
    <TaskItem />
    <Footer />
  </>
);

export default App;
