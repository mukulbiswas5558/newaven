<?php
include_once tools("db");
include_once tools("pager");
include_once tools("sanitizer");


session_start();

// Set content type to JSON for AJAX response
header('Content-Type: application/json');

// Retrieve input data
$username = sanitize($_POST['username']);
$password = sanitize($_POST['password']);

if (!$username || !$password) {
    // Respond with JSON error if username or password is missing
    echo json_encode([
        'success' => false,
        'message' => 'Username and password are required.'
    ]);
    exit();
}

// Fetch user data
$user = row(
    "SELECT password, role FROM users WHERE username = :username",
    ["username" => $username]
);

if ($user && password_verify($password, $user['password'])) {
    // Set session variables on successful login
    $_SESSION['username'] = $username;
    $_SESSION['role'] = $user['role'];

    // Respond with JSON success message
    echo json_encode([
        'success' => true,
        'message' => 'Login successful.',
        'redirect' => url("dashboard")
    ]);
    exit();
} else {
    // Respond with JSON error for invalid credentials
    echo json_encode([
        'success' => false,
        'message' => 'Invalid username or password.'
    ]);
    exit();
}

// session_start();
// header('Content-Type: application/json');
// $username = sanitize($_POST['username']);
// $password = sanitize($_POST['password']);

// if (!$username || !$password) {
//     header('Location: ' . url("login"));
//     exit();
// }

// $user = row(
//     "SELECT password, role FROM users WHERE username = :username",
//     ["username" => $username]
// );
// // print_r($user);
// // die();
// if (password_verify($password, $user['password'])) {
//     $_SESSION['username'] = $username;
//     $_SESSION['role'] =  $user['role'];

//     header('Location: ' . url("dashboard"));
//     exit();
// } else {
//     header('Location: ' . url("login"));
//     exit();
// }
