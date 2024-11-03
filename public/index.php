<?php

require_once '../core/Router.php';
require_once '../app/controllers/HomeController.php';
require_once '../app/controllers/UserController.php';

// Initialize the router
$router = new Router();

// Define routes
$router->add('/', function() {
    $controller = new HomeController();
    $controller->index();
});

$router->add('/user', function() {
    $controller = new UserController();
    $controller->index();
});
$router->add('/profile', function() {
    $controller = new UserController();
    $controller->index();
});

// Get the current URL (without query parameters)
$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Dispatch the route
$router->dispatch($url);