<?php
include_once tools("pager");

admin_page();

$title = "Admin Edit Dashboard";
// echo $title;
// die();
View("common/header", ["title" => $title]);
View("main");
View("common/footer");


?>
