document.addEventListener('DOMContentLoaded', function () {
    // Check if there is saved data in web storage
    const savedData = JSON.parse(localStorage.getItem('registrationFormData')) || [];

    // Update the table with all saved data
    savedData.forEach(updateTable);

    // Add event listener for the form submission
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            dob: document.getElementById('dob').value,
            acceptTerms: document.getElementById('acceptTerms').checked,
        };

        // Validate date of birth
        const dobDate = new Date(formData.dob);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dobDate.getFullYear();

        if (age < 18 || age > 55) {
            alert('Please enter a valid date of birth between ages 18 and 55.');
            return;
        }

        // Add the new form data to the array
        savedData.push(formData);

        // Save all form data to web storage
        localStorage.setItem('registrationFormData', JSON.stringify(savedData));

        // Update the table with the new form data
        updateTable(formData);

        // Reset the form
        document.getElementById('registrationForm').reset();

        // For now, just alert the user that the form has been submitted
        alert('Form submitted successfully!');
    });

    // Function to update the table with form data
    function updateTable(data) {
        const tableBody = document.querySelector('#dataTable tbody');

        // Create a new row for each data item
        const newRow = document.createElement('tr');

        const cell1 = document.createElement('td');
        cell1.textContent = data.name;
        newRow.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = data.email;
        newRow.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.textContent = data.password;
        newRow.appendChild(cell3);

        const cell4 = document.createElement('td');
        cell4.textContent = data.dob;
        newRow.appendChild(cell4);

        const cell5 = document.createElement('td');
        cell5.textContent = data.acceptTerms ? 'Yes' : 'No';
        newRow.appendChild(cell5);

        // Append the new row to the table
        tableBody.appendChild(newRow);
    }
});
