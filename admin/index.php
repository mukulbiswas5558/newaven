<?php

define("VERSION", "1.0.0");
define("TOOLS", dirname(__FILE__) . "/tools/");

// Paths
// define("PATH", $_SERVER["DOCUMENT_ROOT"]); // for production
define("PATH", $_SERVER["DOCUMENT_ROOT"] . "/avenger"); // for development

// URLs
// define("URL", "https://--.--"); // for production
define("URL", "http://localhost/avenger"); // for development

// Static Files
define("STATIC_URL", URL . "/static");

// Database
define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASS", "");
define("DB_NAME", "avenger"); // for development

// Tools function
function tools($path)
{
    $Path = PATH . "/tools/$path.php";
    if (file_exists($Path)) {
        return $Path;
    } else {
        echo "<br>No tools found at <b><u>$Path</u></b><br/>";
    }
}

// module function
function module($path)
{
    $Path = PATH . "/$path.php";
    if (file_exists($Path)) {
        return $Path;
    } else {
        echo "<br>No module found at <b><u>$Path</u></b><br/>";
    }
}
