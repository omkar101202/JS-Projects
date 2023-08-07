const USERNAME1 = "thepranaygupta";
const USERNAME2 = "omkar101202";

const userInput = document.querySelector("[data-input]");
const searchBtn = document.querySelector("[search-btn]");
const url = `https://api.github.com/users/`;

searchBtn.addEventListener("click", function() {
    if(userInput.value !== "") {
        fetchData(url + userInput.value);
    }
});

userInput.addEventListener("keydown", function(e) {
    if(e.key == "Enter") {
        if(userInput.value !== "") {
            fetchData(url + userInput.value);
        }
        
    }
});





async function fetchData(gitUrl) {
    const response = await fetch(gitUrl);
    const data = await response.json();

    console.log(data);

    renderUserInfo(data);
}

function renderUserInfo(data) {
    if (data.message !== "Not Found") {

        const image = document.querySelector("[user-img]");
        const userName = document.querySelector("[user-name]");
        const userLink = document.querySelector("[user-link]");
        const date = document.querySelector("[user-joining-date]");
        const userBio = document.querySelector("[user-bio]");
        const repos = document.querySelector("[title1-data]");
        const followers = document.querySelector("[title2-data]");
        const following = document.querySelector("[title3-data]");
        const userlocation = document.querySelector("[user-location]");
        const portfolio = document.querySelector("[portfolio-link]");
        const twitter = document.querySelector("[twitter-link]");
        const company = document.querySelector("[company-name]");

    //
        image.src = `${data.avatar_url}`;
        userName.innerText = `${data.name}`;
        userLink.innerText = `${data.login}`;
        userLink.href = `${data.html_url}`;

        const timestamp = data.created_at;
        const dateOnly = timestamp.split("T")[0];
        date.innerText = dateOnly;

        userBio.innerText = `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`

        const loc = data.location;
        userlocation.innerText = loc !== null ? loc : "Not Available";

        portfolio.innerText = data.blog !== "" ? data.blog : "Not Available";
        portfolio.href = data.blog !== null ? data.blog : "#";

        //twitter
        twitter.innerText = data.twitter_username !== null ? data.twitter_username : "Not Available";
        twitter.href = data.twitter_username !== null ? `https://twitter.com/${data.twitter_username}` : "#";

        company.innerText = `${data.company}`;

    }

    
}

fetchData(url + "omkar101202") ;