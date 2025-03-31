// There are 17 images so far in the folder

document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/scripts/artworks_assets_list.json")
        .then(response => response.json())
        .then(images => {
            const imgsOuterContainer = document.querySelector(".artworks_assets_grid_container");

            images.forEach(image => {

                // Creates card
                const card = document.createElement("div");
                card.classList.add("artworks_assets_grid_card");

                // Creates img
                const imageSlot = document.createElement("div");
                imageSlot.classList.add("artworks_assets_card_imageslot");
                const img = document.createElement("img");
                img.src = image.src;
                img.alt = image.title;
                imageSlot.appendChild(img);

                // Creates card text
                const textWrapper = document.createElement("div");
                textWrapper.classList.add("artworks_assets_card_text");

                const usedIn = document.createElement("h3");
                usedIn.classList.add("artworks_assets_used_in");
                usedIn.textContent = image.used_in;

                const stack = document.createElement("h5");
                stack.classList.add("artworks_assets_stack");
                stack.textContent = image.stack;

                // Adds texts to container
                textWrapper.appendChild(usedIn);
                textWrapper.appendChild(stack);

                // Appends everything to the card
                card.appendChild(imageSlot);
                card.appendChild(textWrapper);

                // Adds card to container
                imgsOuterContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading images:", error));

        fetch("./assets/scripts/artworks_assets_tools_list.json")
        .then(response => response.json())
        .then(tools => {
            const imgsOuterContainer = document.querySelector(".tools_container");

            let cardCount = 0

            tools.forEach(tool => {

                // Creates card
                const card = document.createElement("div");
                card.classList.add("tool_card");

                // Creates img
                const imageSlot = document.createElement("div");
                imageSlot.classList.add("tool_card_imageslot");
                const img = document.createElement("img");
                img.src = tool.imgSrc;
                img.alt = tool.name;
                imageSlot.appendChild(img);

                // Creates card text
                const textWrapper = document.createElement("div");
                textWrapper.classList.add("tools_text_wrapper");

                const toolName = document.createElement("h3");
                toolName.classList.add("tools_name");
                toolName.textContent = tool.name;

                const toolDescription = document.createElement("p");
                toolDescription.classList.add("tools_description");
                toolDescription.textContent = tool.description;

                // Adds texts to container
                textWrapper.appendChild(toolName);
                textWrapper.appendChild(toolDescription);

                // Appends everything to the card
                if (cardCount % 2 == 0) {
                    card.appendChild(imageSlot);
                    card.appendChild(textWrapper);
                } else {
                    card.appendChild(textWrapper);
                    card.appendChild(imageSlot);
                }
                console.log(cardCount)

                // Adds card to container
                imgsOuterContainer.appendChild(card);

                // Adds +1 to counter
                cardCount++;
            });
        })
        .catch(error => console.error("Error loading images:", error));
});


