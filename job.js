const form = document.getElementById("applicationForm");

// Input fields
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const dob = document.getElementById("dob");
const interviewTime = document.getElementById("interviewTime");
const role = document.getElementById("role");
const experience = document.getElementById("experience");
const coverLetter = document.getElementById("coverLetter");
const terms = document.getElementById("terms");

// File inputs
const profilePhoto = document.getElementById("profilePhoto");
const resume = document.getElementById("resume");

// Buttons
const photoButton = document.getElementById("photoButton");
const resumeButton = document.getElementById("resumeButton");

// File name text
const photoName = document.getElementById("photoName");
const resumeName = document.getElementById("resumeName");

// Application container
const applicationContainer =
    document.getElementById("applicationContainer");


// ===============================
// FILE BUTTONS
// ===============================

photoButton.addEventListener("click", function () {
    profilePhoto.click();
});

resumeButton.addEventListener("click", function () {
    resume.click();
});


// Show selected photo name
profilePhoto.addEventListener("change", function () {

    if (profilePhoto.files.length > 0) {
        photoName.innerText = profilePhoto.files[0].name;
    } else {
        photoName.innerText = "No photo selected";
    }

});


// Show selected resume name
resume.addEventListener("change", function () {

    if (resume.files.length > 0) {
        resumeName.innerText = resume.files[0].name;
    } else {
        resumeName.innerText = "No resume selected";
    }

});


// ===============================
// FORM SUBMIT
// ===============================

form.addEventListener("submit", function (event) {

    // Page reload hone se rokega
    event.preventDefault();

    // Pehle saare errors clear
    clearErrors();

    let isValid = true;


    // ===============================
    // NAME VALIDATION
    // ===============================

    if (name.value.trim() === "") {

        showError("nameError", "Name is required");
        isValid = false;

    } 
    else if (name.value.trim().length < 3) {

        showError(
            "nameError",
            "Name must contain at least 3 characters"
        );

        isValid = false;
    }


    // ===============================
    // EMAIL VALIDATION
    // ===============================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        showError("emailError", "Email is required");
        isValid = false;

    }
    else if (!emailPattern.test(email.value.trim())) {

        showError(
            "emailError",
            "Enter a valid email address"
        );

        isValid = false;
    }


    // ===============================
    // PHONE VALIDATION
    // ===============================

    const phonePattern = /^[0-9]{10}$/;

    if (phone.value.trim() === "") {

        showError("phoneError", "Phone number is required");
        isValid = false;

    }
    else if (!phonePattern.test(phone.value.trim())) {

        showError(
            "phoneError",
            "Phone number must contain exactly 10 digits"
        );

        isValid = false;
    }


    // ===============================
    // PASSWORD VALIDATION
    // ===============================

    /*
       Password rules:

       Minimum 8 characters
       At least 1 uppercase
       At least 1 lowercase
       At least 1 number
    */

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (password.value === "") {

        showError(
            "passwordError",
            "Password is required"
        );

        isValid = false;

    }
    else if (!passwordPattern.test(password.value)) {

        showError(
            "passwordError",
            "Password must be 8+ characters with uppercase, lowercase and number"
        );

        isValid = false;
    }


    // ===============================
    // DOB VALIDATION
    // ===============================

    if (dob.value === "") {

        showError(
            "dobError",
            "Date of birth is required"
        );

        isValid = false;
    }


    // ===============================
    // INTERVIEW TIME
    // ===============================

    if (interviewTime.value === "") {

        showError(
            "timeError",
            "Please select interview time"
        );

        isValid = false;
    }


    // ===============================
    // GENDER VALIDATION
    // ===============================

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    if (!gender) {

        showError(
            "genderError",
            "Please select your gender"
        );

        isValid = false;
    }


    // ===============================
    // JOB ROLE
    // ===============================

    if (role.value === "") {

        showError(
            "roleError",
            "Please select a job role"
        );

        isValid = false;
    }


    // ===============================
    // EXPERIENCE
    // ===============================

    if (experience.value === "") {

        showError(
            "experienceError",
            "Experience is required"
        );

        isValid = false;

    }
    else if (
        experience.value < 0 ||
        experience.value > 40
    ) {

        showError(
            "experienceError",
            "Experience must be between 0 and 40 years"
        );

        isValid = false;
    }


    // ===============================
    // SKILLS
    // ===============================

    const skills =
        document.querySelectorAll(
            'input[name="skills"]:checked'
        );

    if (skills.length === 0) {

        showError(
            "skillsError",
            "Select at least one skill"
        );

        isValid = false;
    }


    // ===============================
    // COVER LETTER
    // ===============================

    if (coverLetter.value.trim() === "") {

        showError(
            "coverLetterError",
            "Cover letter is required"
        );

        isValid = false;

    }
    else if (coverLetter.value.trim().length < 20) {

        showError(
            "coverLetterError",
            "Cover letter must contain at least 20 characters"
        );

        isValid = false;
    }


    // ===============================
    // PROFILE PHOTO
    // ===============================

    if (profilePhoto.files.length === 0) {

        showError(
            "photoError",
            "Please select a profile photo"
        );

        isValid = false;
    }


    // ===============================
    // RESUME
    // ===============================

    if (resume.files.length === 0) {

        showError(
            "resumeError",
            "Please select your resume"
        );

        isValid = false;
    }


    // ===============================
    // TERMS
    // ===============================

    if (!terms.checked) {

        showError(
            "termsError",
            "You must agree to the terms"
        );

        isValid = false;
    }


    // ===============================
    // FINAL RESULT
    // ===============================

    if (isValid) {

        alert("Application submitted successfully! 🎉");

        createApplication();

        form.reset();

        photoName.innerText = "No photo selected";
        resumeName.innerText = "No resume selected";
    }

});


