
document.addEventListener('DOMContentLoaded', function() {
	// // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
	// // The Firebase SDK is initialized and available here!
	//
	// firebase.auth().onAuthStateChanged(user => { });
	// firebase.database().ref('/path/to/ref').on('value', snapshot => { });
	// firebase.messaging().requestPermission().then(() => { });
	// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
	//
	// // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

	try {
		let app = firebase.app();
		let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        console.log(`Firebase SDK loaded with ${features.join(', ')}`);

	} catch (e) {
		console.error(e);
		console.log('Error loading the Firebase SDK, check the console.');
    }
    
    // Referencing messages collections
    const messageRef = firebase.database().ref('messages'); 


    document.getElementById('contactForm').addEventListener('submit', submitForm); 
    
    function submitForm(e) {
        e.preventDefault(); // stops the form from submitting back to the page
        
        let name = getInputVal('name');
        let email = getInputVal('email');
        let subject = getInputVal('msg_subject');
        let message = getInputVal('message');

        // Save to collection
        saveMessage(name, email, subject, message);

        // Show alert
        document.querySelector('.alert').style.display = 'block';

        // Hide alert after three seconds
        setTimeout(function() {
            document.querySelector('.alert').style.display = 'none';  
        }, 3000);

        // Clear form
        document.getElementById('contactForm').reset();

        // axios.get(`http://localhost:5001/portfolio-a7255/us-central1/sendMail?dest=${email}`).then(resp => {

        //     console.log(resp.text);
        // });
    };

    // Get the form values
    function getInputVal(id) {
        return document.getElementById(id).value;
    };

    // Save contact info to firebase
    function saveMessage(name, email, subject, message) {
        const newMessageRef = messageRef.push();
        newMessageRef.set({
            name: name,
            email: email,
            subject: subject,
            message: message
        });
    }

});