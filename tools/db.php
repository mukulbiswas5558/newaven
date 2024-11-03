<?php

$con_str = [
    "host" => DB_HOST,
    "user" => DB_USER,
    "pass" => DB_PASS,
    "db" => DB_NAME 
];

function fetch($query, $params = [])
{
    global $con_str;
    try {
        $conn = new PDO("mysql:host={$con_str["host"]};dbname={$con_str["db"]}", $con_str["user"], $con_str["pass"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return [];
    }
}

function row($query, $params = [])
{
    global $con_str;
    try {
        $conn = new PDO("mysql:host={$con_str["host"]};dbname={$con_str["db"]}", $con_str["user"], $con_str["pass"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return [];
    }
}

function column($query, $params = [])
{
    global $con_str;
    try {
        $conn = new PDO("mysql:host={$con_str["host"]};dbname={$con_str["db"]}", $con_str["user"], $con_str["pass"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    } catch (PDOException $e) {
        return [];
    }
}

function value($query, $params = [])
{
    global $con_str;
    try {
        $conn = new PDO("mysql:host={$con_str["host"]};dbname={$con_str["db"]}", $con_str["user"], $con_str["pass"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchColumn();
    } catch (PDOException $e) {
        return [];
    }
}

function execute($query, $params = [])
{
    global $con_str;
    try {
        $conn = new PDO("mysql:host={$con_str["host"]};dbname={$con_str["db"]}", $con_str["user"], $con_str["pass"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        return $conn; // Return the connection object
    } catch (PDOException $e) {
        return null; // Return null on failure
    }
}
