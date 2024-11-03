<?php
include_once tools("pager");


$title = "Login Page Page Maker";

View("common/header", ["title" => $title]);
View("login");
View("common/footer");


?>
