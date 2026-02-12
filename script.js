/* --- script.js --- */

// 1. Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Firebase Configuration
// TODO: Replace with your actual keys from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBUJcAth17P01IgRNe_g0t-tYc8CPctdig",
    authDomain: "hamriyaportfolio.firebaseapp.com",
    projectId: "hamriyaportfolio",
    storageBucket: "hamriyaportfolio.firebasestorage.app",
    messagingSenderId: "742298097098",
    appId: "1:742298097098:web:9db92e48ae36cbfaa26b33"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Handle Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page refresh

    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitBtn = document.querySelector('.btn-send');

    // UX: Show loading state
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    try {
      // Send data to Firestore
      const docRef = await addDoc(collection(db, "portfolio_messages"), {
        name: name,
        email: email,
        message: message,
        timestamp: new Date()
      });

      console.log("Message sent with ID: ", docRef.id);
      alert("Message Sent Successfully! I'll get back to you soon.");
      
      // Reset form
      contactForm.reset();

    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      // Reset button
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  });
}n