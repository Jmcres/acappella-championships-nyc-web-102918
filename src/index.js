document.addEventListener("DOMContentLoaded", function(event){

const url ="http://localhost:3000/a_cappella_groups"

let allGroups = []
const table = document.getElementById("table-body")
const main = document.getElementsByClassName("main")

fetch(url)
    .then(function(response){
        console.log(response)
        return response.json()
    })
    .then(function(groupsDataJson){
        console.table(groupsDataJson)
        allGroups = groupsDataJson
        showAllGroups(allGroups)
    })

function showAllGroups(groups){
    table.innerHTML = groups.map(renderSingle)
}

function renderSingle (groups){
    return `
    <tr><td>${groups.college.name}</td> 
    <td>${groups.name}</td> 
    <td>${groups.membership}</td> 
    <td>${groups.college.division}</td> 
    <td><img src='./assets/trophy.png' class="image" data-id='${groups.id}'/></td> </tr>
    `
}

table.addEventListener("click", function(event){
    console.log(event)
    console.log(event.target)
    if (event.target.className === "image"){
        row = event.target.parentNode.parentNode
        console.log(row)
        currentGroupId = event.target.id;
        console.log(currentGroupId)
        moveBy(row)
    }

    function moveBy(row){
        let topWinner = document.getElementById('winner')

         let collegeName = row.querySelectorAll('td')[0].innerText
  let groupName = row.querySelectorAll('td')[1].innerText

    topWinner.innerText = `Winner: ${collegeName} ${groupName}`
    row.parentNode.removeChild(row)
    }

})

})