let employees = [];
let editIndex =null;

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const tableBody = document.querySelector("#employee-table tbody");


const storedEmployees = localStorage.getItem("employees");
if(storedEmployees)
{
    employees = JSON.parse(storedEmployees);
    renderTable();
}

// EVENT LISTENER FOR ADDING OR UPDATING EMPLOYEE
form.addEventListener("submit", function(e)
{
 e.preventDefault();
 const name = nameInput.value.trim();
 const email = emailInput.value.trim();
 const role = roleInput.value.trim();

//  case 1 :-> for any value missing

    if(!name||!email||!role) return ;

    const employeeData={name,email,role};
    

    if(editIndex === null)
    {
        employees.push(employeeData);
    }
    else{
        employees[editIndex] = employeeData;
        editIndex = null;
        form.querySelector("button").innerHTML = "Add Employee";
    }
   
    localStorage.setItem("employees", JSON.stringify(employees));

    form.reset();
    renderTable();

    
})


// TABLE RENDER
    function renderTable()
    {
        tableBody.innerHTML= "";
        employees.forEach((emp,index)=>{
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.role}</td>

             <td class="action-btn">
                <button class="edit-btn" onclick="editEmployee(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
            </td>
            `
            tableBody.appendChild(row);
        })

    }

    // EDIT EMPLOYEE    
    function editEmployee(index){
        const emp = employees[index];
        nameInput.value = emp.name;
        emailInput.value = emp.email;
        roleInput.value = emp.role;
        editIndex = index;
        form.querySelector("button").innerHTML = "Update Employee";
       
    }


    // DELETE EMPLOYEE
    function deleteEmployee(index){
        if(confirm("Are you sure you want to delete this employee?"))
        {
            employees.splice(index,1);
            localStorage.setItem("employees", JSON.stringify(employees));
            
            renderTable();
        }
    }

    //use filter method

// function deleteEmployee(index){
//     if(confirm("Are you sure to delete this employee?")){
//         employees = employees.filter((employee, i) => i!== index);
//         renderTable();
//     }
// }

