
let selectedComponent = null;

function generateUUID() {
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Set version to 0100
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Set variant to 10

    const hexBytes = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(hexBytes);
    const id = `${hexBytes.substr(0, 8)}-${hexBytes.substr(8, 4)}-${hexBytes.substr(12, 4)}-${hexBytes.substr(16, 4)}-${hexBytes.substr(20)}`;
    console.log(id);
    return id;
}

function rgbStringToHex(rgbString) {
    // Extract the numbers from the rgb() string
    if (rgbString) {

        const [r, g, b] = rgbString.match(/\d+/g).map(Number);

        const toHex = (value) => {
            const hex = value.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    return '#000000'
}


function createComponent(type) {
    let componentId = generateUUID();
    const designArea = document.getElementById('design-area')
    const component = document.createElement("div");
    component.classList.add("p-2", "relative", "cursor-pointer", "bg-white", "shadow", "highlight-avenger-component");
    component.dataset.type = type;
    component.id = componentId

    // Add content based on type
    switch (type) {
        case "head1":
            component.innerHTML = `<h1  class=" font-bold text-6xl" id="${componentId}_head">Heading  1</h1>`;
            break;
        case "head2":
            component.innerHTML = `<h2  class=" font-bold text-4xl" id="${componentId}_head">Heading  2</h2>`;
            break;
        case "head3":
            component.innerHTML = `<h3  class=" font-bold text-2xl" id="${componentId}_head">Heading  3</h3>`;
            break;
        case "head4":
            component.innerHTML = `<h4  class=" font-bold text-xl" id="${componentId}_head">Heading  4</h4>`;
            break;
        case "head5":
            component.innerHTML = `<h5  class=" font-bold text-lg" id="${componentId}_head">Heading  5</h5>`;
            break;
        case "head6":
            component.innerHTML = `<h6  class=" font-bold text-md" id="${componentId}_head">Heading  6</h6>`;
            break;

        case "card":
            component.innerHTML = "<div  class=' font-bold mb-1' id='" + componentId + "_head'>Card Header</div><div id='" + componentId + "_content'>Card Content</div>";
            break;
        case "image":
            component.innerHTML = "<img  id='" + componentId + "_image'  alt='Image' class=' w-full border-2 h-auto'>";
            break;
        case "accordion":
            component.innerHTML = "<details class='' ><summary id='" + componentId + "_head'>Accordion</summary><p id='" + componentId + "_content'>Accordion Content</p></details>";
            break;
        case "paragraph":
            component.innerHTML = `<p class=""  id="${componentId}_para">Paragraph text content goes here...</p>`;
            break;

        case "input":
            component.innerHTML = `<div  class=" w-full flex flex-col py-2">
                        <div id="${componentId}_label_container" class="w-full flex items-center justify-start"><label id="${componentId}_label" class="ps-3 font-bold" for="${componentId}_input">Label </label></div>
                        <input id="${componentId}_input" name="" class="py-2 bg-gray-100 px-4 border-none outline-none"  type="text" placeholder="Input Field" value="">
                        </div>
                    `;
            break;

        case "radio":
        case "checkbox":
        case "select":
            component.innerHTML = `<div  class="w-full flex flex-col py-2">
                            <div id="${componentId}_label_container" class="w-full flex items-center justify-start">
                                <label id="${componentId}_label" class="ps-3 font-bold" for="${componentId}_input">Label </label>
                            </div>
                            <div id="${componentId}_radio_container" class="w-full flex flex-col gap-y-1 items-center justify-start"></div>
                        </div>
                    `;
            break;

        case "space":
            component.classList.remove("p-2", "relative", "cursor-pointer", "bg-white", "shadow");
            component.classList.add("py-2", "bg-gray-100");
            component.innerHTML = `<div class="h-3"></div>`
            break;
    }

    // Select component to show toolbar

    component.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        console.log({ x: e.pageX, y: e.pageY, Wx: window.innerWidth, Wy: window.innerHeight })
        // remove previous menu if exists
        let existingMenu = document.getElementById("contextMenu");
        if (existingMenu) existingMenu.remove();
        let menuItemStyle = "w-full cursor-pointer border-b border-gray-200 hover:bg-gray-100 flex w-full text-sm items-center px-3 py-1 duration-300 hover:border-gray-500";

        let menu = document.createElement('div');
        menu.style = `top:${e.pageY + 159 < window.innerHeight ? e.pageY : window.innerHeight - 159}px;left:${e.pageX}px`
        menu.id = "contextMenu"
        menu.classList.add("absolute", "z-10", "w-[380px]", "overflow-y-auto", "overflow-x-hidden", "border", "border-gray-200", "bg-white", "shadow", "rounded")
        menu.innerHTML = `

            <div
                role="menuitem"
                id="${componentId}_duplicate_button"
                class="${menuItemStyle} hover:text-green-500 text-green-800"
            >
            Duplicate
            </div>


            <div
                role="menuitem"
                id="${componentId}_delete_button"
                class="${menuItemStyle} hover:text-red-500 text-red-800"
            >
            Delete
            </div>


            <div
                role="menuitem"
                id="${componentId}_go_up_button"
                class="${menuItemStyle} hover:text-blue-500 text-blue-800"
            >
            Up
            </div>



            <div
                role="menuitem"
                id="${componentId}_go_down_button"
                class="${menuItemStyle} hover:text-blue-500 text-blue-800"
            >
            Next
            </div>




            <div
                role="menuitem"
                id="${componentId}_go_top_button"
                class="${menuItemStyle} hover:text-blue-500 text-blue-800"
            >
            First
            </div>



            <div
                role="menuitem"
                id="${componentId}_go_bottom_button"
                class="${menuItemStyle} hover:text-blue-500 text-blue-800"
            >
            Last
            </div>
            `
        // showing the menu
        document.body.appendChild(menu);

        //handling the component duplicate
        let duplicateButton = document.getElementById(`${componentId}_duplicate_button`);
        duplicateButton.addEventListener('click', () => {

            let newComponent = component.cloneNode(true);
            newComponent.id = generateUUID();
            component.parentNode.insertBefore(newComponent, component)
            console.log("DUPLICATE")
            menu.remove();
        })



        // handling the component delete 
        let deleteButton = document.getElementById(`${componentId}_delete_button`);
        deleteButton.addEventListener('click', () => {
            component.remove();
            menu.remove();
        })

        // Handle go up one level
        let goUpButton = document.getElementById(`${componentId}_go_up_button`);
        goUpButton.addEventListener('click', () => {
            let parent = component.parentNode;
            let grandparent = parent.parentNode;

            if (parent.id === 'BODY') {
                alert("You are already at the top level");
                return;
            }

            // Move the component up one level, placing it before its parent
            grandparent.insertBefore(component, parent);
            menu.remove();
        });

        // handle go down one level
        let goDownButton = document.getElementById(`${componentId}_go_down_button`);
        goDownButton.addEventListener('click', () => {
            let parent = component.parentNode;
            if (parent.tagName === 'BODY') {
                alert("You are already at the top level");
                return;
            }
            let nextSibling = parent.nextSibling;
            if (nextSibling) {
                parent.insertBefore(component, nextSibling);
            } else {
                parent.appendChild(component);
            }
            menu.remove();
        })


        // handling go top
        let goTopButton = document.getElementById(`${componentId}_go_top_button`);
        goTopButton.addEventListener('click', () => {
            component.parentNode.insertBefore(component, component.parentNode.firstChild);
            menu.remove();
        })
        // handling go end
        let goEndButton = document.getElementById(`${componentId}_go_bottom_button`);
        goEndButton.addEventListener('click', () => {
            component.parentNode.appendChild(component, component.parentNode.lastChild);
            menu.remove();
        })




        // close the menu on outside click
        let handleOutsideClick = document.addEventListener('click', (event) => {
            if (!menu.contains(event.target)) {
                setTimeout(() => {
                    menu.remove();
                    document.removeEventListener('click', handleOutsideClick);
                }, 200);
            }
        });
    })

    component.addEventListener("click", () => {
        selectedComponent = component;
        openToolbar(type, componentId);
    });

    component.addEventListener('blur', () => {
        selectedComponent = null;
    })


    designArea.appendChild(component);

}


