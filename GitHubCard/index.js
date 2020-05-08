/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/



/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

function getGithub(username) {
  axios.get(`https:api.github.com/users/${username}`)
    .then(response => {
      const data = response.data
        const user = makeGitHubCard(data);
        document.querySelector(".cards").appendChild(user)
        console.log("GitHub did a good job");
    })
    .catch(error => {
      console.log(error);
    })

    .finally(() => {
      console.log('done');
    })
}



/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// const followersArray = [];

// axios.get(`https://api.github.com/users/meep-morp/followers`)
// .then(response => {
  
//   response.data.forEach((data) => {
//     followersArray.push(data.login);
//     console.log("Pushed");
//   })
  
//   followersArray.forEach((user) => {
//     getGithub(user);

// });

// })
// .catch(error => {
//   console.log(error);
// })

// console.log(followersArray);

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

const makeGitHubCard = (attrsObj) => {

  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardInfo = document.createElement("div");
  const realName = document.createElement("h3");
  const username = document.createElement("p");
  const locationData = document.createElement("p");
  const profile = document.createElement("p");
  const profileLink = document.createElement("a");
  const followersData = document.createElement("p");
  const followingData = document.createElement("p");
  const bioData = document.createElement("p");
  const closeContainer = document.createElement("div");
  const following = document.createElement("ul");
  const expandButton = document.createElement("span");

  card.appendChild(image);
  card.appendChild(cardInfo);
  card.appendChild(expandButton);
  cardInfo.appendChild(realName);
  cardInfo.appendChild(username);
  cardInfo.appendChild(locationData);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followersData);
  cardInfo.appendChild(followingData);
  cardInfo.appendChild(bioData);
  cardInfo.appendChild(expandButton);
  cardInfo.appendChild(closeContainer);
  closeContainer.appendChild(following);

  followingList = [];

  axios.get(`https://api.github.com/users/${attrsObj.login}/following`)
  .then(response => {

    response.data.forEach((data) => {
      followingList.push(data.login);
      console.log("Pushed");
    })     

    followingList.forEach((follower) => {
      const followingUser = document.createElement("li");
      following.appendChild(followingUser);
      followingUser.textContent = follower;
    })
  })
  .catch(error => {
    console.log(error);
  })

  image.src = attrsObj.avatar_url;
  realName.textContent = attrsObj.name;
  username.textContent = attrsObj.login;
  locationData.textContent = attrsObj.location;
  profile.textContent = `Profile: `;
  profile.appendChild(profileLink);
  profileLink.href = attrsObj.html_url;
  profileLink.textContent = attrsObj.html_url;
  followersData.textContent = `Followers: ${attrsObj.followers}`;
  followingData.textContent = `Following: ${attrsObj.following}`;
  expandButton.textContent = ("\u25FF");
  following.textContent = "Following: ";

  if(attrsObj.bio === null) {
    cardInfo.removeChild(bioData);
  } else {
      bioData.textContent = `Bio: ${attrsObj.bio}`;
    }

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  realName.classList.add("name");
  username.classList.add("username");
  expandButton.classList.add("expandButton");
  closeContainer.classList.add("closeContainer", "hidden");

    expandButton.addEventListener("click", (event) => {
      closeContainer.classList.toggle("hidden");
      card.classList.toggle("card-open");
      expandButton.classList.toggle("closeButton");
    })

  return card;
}

getGithub("meep-morp");

// const test = 
// {
//   "avatar_url": "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500}", 
//   "name": "hi", 
//   "login": "nothin", 
//   "location": "usa", 
//   "followers": "100", 
//   "following": "0",
//   "html_url": "#",
// }

// makeGitHubCard(test);



/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
