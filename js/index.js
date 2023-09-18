document.addEventListener("DOMContentLoaded", () =>{
    monsterFetcher();
    pageChanger();
    formLoader();
    formSubmitter();
})

let currentMonster = 0;

// when page loads, show first 50 monsters
//create function that fetches JSON data from monsters API
//limit number of monsters returned to 50
//call function that will populate webpage
function monsterFetcher() {
    const monsterUrl = `http://127.0.0.1:3000/monsters/`
    fetch(monsterUrl)
    .then((data) => data.json())
    .then(monsterPopulator);
}

//create function that populates web page with monster info
//should contain:  Monster name, age, and description
function monsterPopulator(allMonsters) {
    const monsterContainer = document.getElementById('monster-container');
    monsterContainer.innerHTML = "";
    fiftyMonsters = allMonsters.slice(currentMonster, currentMonster+50);
    fiftyMonsters.forEach((singleMonster) => {
        const monsterCage = document.createElement('div')
        const monsterName = document.createElement('h2');
        monsterName.innerText = singleMonster['name'];
        const monsterAge = document.createElement('h4');
        monsterAge.innerText = `Age: ${singleMonster['age']}`;
        const monsterBio = document.createElement('p');
        monsterBio.innerText = `Bio: ${singleMonster['description']}`;
        monsterCage.append(monsterName, monsterAge, monsterBio);
        monsterContainer.appendChild(monsterCage);
    })
}


//function to allow use of buttons to switch to next 50 monsters or back to previous 50
function pageChanger() {
    const forwardBtn = document.querySelector('#forward');
    forwardBtn.addEventListener('click', () => {
        currentMonster = currentMonster+50;
        monsterFetcher();
        console.log('you pressed forward')
        console.log(currentMonster)
    })

    const backBtn = document.querySelector('#back');
    backBtn.addEventListener('click', () => {
        if (currentMonster >= 50) {
            currentMonster = currentMonster-50
        };
        monsterFetcher();
        console.log('you pressed back')
        console.log(currentMonster)
    })
}


//function to create new monster submission form
function formLoader() {
    const form = document.createElement('form');
    form.setAttribute('action', 'http://127.0.0.1:3000/monsters/');
    form.setAttribute('method', 'post');
    form.setAttribute('id', 'form');
    const createMonster = document.getElementById('create-monster');
    createMonster.append(form)
    
    const formItems = document.createElement('ul');
    form.append(formItems);

    const nameLine = document.createElement('li');
    const nameLineLabel = document.createElement('label');
    nameLineLabel.setAttribute('for', 'name');
    nameLineLabel.innerText = 'Name:  ';
    const nameLineInput = document.createElement('input');
    nameLineInput.setAttribute('type', 'text');
    nameLineInput.setAttribute('id', 'name');
    nameLineInput.setAttribute('name', 'monster_name');
    nameLine.append(nameLineLabel, nameLineInput);
    
    const ageLine = document.createElement('li');
    const ageLineLabel = document.createElement('label');
    ageLineLabel.setAttribute('for', 'age');
    ageLineLabel.innerText = 'Age:  ';
    const ageLineInput = document.createElement('input');
    ageLineInput.setAttribute('type', 'text');
    ageLineInput.setAttribute('id', 'age');
    ageLineInput.setAttribute('name', 'monster_age');
    ageLine.append(ageLineLabel, ageLineInput);
    
    const bioLine = document.createElement('li');
    const bioLineLabel = document.createElement('label');
    bioLineLabel.setAttribute('for', 'bio');
    bioLineLabel.innerText = 'Bio:  ';
    const bioLineInput = document.createElement('input');
    bioLineInput.setAttribute('type', 'text');
    bioLineInput.setAttribute('id', 'bio');
    bioLineInput.setAttribute('name', 'monster_bio');
    bioLine.append(bioLineLabel, bioLineInput);
    
    const submitLine = document.createElement('li');
    submitLine.setAttribute('id', 'button');
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.innerText = "Add Your Monster";
    submitLine.append(button);
    
    formItems.append(nameLine, ageLine, bioLine, button);
}

//function to take information from form and add new monster to database
function formSubmitter() {
    const form = document.getElementById('form');
    const monsterName = document.getElementById('name');
    const monsterAge = document.getElementById('age');
    const monsterBio = document.getElementById('bio');
    
    form.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        
        const newMonsterInfo =
        {
            name: '',
            age: '',
            description: '',
            id: '',
        }
        
        newMonsterInfo.name = monsterName.value;
        newMonsterInfo.age = monsterAge.value;
        newMonsterInfo.description = monsterBio.value;
        
        const newMonster = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(newMonsterInfo),
        };
        fetch(`http://127.0.0.1:3000/monsters/`, newMonster);
        
    })
}