function openToolbar(type, id) {


    const toolbar = document.getElementById('toolbar-content')

    if (type == '' && id == '') {
        toolbar.innerHTML = '';
        return;
    }

    let inputFieldClass = "w-full bg-gray-200 py-2 px-4 border border-blue-50 outline-none text-sm rounded";
    let checkboxStyleClass = "w-full flex justify-start items-center gap-x-1 py-2"


    if (type == 'card') {
        let header = document.getElementById(`${id}_head`);
        let content = document.getElementById(`${id}_content`);

        toolbar.innerHTML = `
        <input
            type="text"
            class="${inputFieldClass}"
            placeholder="eg. Card Header"
            id="${id}_input_head"
            value="${header.innerText}"
        >

        


        <textarea
            type="text"
            class="${inputFieldClass}"
            placeholder="eg. Card Body"
            rows="3"
            id="${id}_input_content"
        >${content.innerText?.trim()}</textarea>


        <div class="w-full grid grid-cols-2">
            <label class="text-sm text-gray-700" for="${id}_input_head_color">Header Color</label>
            <label class="text-sm text-gray-700" for="${id}_input_content_color">Content Color</label>
        </div>

        <div class="w-full grid grid-cols-2">
        <input
            type="color"
            class="${inputFieldClass} py-0 px-0"
            id="${id}_input_head_color"
            value="${rgbStringToHex(header.style.color)}"
        >
        <input
            type="color"
            class="${inputFieldClass}"
            id="${id}_input_content_color"
            value="${rgbStringToHex(content.style.color)}"
        >
        </div>

    `;

        // Add event listener to update header text dynamically
        const headerInput = document.getElementById(`${id}_input_head`);
        headerInput.addEventListener('input', (e) => {
            header.innerText = e.target.value;
        });

        const headerTextColor = document.getElementById(`${id}_input_head_color`)
        headerTextColor.addEventListener('input', (e) => {
            header.style.color = e.target.value;
            console.log(e.target.value);
            console.log(header.style.color)
        });




    } else if (type == 'accordion') {
        let header = document.getElementById(`${id}_head`);
        let content = document.getElementById(`${id}_content`);

        toolbar.innerHTML = `
        <input
            type="text"
            class="${inputFieldClass}"
            placeholder="eg. Accordion Header"
            id="${id}_input_head"
            value="${header.innerText}"
        >
        <textarea
            type="text"
            class="${inputFieldClass}"
            placeholder="eg. Accordion Body"
            rows="3"
            id="${id}_input_content"
        >${content.innerText?.trim()}</textarea>



        <div class="w-full grid grid-cols-2">
            <label class="text-sm text-gray-700" for="${id}_input_head_color">Header Color</label>
            <label class="text-sm text-gray-700" for="${id}_input_content_color">Content Color</label>
        </div>

        <div class="w-full grid grid-cols-2">
        <input
            type="color"
            class="${inputFieldClass} py-0 px-0"
            id="${id}_input_head_color"
            value="${rgbStringToHex(header.style.color)}"
        >
        <input
            type="color"
            class="${inputFieldClass}"
            id="${id}_input_content_color"
            value="${rgbStringToHex(content.style.color)}"
        >
        </div>
    `;

        // Add event listener to update header text dynamically
        const headerInput = document.getElementById(`${id}_input_head`);
        headerInput.addEventListener('input', (e) => {
            header.innerText = e.target.value;
        });



        // add event listener to update content text color dynamically
        const headerTextColor = document.getElementById(`${id}_input_content_color`)
        headerTextColor.addEventListener('input', (e) => {
            header.style.color = e.target.value;
        });



        const bodyInput = document.getElementById(`${id}_input_content`);
        bodyInput.addEventListener('input', (e) => {
            content.innerText = e.target.value;
        });


        // add event listener to update content text color dynamically
        const contentTextColor = document.getElementById(`${id}_input_content_color`)
        contentTextColor.addEventListener('input', (e) => {
            content.style.color = e.target.value;
        });

    } else if (type == 'image') {
        let imageContainer = document.getElementById(`${id}_image`);

        toolbar.innerHTML = `
            <input
            type="text"
            class="${inputFieldClass}"
            placeholder="eg. https://via.placeholder.com/150X200"
            id="${id}_image_src"
            value="${imageContainer.src}"
            />

            <input
            type="text"
            class="${inputFieldClass}"
            placeholder="eg. Placeholder Image"
            id="${id}_alt"
            value="${imageContainer.alt}"
            />


            <div class="w-full flex justify-between items-center">
                <input type="number" placeholder="eg. 350" id="${id}_image_width"
                    class="${inputFieldClass}">
                <input type="number" placeholder="eg. 350" id="${id}_image_height"
                    class="${inputFieldClass}">
            </div>
        `;


        // set image url
        const imageUrlInput = document.getElementById(`${id}_image_src`);
        imageUrlInput.addEventListener('input', (e) => {
            imageContainer.src = e.target.value;
        });

        // set image alt text
        const imageAltText = document.getElementById(`${id}_alt`);
        imageAltText.addEventListener('input', (e) => {
            imageContainer.alt = e.target.value;
        });


        const imageWidthInput = document.getElementById(`${id}_image_width`);
        imageWidthInput.addEventListener('input', (e) => {
            imageContainer.style.padding = `${e.target.value}px`;
        })

        const imageHeightInput = document.getElementById(`${id}_image_height`);
        imageHeightInput.addEventListener('input', (e) => {
            imageContainer.style.width = e.target.value;
        })


    } else if (type.startsWith("head")) {
        let header = document.getElementById(`${id}_head`);
        toolbar.innerHTML = `
            <input
                type="text"
                class="${inputFieldClass}"
                placeholder="Edit Header Text"
                id="${id}_input_head"
                value="${header.innerText}"
            >
            <input
                type="color"
                class="${inputFieldClass}"
                placeholder="Edit Header Text"
                id="${id}_input_color"
                value="${header.style.color}"
            >
            `

        // Add event listener to update header text dynamically
        const headerInput = document.getElementById(`${id}_input_head`);
        headerInput.addEventListener('input', (e) => {
            header.innerText = e.target.value;
        });


        // add event listner to update header text color
        const headerColorInput = document.getElementById(`${id}_input_color`);
        headerColorInput.addEventListener('input', (e) => {
            header.style.color = e.target.value;
        });
    } else if (type == 'paragraph') {
        let paragraphContent = document.getElementById(`${id}_para`);
        toolbar.innerHTML = `
            <textarea
            type="text"
            class="${inputFieldClass}"
            placeholder="eg. Accordion Body"
            rows="3"
            id="${id}_input"
        >${paragraphContent.innerText?.trim()}</textarea>`

        // Add event listener to update header text dynamically
        const headerInput = document.getElementById(`${id}_input`);
        headerInput.addEventListener('input', (e) => {
            paragraphContent.innerText = e.target.value;
        });
    } else if (type == 'input') {
        let inputTextBox = document.getElementById(`${id}_input`);
        let inputTextLabel = document.getElementById(`${id}_label`)
        toolbar.innerHTML = `
                <label for="${id}_input_label" class="block text-sm font-medium text-gray-700">Input Label</label>
                <input
                    type="text"
                    class="${inputFieldClass}"
                    placeholder="eg. First Name"
                    id="${id}_input_label"
                    value="${inputTextLabel.innerText}"
                    />

                <div class="${checkboxStyleClass}">
                    <input
                        type="checkbox"
                        class="h-4 w-4"
                        id="${id}_input_required"
                        ${inputTextBox.getAttribute('required') ? "checked=true" : ""}
                        />
                    <label for="${id}_input_required" class="block font-medium  text-gray-700">Required Field</label>
                </div>

                <label for="${id}_input_placeholder" class="block text-sm font-medium text-gray-700">Input Label</label>
                <input
                    type="text"
                    class="${inputFieldClass}"
                    placeholder="eg. John"
                    id="${id}_input_placeholder"
                    value="${inputTextBox.getAttribute('placeholder')}"
                    />


                <label for="${id}_input_type" class="block text-sm font-medium text-gray-700">Select Input Type</label>
                <select id="${id}_input_type" class="${inputFieldClass}">
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="date">Date</option>
                    <option value="time">Time</option>
                    <option value="month">Month</option>
                    <option value="datetime-local">Date & Time</option>
                </select>
            `;

        // Set the initial input type based on the selected option
        const inputTypeSelect = document.getElementById(`${id}_input_type`);
        const inputLabelBox = document.getElementById(`${id}_input_label`);
        const isInputRequired = document.getElementById(`${id}_input_required`);
        const inputPlaceholder = document.getElementById(`${id}_input_placeholder`);

        // Event listener for the select box to change the input type
        inputTypeSelect.addEventListener('change', (e) => {
            inputTextBox.setAttribute('type', e.target.value);
        });

        isInputRequired.addEventListener('change', (e) => {
            inputTextBox.required = e.target.checked;
            const supElement = document.createElement('sup');
            supElement.classList.add("text-red-600", "font-bold");
            supElement.innerText = "*"
            supElement.id = `${id}_isrequired`
            if (e.target.checked) {
                document.getElementById(`${id}_label_container`).appendChild(supElement)
            } else {
                document.getElementById(`${id}_isrequired`).remove()
            }
        })

        inputLabelBox.addEventListener('input', (e) => {
            inputTextLabel.innerText = e.target.value;
        })


        inputPlaceholder.addEventListener('input', (e) => {
            inputTextBox.setAttribute('placeholder', e.target.value)
        })
    } else if (['radio', 'checkbox', "select"].includes(type)) {
        let inputTextLabel = document.getElementById(`${id}_label`)
        toolbar.innerHTML = `
                <label for="${id}_input_label" class="block text-sm font-medium text-gray-700">Input Label</label>
                <input
                    type="text"
                    class="${inputFieldClass}"
                    placeholder="eg. First Name"
                    id="${id}_input_label"
                    value="${inputTextLabel.innerText}"
                    />

                <div class="${checkboxStyleClass} py-2">
                    <input
                        type="checkbox"
                        class="h-3 w-3"
                        id="${id}_input_required"
                        ${document.getElementById(`${id}_isrequired`) ? "required=true" : ""}
                        />
                    <label for="${id}_input_required" class="block font-medium  text-gray-700">Required Field</label>
                </div>


                <label for="${id}_radio_value" class="block text-sm font-medium text-gray-700">Radio Fields (Semicolon[;] Separated)</label>
                <input
                    type="text"
                    class="${inputFieldClass}"
                    placeholder="eg. First Name"
                    id="${id}_radio_value"
                    value="${inputTextLabel.innerText}"
                    />
            `;

        // Set the initial input type based on the selected option
        const isInputRequired = document.getElementById(`${id}_input_required`);
        isInputRequired.addEventListener('change', (e) => {
            const supElement = document.createElement('sup');
            supElement.classList.add("text-red-600", "font-bold");
            supElement.innerText = "*"
            supElement.id = `${id}_isrequired`
            if (e.target.checked) {
                document.getElementById(`${id}_isrequired`)?.remove()
                document.getElementById(`${id}_label_container`).appendChild(supElement)
            } else {
                document.getElementById(`${id}_isrequired`).remove()
            }
        })


        const inputLabelBox = document.getElementById(`${id}_input_label`);
        inputLabelBox.addEventListener('input', (e) => {
            inputTextLabel.innerText = e.target.value;
        })


        const radioFields = document.getElementById(`${id}_radio_value`);
        const radioFieldsContainer = document.getElementById(`${id}_radio_container`)
        radioFields.addEventListener('change', (e) => {
            let fields = e.target.value.split(";");
            let allFields = ''
            if (['radio', 'checkbox'].includes(type))
                fields.map((element, count) => {
                    if (element && element !== '')
                        allFields += `
                    <div class="${checkboxStyleClass} py-2">
                        <input
                            type="${type}"
                            class="h-3 w-3"
                            name="${id}"
                            id="${id}_radio_field_${count}"
                            />
                        <label for="${id}_radio_field_${count}" class="block font-medium  text-gray-700">${element}</label>
                    </div>
                `;
                });
            else if (type == "select") {
                allFields = `
                    <select class="w-full py-2 px-1">
                        ${fields.map((element, count) => element && element !== '' && (
                    `<option value=${element}>${element}</option>`
                ))
                    }
                    </select>
                `
            }

            radioFieldsContainer.innerHTML = allFields;
        })

    }

}


