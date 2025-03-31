document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [imagesResponse, toolsResponse] = await Promise.all([
            fetch("./assets/scripts/artworks_assets_list.json").then(res => res.json()),
            fetch("./assets/scripts/artworks_assets_tools_list.json").then(res => res.json())
        ]);

        renderImages(imagesResponse);
        renderTools(toolsResponse);
        
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

function renderImages(images) {
    const imgsOuterContainer = document.querySelector(".artworks_assets_grid_container");

    images.forEach(image => {
        const card = document.createElement("div");
        card.classList.add("artworks_assets_grid_card");

        const imageSlot = document.createElement("div");
        imageSlot.classList.add("artworks_assets_card_imageslot");
        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.title;
        imageSlot.appendChild(img);

        const textWrapper = document.createElement("div");
        textWrapper.classList.add("artworks_assets_card_text");

        const usedIn = document.createElement("h3");
        usedIn.classList.add("artworks_assets_used_in");
        usedIn.textContent = image.used_in;

        const stack = document.createElement("h5");
        stack.classList.add("artworks_assets_stack");
        stack.textContent = image.stack;

        textWrapper.appendChild(usedIn);
        textWrapper.appendChild(stack);

        card.appendChild(imageSlot);
        card.appendChild(textWrapper);

        imgsOuterContainer.appendChild(card);
    });
}

function renderTools(tools) {
    const toolsContainer = document.querySelector(".tools_container");
    let cardCount = 0;

    tools.forEach(tool => {
        const card = document.createElement("div");
        card.classList.add("tool_card");

        const imageSlot = document.createElement("div");
        imageSlot.classList.add("tool_card_imageslot");
        const img = document.createElement("img");
        img.src = tool.imgSrc;
        img.alt = tool.name;
        imageSlot.appendChild(img);

        const textWrapper = document.createElement("div");
        textWrapper.classList.add("tools_text_wrapper");

        const toolName = document.createElement("h3");
        toolName.classList.add("tools_name");
        toolName.textContent = tool.name;

        const toolDescription = document.createElement("p");
        toolDescription.classList.add("tools_description");
        toolDescription.textContent = tool.description;

        textWrapper.appendChild(toolName);
        textWrapper.appendChild(toolDescription);

        if (cardCount % 2 == 0) {
            card.appendChild(imageSlot);
            card.appendChild(textWrapper);
        } else {
            card.appendChild(textWrapper);
            card.appendChild(imageSlot);
        }

        toolsContainer.appendChild(card);
        cardCount++;
    });
}
