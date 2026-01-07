// DOM Elements
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const errorMsg = document.getElementById("errorMsg");
const totalCount = document.getElementById("totalCount");

// Input Fields
const nameInput = document.getElementById("name");
const idInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");

// State
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;


// Validation Function
function validateInputs(name, id, email, contact) {
  errorMsg.textContent = "";

  const nameRegex = /^[A-Za-z\s]+$/;
  const numberRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !id || !email || !contact) {
    errorMsg.textContent = "⚠️ All fields are required";
    return false;
  }

  if (!nameRegex.test(name)) {
    errorMsg.textContent = "⚠️ Name must contain only letters";
    return false;
  }

  if (!numberRegex.test(id)) {
    errorMsg.textContent = "⚠️ Student ID must contain only numbers";
    return false;
  }

  if (!numberRegex.test(contact)) {
    errorMsg.textContent = "⚠️ Contact number must contain only numbers";
    return false;
  }

  if (contact.length < 10) {
    errorMsg.textContent = "⚠️ Contact number must be at least 10 digits";
    return false;
  }

  if (!emailRegex.test(email)) {
    errorMsg.textContent = "⚠️ Please enter a valid email address";
    return false;
  }

  return true;
}

// Display Students
function displayStudents() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Update count
  totalCount.textContent = students.length;

  // Save to Local Storage
  localStorage.setItem("students", JSON.stringify(students));
}

// Add / Update Student
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const id = idInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();

  if (!validateInputs(name, id, email, contact)) return;

  const studentData = {
    name,
    id,
    email,
    contact
  };

  if (editIndex === null) {
    // Add new student
    students.push(studentData);
  } else {
    // Update existing student
    students[editIndex] = studentData;
    editIndex = null;
    form.querySelector("button").textContent = "Save Student";
  }

  form.reset();
  displayStudents();
});

// Edit Student
function editStudent(index) {
  const student = students[index];

  nameInput.value = student.name;
  idInput.value = student.id;
  emailInput.value = student.email;
  contactInput.value = student.contact;

  editIndex = index;
  form.querySelector("button").textContent = "Update Student";
}

// Delete Student
function deleteStudent(index) {
  const confirmDelete = confirm("Are you sure you want to delete this record?");
  if (confirmDelete) {
    students.splice(index, 1);
    displayStudents();
  }
}


// Initial Load
displayStudents();
