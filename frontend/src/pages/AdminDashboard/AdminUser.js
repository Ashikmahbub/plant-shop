import { firestore,firebase } from '../../Firebase/Firebase';  

const createUser = (email, password, username) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Store the user role and other info in Firestore
      const userData = {
        uid: user.uid,
        email: user.email,
        username: username,
        role: 'user' // Set role as 'user' by default, or 'admin' if it's an admin
      };

      return firestore.collection('users').doc(user.uid).set(userData);
    })
    .catch(error => {
      console.error("Error creating user: ", error);
    });
};
