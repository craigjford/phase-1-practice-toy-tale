let addToy = false;
const toyUrl = "http://localhost:3000/toys";
let maxId = 0;
let likeArr = [];

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getMyToys();
});

function getMyToys() {

  fetch(toyUrl)
  .then(resp => resp.json())
  .then(data => { 
      console.log(`data = ${data}`)
      const toyObj = data;
      displayToys(toyObj);
  })
  .catch(function (error) {
      handleError(error)
  })
}

function displayToys(buildObj) {

  let getOrigToyDiv = document.getElementById("toy-collection");
  maxId = buildObj.length;

  for (let i = 0; i < buildObj.length; i++) {

      let toyID = buildObj[i].id;
      let toyName = buildObj[i].name; 
      let toyImgURL = buildObj[i].image;
      let toyLikes = buildObj[i].likes

      likeArr[i] = toyLikes;

      let getNewToyDiv = document.createElement('div');
      getNewToyDiv.setAttribute("class", "card");
      getNewToyDiv.setAttribute("id", toyID);
      getOrigToyDiv.append(getNewToyDiv);

      
      let getToyDiv = document.querySelectorAll(".card")[i];

      let h2Toy = document.createElement("h2");
      h2Toy.textContent = toyName;
      getToyDiv.appendChild(h2Toy);
      let toyImg = document.createElement("img");
      toyImg.setAttribute("src", toyImgURL);
      toyImg.setAttribute("class", "toy-avatar");
      getToyDiv.appendChild(toyImg);
      let toyP = document.createElement('p');

      if (toyLikes === 1) {
          toyP.textContent = "1 like";
      } else {
          toyP.textContent = toyLikes + " likes"
      }
      getToyDiv.appendChild(toyP);

      let toyBtn = document.createElement('button');
      toyBtn.setAttribute("class", "like-btn");
      toyBtn.setAttribute("id", toyID);
      toyBtn.setAttribute("type", "button");
    
      toyBtn.textContent = "  like  ";
      getToyDiv.append(toyBtn);
      getToyDiv.querySelector(".like-btn").addEventListener('click', () => 
          likeUpdate(toyID))
  }
}

function handleError(err) {
  console.log('error = ' + err);    
}

function initialize() {
  console.log('toyUrl = ', toyUrl)
}

function likeUpdate(likeId) {

   let i = likeId - 1;
   let likes = likeArr[i];
   likes++;
   likeArr[i] = likes 
   likesNum = likeArr[i]

   let likeStr = '';

    fetch(`http://localhost:3000/toys/${likeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json" 
        },
        body: JSON.stringify({
          "likes": likesNum,
        })
    })

    if (likesNum === 1) {
        likeStr = "1 like";
    } else {
        likeStr = `${likesNum} likes`;
    }

    const getRightDiv = document.querySelectorAll("div > p")[i];
    getRightDiv.innerHTML = likeStr
    
}

const addToyBtn = document.querySelector('.add-toy-form');
addToyBtn.addEventListener('submit', prepToySubmit);

function prepToySubmit(e) {

    e.preventDefault();

    let inputArr = document.querySelectorAll(".input-text");
    let toyName = inputArr[0].value.trim();
    let toySrc = inputArr[1].value.trim();


      e.preventDefault;
      if (toyName > "") {
          let myNewObj = {name: toyName, image: toySrc, likes: 0};
          submitData(toyName, toySrc);
          displayNewToy(myNewObj, maxId);
      }    
}

function submitData(toyName, toySrc) {

  let dataObj = {name: toyName, image: toySrc, likes: 0};
  let oneToyObj=[{name: toyName, image: toySrc, likes: 0}];

    fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(dataObj),
    })
    .then(res => res.json())
    .then(data => {
        maxId = data.id
        console.log('All right ', data);
    })
    .catch((error) => console.error('Error: ', error));
}

function displayNewToy(buildObj, maxId) {

      let parent = document.querySelector("div#toy-collection");

      likeArr[maxId] = 0;

      maxId = maxId + 1;
      let toyID = maxId;
      let toyName = buildObj.name; 
      let toyImgURL = buildObj.image;
      let toyLikes = buildObj.likes
    
      let createtNewToyDiv = document.createElement('div');
      createtNewToyDiv.setAttribute("class", "card");
      createtNewToyDiv.setAttribute("id", toyID);
      parent.appendChild(createtNewToyDiv);

    
      let h2NewToy = document.createElement("h2");
      h2NewToy.textContent = toyName;
      createtNewToyDiv.appendChild(h2NewToy);
    
      let NewToyImg = document.createElement("img");
      NewToyImg.setAttribute("src", toyImgURL);
      NewToyImg.setAttribute("class", "toy-avatar")
      createtNewToyDiv.appendChild(NewToyImg);

      let newToyP = document.createElement('p');
      if (toyLikes === 1) {
          newToyP.textContent = "1 like";
      } else {
          newToyP.textContent = toyLikes + " likes"
      }
      createtNewToyDiv.appendChild(newToyP);
    
      let newToyBtn = document.createElement('button');
      newToyBtn.setAttribute("class", "like-btn");
      newToyBtn.setAttribute("id", toyID);
      newToyBtn.setAttribute("type", "button");
    
      newToyBtn.textContent = "  like  ";
      createtNewToyDiv.appendChild(newToyBtn);

      createtNewToyDiv.querySelector(".like-btn").addEventListener('click', () => 
             likeUpdate(toyID))         

    }