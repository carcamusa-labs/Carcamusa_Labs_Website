document.addEventListener("DOMContentLoaded", async () => {
    try {
        const entriesResponse = await fetch("./assets/json/referrals_list.json").then(res => res.json());

        renderEntries(entriesResponse);
        
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

function renderEntries(entries) {
    const referralCardsContainer = document.querySelector(".referrals_referralcards_container");

    entries.forEach(entry => {
        const card = document.createElement("div");
        card.classList.add("referrals_card");

        const leftWrapper = document.createElement("div");
        leftWrapper.classList.add("referrals_card_leftarea_wrapper")

        const imageSlot = document.createElement("div");
        imageSlot.classList.add("referrals_card_imageslot");
        const img = document.createElement("img");

        const devImgSrc = "assets/visuals/logos/dev_icon.png";
        const qaImgSrc = "assets/visuals/logos/qa_icon.png";

        img.src = entry?.job_title == 'Dev' ? devImgSrc : qaImgSrc;
        img.alt = entry.job_title;
        imageSlot.appendChild(img);

        const jobTitleText = document.createElement('h4');
        jobTitleText.classList.add("referrals_card_jobtitle");
        jobTitleText.textContent = entry.job_title;

        const rightWrapper = document.createElement("div");
        rightWrapper.classList.add("referrals_card_rightarea_wrapper")

        const referralName = document.createElement('h2');
        referralName.classList.add("referrals_card_referralname");
        referralName.textContent = entry.name;

        const referralEnterprise = document.createElement('h3');
        referralEnterprise.classList.add("referrals_card_referralenterprise");
        referralEnterprise.textContent = entry.enterprise;

        /* NOT READY TO BE IMPLEMENTED YET */
        /* const referralBackground = document.createElement('p');
        referralBackground.classList.add("referrals_card_referralbackground");
        referralBackground.textContent = entry.background; */

        const referralsMediaLinksWrapper = document.createElement('div');
        referralsMediaLinksWrapper.classList.add("referrals_social_media_links_wrapper");

        if (entry?.lk_user) {
            const referralLK = document.createElement('a');
            referralLK.href = entry.lk_user;

            const lkImg = document.createElement('img');
            lkImg.classList.add("referrals_card_referral_lk");
            lkImg.src = "assets/visuals/logos/linkedin_logo.png";
            lkImg.alt = "LinkedIn";

            referralLK.appendChild(lkImg);
            referralsMediaLinksWrapper.appendChild(referralLK);
        };

        if (entry?.gh_user) {
            const referralGH = document.createElement('a');
            referralGH.href = entry.gh_user;
            
            const ghImg = document.createElement('img');
            ghImg.classList.add("referrals_card_referral_gh");
            ghImg.src = "assets/visuals/logos/github_logo.png";
            ghImg.alt = "GitHub";
    
            referralGH.appendChild(ghImg);
            referralsMediaLinksWrapper.appendChild(referralGH);
        };

        if (entry?.website) {
            const referralWeb = document.createElement('a');
            referralWeb.href = entry.website;
            
            const webImg = document.createElement('img');
            webImg.classList.add("referrals_card_referral_web");
            webImg.src = "assets/visuals/logos/website_logo.png";
            webImg.alt = "Website";
    
            referralWeb.appendChild(webImg);
            referralsMediaLinksWrapper.appendChild(referralWeb);
        };

        leftWrapper.appendChild(imageSlot)
        leftWrapper.appendChild(jobTitleText);

        rightWrapper.appendChild(referralName);
        rightWrapper.appendChild(referralEnterprise);
        
        /* NOT READY TO BE IMPLEMENTED YET */
        // rightWrapper.appendChild(referralBackground);

        rightWrapper.appendChild(referralsMediaLinksWrapper);

        card.appendChild(leftWrapper);
        card.appendChild(rightWrapper);

        referralCardsContainer.appendChild(card);
    });
}