function letsExportThis() {
    const designArea = document.getElementById("design-area").cloneNode(true);
    const allBtns = designArea.querySelectorAll(".remove-button");
    allBtns.forEach(e => e.remove())

    const fullPage = document.createElement('div');

    fullPage.classList.add("w-full", "h-screen", "p-3", "md:w-[80vw]", "md:p-10", "xl:w-[40vw]", "2xl:w-[30vw]")

    fullPage.appendChild(designArea);

    const outerLayout = document.createElement('div');

    outerLayout.appendChild(fullPage);


    console.log(outerLayout.innerHTML)

    //add
    let pageName = document.querySelector('input[name="page_name"]').value;
    let pageCategory = document.querySelector('input[name="page_category"]').value;
    let pageDescription = document.querySelector('textarea[name="page_description"]').value;
    

    let formData = [];

    // Push each form field into formData
    formData.push({ name: 'title', value: pageName });
    formData.push({ name: 'category', value: pageCategory });
    formData.push({ name: 'description', value: pageDescription });
    formData.push({ name: 'components', value: outerLayout.innerHTML });

            // Send data via AJAX
    $.ajax({
        url: FORM_SUBMIT_URL,
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Data submitted successfully!',
                    text: 'Your data has been saved.',
                    confirmButtonText: 'OK', // Custom OK button text
                }).then(() => {
                    location.reload(); // Refresh the page after the alert is closed
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission failed',
                    text: response.message || 'An error occurred during submission.',
                    confirmButtonText: 'OK' // Ensure the button is shown here too
                });
            }
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Unable to process the request. Please try again later.',
                confirmButtonText: 'OK' // Ensure the button is shown here too
            });
        }
    });

    window.navigator.clipboard.writeText(outerLayout.innerHTML);
}


function letsPreviewThis() {
    const designArea = document.getElementById("design-area").cloneNode(true);
    // remove all the delete buttons 
    const allBtns = designArea.querySelectorAll(".remove-button");
    allBtns.forEach(e => e.remove())

    // remove all hover effects
    const allComps = designArea.querySelectorAll(".highlight-avenger-component")
    allComps.forEach(e => {
        e.classList.remove("highlight-avenger-component");
        e.classList.remove("draggable")
        e.setAttribute("draggable", false)
        e.classList.add("avenger-comps");
    })

    const designPreviewArea = document.getElementById("design-preview-area");
    designPreviewArea.innerHTML = designArea.innerHTML;

    // toggle the design area component
    document.getElementById("design-area").classList.toggle("hidden")
    designPreviewArea.classList.toggle("hidden")
}