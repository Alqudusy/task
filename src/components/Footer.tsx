import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase-config";

const Footer = () => {
    const userId = auth.currentUser?.uid;
    const [name, setName] = useState('');
    useEffect(() => {
        if (!userId) return;
        const docRef = doc(db, "users", userId);
        const fetchUserName = async () => {
            const name = await getDoc(docRef);
            setName(name.data()?.name);
        }
        fetchUserName();
    }, []);
    return (
        <footer className="footer sticky-bottom bg-primary p-3 d-flex">
            <p className="h5 text-white">{name ? name : 'No name'}</p>
        </footer>
    )
}
export default Footer;
