$(document).ready(function () {
    
    $('#submitBtn').on('click', function (event) {
        event.preventDefault(); // Prevent form submission for validation

        // Clear previous validation errors
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').remove();

        let isValid = true; // Flag to check if form is valid

        // Validate title
        const title = $('input[name="title"]').val().trim();
        if (title === '') {
            $('input[name="title"]').addClass('is-invalid')
                .after('<div class="invalid-feedback">Title is required.</div>');
            isValid = false;
        }

        // Validate description
        const description = $('input[name="description"]').val().trim();
        if (description === '') {
            $('input[name="description"]').addClass('is-invalid')
                .after('<div class="invalid-feedback">Description is required.</div>');
            isValid = false;
        }

        // Validate category
        const category = $('input[name="category"]').val().trim();
        if (category === '') {
            $('input[name="category"]').addClass('is-invalid')
                .after('<div class="invalid-feedback">Category is required.</div>');
            isValid = false;
        }


        // Proceed if form is valid
        if (isValid) {
            // Serialize form data
            const formData = $('#dataForm').serializeArray();

            // Get the HTML content inside #components div
            $('#components .component').each(function() {
                // Find the heading input and content textarea using class selectors
                const headingInput = $(this).find('input[class*="-heading"]');
                const contentTextarea = $(this).find('textarea[class*="-content"]');
                
                // Get their values
                const heading = headingInput.val(); // Get heading input value
                const content = contentTextarea.val(); // Get content textarea value
                
                // Replace the heading input with an <h2> tag containing the input's value
                if (heading) {
                    headingInput.replaceWith(`<h2>${heading}</h2>`); // Replace heading input with <h2>
                }
            
                // Replace the content textarea with a <p> tag containing the textarea's value
                if (content) {
                    contentTextarea.replaceWith(`<p>${content}</p>`); // Replace content textarea with <p>
                }
            });
            
            // Get the modified HTML content inside #components div
            const componentsHTML = $('#components').html();
            console.log(componentsHTML); // Log the updated HTML structure if needed
            // const componentsHTML = $('#components').html();

            // Add the components HTML as an additional item to the serialized form data
            formData.push({ name: 'components', value: componentsHTML });

            // Send data via AJAX
            $.ajax({
                url: FORM_SUBMIT_URL,
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Data submitted successfully!',
                            text: 'Your data has been saved.',
                            confirmButtonText: 'OK', // Custom OK button text
                        }).then(() => {
                            location.reload(); // Refresh the page after the alert is closed
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Submission failed',
                            text: response.message || 'An error occurred during submission.',
                            confirmButtonText: 'OK' // Ensure the button is shown here too
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'Unable to process the request. Please try again later.',
                        confirmButtonText: 'OK' // Ensure the button is shown here too
                    });
                }
            });
        }
    });

    // Remove is-invalid class and error message on input focus
    $('.form-control').on('focus', function () {
        $(this).removeClass('is-invalid');
        $(this).next('.invalid-feedback').remove();
    });
});

let componentIndex = 0;

// Handle drag start
$(document).on('dragstart', '.component', function (e) {
    $(this).addClass('draggable');
    e.originalEvent.dataTransfer.setData('text/plain', $(this).data('type'));
});

// Handle drag end
$(document).on('dragend', '.component', function () {
    $(this).removeClass('draggable');
});

// Allow dropping on the components wrapper
$('#components').on('dragover', function (e) {
    e.preventDefault(); // Prevent default to allow drop
});

// Handle drop event
$('#components').on('drop', function (e) {
    e.preventDefault();
    const type = e.originalEvent.dataTransfer.getData('text/plain');
    $(this).append(getComponentHtml(componentIndex++, type));
});

