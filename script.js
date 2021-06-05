const add = document.getElementById("add-user");
const double = document.getElementById("double");
const show_millionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculate_wealth = document.getElementById("calculate-wealth");

const main = document.getElementById("main");

let data = [];

getRandomUser()
getRandomUser()
getRandomUser()

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0];

    const new_user = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000)
    }

    // console.log(new_user.name)
    // console.log(new_user.money)

    add_data(new_user);

}

function double_money() {
    data = data.map((user)=>{
        return {...user, money: user.money * 2}
    })

    updateDOM()
}

function add_data(obj){
    console.log(data)
    data.push(obj)

    updateDOM()
}

function formatMoney(number) {
    return '$'+(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}


function updateDOM(providedData = data){
    main.innerHTML = ""
    main.innerHTML += '<h2> <strong>Person</strong>Wealth</h2>'

    providedData.forEach((item) => {
        // const element = document.createElement('<div>')
        main.innerHTML += `<div class='person'><p>${item.name}</p><p>${formatMoney(item.money)}</p></div>`;
    })
}


function showMillionaires(){

    data = data.filter((user) => {
        return user.money > 1000000;
    })

    updateDOM();
}

function sortrich(){
    data.sort((a,b) => b.money - a.money)
    updateDOM();
}

function calculateWealth(){
    const wealth = data.reduce((amount , user) => (amount += user.money), 0)

    const wealthelement = document.createElement("div")
    wealthelement.innerHTML = `Total Wealth : <strong>${formatMoney(wealth)}</strong>`

    main.appendChild(wealthelement);
    // console.log(wealth)
}

add.addEventListener("click", getRandomUser)
double.addEventListener("click", double_money)
show_millionaires.addEventListener("click", showMillionaires)
sort.addEventListener("click", sortrich)
calculate_wealth.addEventListener("click", calculateWealth)