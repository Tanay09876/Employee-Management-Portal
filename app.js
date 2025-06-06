let employees = [];
let editIndex = null;
const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const roleInput = document.getElementById('role');
const tableBody = document.querySelector('#employee-table body');

//Even listener for adding or updating employee

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleInput.value.trim();


    //case 1 ->  for any value missing
    if (!name ||!email ||!role) return;
    
    const employeeData = { name,email,role};

    if(editIndex===null){
        employees.push(employeeData);
        
    }else{
        employees[editIndex] = employeeData;
        editIndex = null;
        form.querySelector("button").innerHTML="Add Employee";

    }
    form.reset();
    renderTable();

})
//table render

function renderTable(){
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = " ";
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index+1}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.role}</td>
            <td class="action-btn">
               

                 <button class="edit-btn" onclick="editEmployee(${index})">Edit</button>
                 <button class=" delete-btn" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


//Edit Employee

function editEmployee(index){
    const employee = employees[index];
    nameInput.value = employee.name;
    emailInput.value = employee.email;
    roleInput.value = employee.role;
    editIndex = index;
    form.querySelector("button").innerHTML="Update Employee";


}


//Delete Employee

function deleteEmployee(index){
    if(confirm("Are you sure to delete this employee?")){
    }
    employees.splice(index,1);
    renderTable();
}

//use filter method

// function deleteEmployee(index){
//     if(confirm("Are you sure to delete this employee?")){
//         employees = employees.filter((employee, i) => i!== index);
//         renderTable();
//     }
// }




