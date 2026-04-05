import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
    GoogleAuthProvider, 
   FacebookAuthProvider
} from "firebase/auth";
import { app } from "../Firebase/Firebase";

// Create the AuthContext
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to create a new user
  const createUser = async (email, password) => {
    setLoading(true);
    setError(""); // Reset error
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set the newly created user
      setLoading(false);
      return { success: true, error: null };
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setError("The email is already in use. Please try a different email.");
      } else {
        setError("An error occurred. Please try again.");
      }
      return { success: false, error: error.message };
    }
  };

  // Function to sign in an existing user
  const userSignIn = async (email, password) => {
    setLoading(true);
    setError(""); // Reset error
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set the logged-in user
      setLoading(false);
      return { success: true, error: null };
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else {
        setError("An error occurred. Please try again.");
      }
      return { success: false, error: error.message };
    }
  };

  // Function to sign out the user
  const userSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null); // Reset user after sign-out
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      setError("An error occurred while signing out. Please try again.");
      return { success: false, error: error.message };
    }
  };

  // Function to update user profile
  const updateUserProfile = async (name, photo) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
        // Update local user state to reflect changes
        setUser({
          ...auth.currentUser,
          displayName: name,
          photoURL: photo,
        });
        return { success: true };
      } catch (error) {
        setError("Profile update failed. Please try again.");
        return { success: false, error: error.message };
      }
    }
  };
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };


  // Listen for auth state changes (e.g., on page load or when auth state changes)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Values to be provided to the context consumers
  const authInfo = {
    user,
    loading,
    createUser,
    userSignIn,
    userSignOut,
    updateUserProfile,
    signInWithGoogle,
    signInWithFacebook,
    error, // Error state for forms or UI feedback
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children} {/* Render children only after loading is complete */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