// Generate the component HTML template based on type
function getComponentHtml(index, type) {
    // Generate a unique class name for this component instance
    const uniqueClass = `component-${type}-${index}`;

    let componentHtml = `
        <div class="component card p-3 mb-3 border ${uniqueClass}" data-index="${index}" draggable="true">
            <h5>${type.charAt(0).toUpperCase() + type.slice(1)} #${index + 1}</h5>
            <button type="button" class="btn btn-danger remove-component">Remove</button>
            <div class="dynamic-fields mt-3"></div>
        </div>
    `;

    // Customizing HTML for different types without name attributes
    if (type === 'form') {
        componentHtml = `
            <div class="dynamic-fields mt-3 ${uniqueClass}">
                ${getFormFieldsHtml()}
            </div>
        `;
    } else if (type === 'card') {
        componentHtml = `
            <div class="component card p-3 mb-3 border ${uniqueClass}" data-index="${index}" draggable="true">
              <h5>Card #${index + 1}</h5>
                <input type="text" class="form-control mb-2 ${uniqueClass}-heading" placeholder="Card Heading">
                <textarea class="form-control mb-2 ${uniqueClass}-content" placeholder="Card Content"></textarea>
            </div>
        `;
    } else if (type === 'accordion') {
        componentHtml = `
            <div class="component card p-3 mb-3 border ${uniqueClass}" data-index="${index}" draggable="true">
                <h5>Accordion #${index + 1}</h5>
                <input type="text" class="form-control mb-2 ${uniqueClass}-heading" placeholder="Accordion Heading">
                <textarea class="form-control mb-2 ${uniqueClass}-content" placeholder="Accordion Content"></textarea>
            </div>
        `;
    }

    return componentHtml;
}

// Generate dynamic form fields HTML template without name attributes
function getFormFieldsHtml() {
    return `
        <form id="customForm" method="post" action="${USER_FORM_SUBMIT_URL}">
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="Enter email" required>
            </div>
            <div class="mb-3">
                <label for="pwd" class="form-label">Password:</label>
                <input type="password" name="password" id="pwd" class="form-control" placeholder="Enter password" required>
            </div>
            <div class="form-check mb-3">
                <label for="remember" class="form-check-label">
                    <input type="checkbox" name="remember" id="remember" class="form-check-input"> Remember me
                </label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
}

// Remove a component
$(document).on('click', '.remove-component', function () {
    $(this).closest('.component').remove();
});

// Add more fields within the form when 'Add Field' is clicked
$(document).on('click', '.add-field', function () {
    $(this).before(`
        <div class="form-group mb-2 field-group">
            <input type="text" name="form_fields[][name]" class="form-control mb-2" placeholder="Field Name">
            <select name="form_fields[][type]" class="form-select">
                <option value="text">Text</option>
                <option value="date">Date</option>
                <option value="file">Image</option>
            </select>
            <button type="button" class="btn btn-danger mt-2 remove-field">Remove Field</button>
        </div>
    `);
});

// Remove a form field
$(document).on('click', '.remove-field', function () {
    $(this).closest('.field-group').remove();
});

// login js
$('#loginForm').on('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation

    // Clear previous validation errors
    $('.form-control').removeClass('is-invalid');
    let isValid = true;

    // Validate username
    const username = $('#username').val().trim();
    if (username === '') {
        $('#username').addClass('is-invalid');
        $('#username').next('.invalid-feedback').text('Username is required.');
        isValid = false;
    }

    // Validate password
    const password = $('#password').val().trim();
    if (password === '') {
        $('#password').addClass('is-invalid');
        $('#password').next('.invalid-feedback').text('Password is required.');
        isValid = false;
    }

    // If form is valid, proceed with AJAX submission
    if (isValid) {
        $.ajax({
            url: LOGIN_URL, // Replace with actual login URL
            type: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: 'Redirecting...',
                        timer: 100,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = DASHBOARD_URL; // Redirect to dashboard
                    });
                } else {
                    // Clear input fields if login fails
                    $('#username, #password').val('');
                    

                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: response.message || 'Invalid credentials.'
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Unable to process the request. Please try again later.'
                });
            }
        });
    }
});

// Remove is-invalid class on input focus
$('.form-control').on('focus', function() {
    $(this).removeClass('is-invalid');
});
// en dlogin js 
// custom form 
$('#customForm').on('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation

    // Clear previous validation errors
    $('.form-control').removeClass('is-invalid');
    let isValid = true;


    // If form is valid, proceed with AJAX submission
    if (isValid) {
        $.ajax({
            url: USER_FORM_SUBMIT_URL, // Replace with actual login URL
            type: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: ' Successful',
                        text: 'Redirecting...',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = ''; // Redirect to dashboard
                    });
                } else {
                    // Clear input fields if login fails
                  
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: response.message || 'Invalid credentials.'
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Unable to process the request. Please try again later.'
                });
            }
        });
    }
});
// custom form end 