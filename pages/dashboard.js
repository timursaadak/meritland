// pages/dashboard.js
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [score, setScore] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      const getUserScore = async () => {
        const userDoc = doc(db, "scores", auth.currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setScore(userSnapshot.data().score);
        }
      };
      getUserScore();
    }
  }, [auth.currentUser]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your current score: {score ? score : "No score yet"}</p>
    </div>
  );
};

export default Dashboard;
