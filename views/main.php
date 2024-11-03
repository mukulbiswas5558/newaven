<div class="container   mt-5">
        
        <div class="text-center mb-3">
            <button type="button" id="submitBtn" class="btn btn-primary">Export</button>
        </div>

        <div class = "justify-content-center ">
            <form id="dataForm">
                <div class = "row">
                    <div class="col-md-6 mb-3">
                        <input type="text" name="title" class="form-control" placeholder="Page title" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <input type="text" name="description" class="form-control" placeholder="Page description" required>
                    </div>
                </div>
                <div class = "row">
                    <div class="col-md-6 mb-3">
                        <input type="text" name="category" class="form-control" placeholder="Page category" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <input type="text" name="subcategory" class="form-control" placeholder="Page subcategory" required>
                    </div>
                </div>
                <!-- Dynamically generated components -->


               
            </form>
        </div>


        <div id="components" class="component-wrapper mb-3 mt-3 min-vh-200">

        </div>



        <div id="available-components" class="mb-3">
            <h5>Available Components</h5>
            <div class="component card p-3 mb-3 border" draggable="true" data-type="accordion">
                <h5>Accordion</h5>
            </div>
            <div class="component card p-3 mb-3 border" draggable="true" data-type="card">
                <h5>Card</h5>
            </div>
            <div class="component card p-3 mb-3 border" draggable="true" data-type="form">
                <h5>Form</h5>
            </div>
        </div>

    </div>