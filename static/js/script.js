document.addEventListener("DOMContentLoaded", () => {
    // selected all the components and dropzone and designCanvas
    const componentList = document.querySelectorAll(".draggable");
    const designCanvas = document.getElementById("design-canvas");
    const toolbar = document.getElementById("toolbar-content");



    // Enable dragging on components from the left column
    componentList.forEach(component => {
        component.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("componentType", component.getAttribute("data-type"));

            // Change the style of the component while dragging
            component.style.opacity = "0.5";
            component.style.border = "1px dashed #000";


            // Create a custom drag image
            const dragImage = component.cloneNode(true)
            dragImage.style.position = "absolute";
            dragImage.style.opacity = "0.9";
            // dragImage.style.transform = "rotate(-45deg)";
            dragImage.style.border = "2px solid blue"
            document.body.appendChild(dragImage);
            // Set the custom drag image
            e.dataTransfer.setDragImage(dragImage, 40, 20);
            // Clean up the drag image after the drag ends
            e.dataTransfer.effectAllowed = "move"; // Allow move effect

        });


        component.addEventListener("dragend", (e) => {

            component.style.opacity = "";
            component.style.border = "";
            const dragImage = document.querySelector('div[style*="position: absolute"]');
            if (dragImage) {
                document.body.removeChild(dragImage);
            }
        })
    });



    // Create a highlight element
    const highlight = document.createElement("div");
    highlight.className = "absolute border-2 border-dashed border-green-500 bg-green-200 opacity-50 z-50 hidden"; // Tailwind classes
    document.body.appendChild(highlight); // Append to body or designCanvas

    // Canvas allows drop
    designCanvas.addEventListener("dragover", (e) => {
        e.preventDefault()
        designCanvas.classList.add("bg-blue-300")
        // highlight.classList.remove("hidden"); // Show the highlight
        // highlight.style.width = `${designCanvas.offsetWidth}px`; // Set width to canvas width
        // highlight.style.height = `${designCanvas.offsetHeight}px`; // Set height to canvas height
        // highlight.style.top = `${designCanvas.getBoundingClientRect().top}px`; // Align to the top
        // highlight.style.left = `${designCanvas.getBoundingClientRect().left}px`; // Align to the left
    });


    designCanvas.addEventListener("dragleave", () => {
        highlight.classList.add("hidden");
        designCanvas.classList.remove("bg-blue-300")
    });


    designCanvas.addEventListener("drop", (e) => {
        console.log("DROP")
        e.preventDefault();
        designCanvas.classList.remove("bg-blue-300")

        const type = e.dataTransfer.getData("componentType");
        if (type) {
            createComponent(type);
        }
    });






});
