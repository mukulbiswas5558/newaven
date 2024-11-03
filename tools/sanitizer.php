<?php

function sanitize($data, $allowed_tags = '')
{
    if (is_array($data)) {
        // Recursively sanitize each element in the array
        return array_map(function ($item) use ($allowed_tags) {
            return sanitize($item, $allowed_tags);
        }, $data);
    } else {
        // Trim the input to remove unnecessary whitespace
        $data = trim($data);

        // Remove backslashes (\)
        $data = stripslashes($data);

        // Strip HTML and PHP tags, allowing certain tags if specified
        $data = strip_tags($data, $allowed_tags);

        // Convert special characters to HTML entities to prevent XSS
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');

        // escape shell commands
        $data = escapeshellcmd($data);

        // Optionally escape strings to prevent SQL injection if needed
        $data = addslashes($data);

        return $data;
    }
}
