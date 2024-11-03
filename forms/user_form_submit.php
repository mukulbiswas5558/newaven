    <?php
    include_once tools("db");
    include_once tools("pager");
    include_once tools("sanitizer");


    // Set content type to JSON for AJAX response
    header('Content-Type: application/json');

    // Retrieve and sanitize input data
    $page_id = sanitize($_POST['page_id'] ?? '');
    $data = sanitize($_POST);
    foreach ($data as $key => $value) {
        $data[$key] = sanitize($value); // Assuming `sanitize` is a function that cleans the input
    }

    // Encode sanitized data as JSON
    $response = json_encode($data);
    $email = 'user@gmail.com';
    

    // Process data and save to database
    $conn = execute(
        "INSERT INTO response (page_id, response, email) 
        VALUES (:page_id, :response, :email)",
        [
            'page_id' => $page_id,
            'response' => $response,
            'email' => $email
        ]
    );
    
    if ($conn) { // Check if the connection object is valid
       
        // Successful insertion response
        echo json_encode([
            'success' => true,
            'message' => 'Data submitted successfully!'
        ]);
    } else {
        // Failed insertion response
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while saving the data.'
        ]);
    }