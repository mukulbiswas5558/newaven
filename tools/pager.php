<?php
include_once tools("db");

function View($name, $var = [])
{
    $component = PATH . "/views/$name.php";

    extract($var);

    if (file_exists($component)) {
        include $component;
    } else {
        echo $_SERVER['DOCUMENT_ROOT'] . PHP_EOL;
        echo "View $name not found at <b><u>$component</u></b><br>";
    }

    echo PHP_EOL;
}

function url($path = "")
{
    return URL . "/$path";
}

function static_url($path, $version = 1)
{
    if ($version == 0) {
        return STATIC_URL . "/$path";
    }
    return STATIC_URL . "/$path?v=" . VERSION;
}

function Meta($metas = [])
{
    foreach ($metas as $meta) {
        $meta_start = "<meta";
        $meta_body = "";
        foreach ($meta as $k => $v) {
            $meta_body .= " $k=\"$v\"";
        }
        $meta_end = isset($meta['content']) ? ">" : " />";

        echo $meta_start . $meta_body . $meta_end . PHP_EOL; // Add a new line for readability
    }
}


function Table($data = [], $id = '', $class = '')
{
    $id_attr = $id ? " id=\"$id\"" : '';
    $class_attr = $class ? " class=\"$class\"" : '';
    echo "<table$id_attr$class_attr>" . PHP_EOL;
    foreach ($data as $row) {
        echo "  <tr>" . PHP_EOL;
        foreach ($row as $cell) {
            echo "    <td>$cell</td>" . PHP_EOL;
        }
        echo "  </tr>" . PHP_EOL;
    }
    echo "</table$id_attr$class_attr>" . PHP_EOL;
}


function reset_url($url, $time = 5)
{
    echo "
    <script>
        setTimeout(() => {
            history.replaceState(null, null, '$url');
        }, $time * 1000);
    </script>
    ";
}


function protected_page()
{
    session_start();
    if (!isset($_SESSION['role'])) {
        header('Location: ' . url("login"));
        exit();
    }
}

function admin_page()
{
    session_start();
    if (!isset($_SESSION['role'])) {
        header('Location: ' . url("login"));
        exit();
    }

    if ($_SESSION['role'] != 0 && $_SESSION['role'] != "0") {
        header('Location: ' . url("login"));
        exit();
    }
}


function logout()
{
    session_start();

    // Unset all session variables
    global $_SESSION;
    $_SESSION = [];

    // Destroy the session
    session_destroy();

    // Send headers to prevent caching
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    // Redirect to the home page or login page
    header("Location: " . url("login"));
    exit();
}


