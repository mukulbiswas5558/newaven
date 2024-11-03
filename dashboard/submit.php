    <?php
    include_once tools("db");
    include_once tools("pager");
    include_once tools("sanitizer");

    admin_page();

    // Set content type to JSON for AJAX response
    header('Content-Type: application/json');

    // Retrieve and sanitize input data
    $title = sanitize($_POST['title'] ?? '');
    $description = sanitize($_POST['description'] ?? '');
    $category = sanitize($_POST['category'] ?? '');
    $subcategory = sanitize($_POST['subcategory'] ?? '');
    $content = $_POST['components'] ?? '';
    
    $created_by = $_SESSION['username'];
    $updated_by = $_SESSION['username'];

    // Check required fields
    if (!$title || !$description || !$category || !$content) {
        echo json_encode([
            'success' => false,
            'message' => 'Title, description, and category and content are required.'
        ]);
        exit();
    }

    // Process data and save to database
    $conn = execute(
        "INSERT INTO page (title, description, category, subcategory, content, created_by, updated_by) 
        VALUES (:title, :description, :category, :subcategory, :content, :created_by, :updated_by)",
        [
            'title' => $title,
            'description' => $description,
            'category' => $category,
            'subcategory' => $subcategory,
            'content' => $content,
            'created_by' => $created_by,
            'updated_by' => $updated_by
        ]
    );
    
    if ($conn) { // Check if the connection object is valid
        // Get the last inserted ID
        $lastInsertId = $conn->lastInsertId();
    
        // Assuming you have a link value ready to update
        $link = url("forms")."?id=".$lastInsertId; // Replace with your actual link value
        
    
        // Update the page table to set the link column value
        $updated = execute(
            "UPDATE page SET link = :link WHERE id = :id",
            [
                'link' => $link,
                'id' => $lastInsertId
            ]
        );
    
        // Successful insertion response
        echo json_encode([
            'success' => true,
            'message' => 'Data submitted successfully!',
            'redirect' => url("dashboard")
        ]);
    } else {
        // Failed insertion response
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while saving the data.'
        ]);
    }