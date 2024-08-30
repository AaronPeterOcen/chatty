import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // Import Firebase Storage functions

// Async function to handle file upload to Firebase Storage
const upload = async (file) => {
  // Initialize Firebase Storage
  const storage = getStorage();

  // Create a reference to a location in Firebase Storage where the file will be saved
  // Using a timestamp + file name to ensure a unique path
  const storageRef = ref(storage, `images/${Date.now() + file.name}`);

  // Start the file upload process using the Resumable Upload feature
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Monitor the upload process
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Calculate and log the upload progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      // Log different states of the upload process
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle any errors during the upload process
      console.error("Upload failed:", error);
    },
    () => {
      // When the upload is complete, get the download URL of the uploaded file
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // Resolve the promise with the download URL
        resolve(downloadURL);
        console.log("File available at", downloadURL);
      });
    }
  );
};

export default upload;
