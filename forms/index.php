<?php
include_once tools("pager");


$pageId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// Fetch the page data from the database
$pageData = row("SELECT * FROM page WHERE id = :id", ['id' => $pageId]);

// Default values if no data is found
$pageTitle = $pageData['title'] ?? 'Default Title';
$pageDescription = $pageData['description'] ?? 'Default Description';
$pageCategory = $pageData['category'] ?? 'General';
$pageSubcategory = $pageData['subcategory'] ?? 'Subcategory';
$pageContent = $pageData['content'] ?? '<div>No content available.</div>';

View("common/header", ["title" => $pageTitle]);
?>

<div class="container mt-5">
   
    <div id="components" class="component-wrapper mb-3">
        <?= $pageContent ?>
    </div>
</div>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const pageId = "<?= $pageId ?? null; ?>"; // Get PHP variable or set to null
        const customForm = document.getElementById("customForm");

        // Create a hidden input element
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "page_id";
        hiddenInput.value = pageId;

        // Append the hidden input to the form
        customForm.appendChild(hiddenInput);
    });
</script>
<?php
View("common/footer",["page_id" => $pageId]);
?>
