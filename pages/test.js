// pages/test.js
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const Test = () => {
  const [score, setScore] = useState(0);
  const [userScore, setUserScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Get user score from Firestore
  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      const getUserScore = async () => {
        const userDoc = doc(db, "scores", auth.currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserScore(userSnapshot.data().score);
        }
        setLoading(false);
      };
      getUserScore();
    }
  }, [auth.currentUser]);

  const handleTestCompletion = async () => {
    const userDoc = doc(db, "scores", auth.currentUser.uid);
    await setDoc(userDoc, { score }, { merge: true }); // Save the score
    setUserScore(score); // Update the displayed score
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Test Page</h1>
      <p>Your current score: {userScore || "Not yet scored"}</p>
      {/* Implement the test here, for simplicity, we'll use a static score */}
      <button onClick={() => setScore(score + 1)}>Increase score</button>
      <button onClick={handleTestCompletion}>Submit Score</button>
    </div>
  );
};

export default Test;
