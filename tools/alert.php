<?php

function swal($message = null, $body = null)
{
    if ($message != null) {
        echo "<script>Swal.fire('$message')</script>";
    }

    if ($body != null) {
        echo "<script>Swal.fire($body)</script>";
    }
}


function notify($message, $type = "success")
{
    echo "<script>$.notify('$message', '$type')</script>";
}
