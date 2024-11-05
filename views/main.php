<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag and Drop Page Builder</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <script>
        const LOGIN_URL = "<?= url('auth/login') ?>";
        const DASHBOARD_URL = "<?= url('dashboard') ?>";
        const FORM_SUBMIT_URL = "<?= url('dashboard/submit') ?>";
        const USER_FORM_SUBMIT_URL = "<?= url('forms/user_form_submit') ?>";
        const PAGE_ID = "<?= $page_id ?? null; ?>
    ";

    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    

    <script defer src="<?= static_url('js/helper.js') ?>"></script>
    <script defer src="<?= static_url('js/script.js') ?>"></script>
    <style>
        * {
            box-sizing: border-box;
        }

        .resizable {
            position: relative;
            resize: both;
            overflow: auto;
            min-height: 50px;
            min-width: 100px;
        }

        .resizable:active {
            cursor: nesw-resize;
        }

        .highlight-avenger-component:hover {
            background-color: #f0f0f0;
            border: 3px dashed seagreen;
        }
    </style>
</head>

<body class="bg-gray-100 h-screen overflow-hidden">

    <div class="flex w-full h-full">
        <!-- Left Column (Component List) -->
        <div id="component-list" class="w-1/4 p-4 bg-white shadow-lg overflow-y-auto">
            <h2 class="text-lg font-bold mb-1">Typography</h2>
            <div class="w-full h-auto flex justify-start items-cetner flex-wrap gap-2">
                <div class="flex flex-col draggable hover:shadow px-4 w-auto bg-green-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="head1">
                    H1
                </div>

                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-yellow-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="head2">
                    H2
                </div>
                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-purple-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="head3">
                    H3
                </div>

                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-red-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="head4">
                    H4
                </div>


                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-red-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="head5">
                    H5
                </div>


                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-red-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="head6">
                    H6
                </div>


                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-red-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="paragraph">
                    P
                </div>

            </div>

            <h2 class="text-lg font-bold mt-4 mb-1">Utilities</h2>
            <div class="w-full h-auto flex justify-start items-cetner flex-wrap gap-2">
                <div class="flex flex-col draggable hover:shadow px-4 w-auto bg-green-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="space">
                    Space
                </div>
            </div>

            <h2 class="text-lg font-bold mt-4 mb-1">Element List</h2>
            <div class="w-full h-auto flex justify-start items-cetner flex-wrap gap-2">
                <div class="flex flex-col draggable hover:shadow px-4 w-auto bg-green-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="card">
                    Card
                </div>
                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-yellow-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="image">
                    Image
                </div>
                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-purple-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="accordion">
                    Accordion
                </div>
            </div>


            <h2 class="text-lg font-bold mt-4 mb-1">Form Fields</h2>
            <div class="w-full h-auto flex justify-start items-cetner flex-wrap gap-2">
                <div class="flex flex-col draggable hover:shadow px-4 w-auto bg-green-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="input">
                    Input
                </div>
                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-yellow-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="radio">
                    Radio
                </div>
                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-purple-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="checkbox">
                    Checkbox</div>
                <div class="flex flex-col draggable hover:shadow px-4 w-auto  bg-indigo-200 p-2  rounded cursor-pointer"
                    draggable="true" data-type="select">
                    Select
                </div>
            </div>
        </div>

        <!-- Middle Column (Design Canvas) -->
        <div id="design-canvas" class="w-1/2 p-4 bg-gray-50 border border-gray-300 overflow-y-auto">
            <input type="text" name="page_name" id="page_name" placeholder="eg. Avenger Page"
                class="w-full p-2 rounded-xl bg-gray-200 border-none outline-none text-2xl mb-2">
            <div class="w-full flex justify-between items-center gap-x-1">
                <input type="text" name="page_category" id="page_name" placeholder="eg. Avenger Page"
                    class="w-full p-2 rounded-t-xl bg-gray-200 border-none outline-none text-xl">
                <div class="flex justify-end items-center gap-x-2">
                    <button onclick="letsExportThis()"
                        class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-6 rounded">Export</button>
                    <button onclick="letsPreviewThis()"
                        class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-6 rounded">Preview</button>
                </div>
            </div>
            <textarea name="page_description" class="w-full p-2 bg-gray-200 border-none outline-none text-sm rounded-b-xl "
                placeholder="eg.  This is a sample text for the page" rows="3"></textarea>

            <!-- Design Area will be populated with components here -->
            <div id="design-area" class="w-full bg-gray-500"></div>
            <div id="design-preview-area" class="w-full z-10 hidden"></div>
        </div>

        <!-- Right Column (Toolbar) -->
        <div id="toolbar" class="w-1/4 p-4 bg-white shadow-lg overflow-y-auto">
            <h2 class="text-lg font-bold mb-4">Toolbar</h2>
            <div id="toolbar-content" class="h-full">
                <p class="text-sm text-gray-500">Select a component to customize</p>
            </div>
            <!-- <button id="apply-button" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Apply</button> -->
        </div>
    </div>

</body>


</html>