// ===============================
// SHOW ERROR FUNCTION
// ===============================

function showError(id, message) {

    document.getElementById(id).innerText = message;
}


// ===============================
// CLEAR ALL ERRORS
// ===============================

function clearErrors() {

    const errors =
        document.querySelectorAll("small");

    errors.forEach(function (error) {
        error.innerText = "";
    });
}

function createApplication() {

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    const selectedSkills =
        document.querySelectorAll(
            'input[name="skills"]:checked'
        );

    let skillsArray = [];

    selectedSkills.forEach(function (skill) {
        skillsArray.push(skill.value);
    });


    // ===============================
    // CREATE CARD
    // ===============================

    const card = document.createElement("div");

    card.classList.add("application-card");


    // ===============================
    // CREATE PROFILE PHOTO
    // ===============================

    const img = document.createElement("img");

    img.src = URL.createObjectURL(profilePhoto.files[0]);

    img.alt = "Profile Photo";

    img.classList.add("profile-image");


    // ===============================
    // CARD CONTENT
    // ===============================

    card.innerHTML = `

        <h3>${name.value}</h3>

        <p>
            <strong>Email:</strong>
            ${email.value}
        </p>

        <p>
            <strong>Phone:</strong>
            ${phone.value}
        </p>

        <p>
            <strong>Date of Birth:</strong>
            ${dob.value}
        </p>

        <p>
            <strong>Interview Time:</strong>
            ${interviewTime.value}
        </p>

        <p>
            <strong>Gender:</strong>
            ${gender.value}
        </p>

        <p>
            <strong>Job Role:</strong>
            ${role.value}
        </p>

        <p>
            <strong>Experience:</strong>
            ${experience.value} years
        </p>

        <p>
            <strong>Skills:</strong>
            ${skillsArray.join(", ")}
        </p>

        <p>
            <strong>Cover Letter:</strong>
            ${coverLetter.value}
        </p>


        <p>
            <strong>Resume:</strong>
            ${resume.files[0].name}
        </p>

    `;


    card.prepend(img);


    applicationContainer.appendChild(card);
}