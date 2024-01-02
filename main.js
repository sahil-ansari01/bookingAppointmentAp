const nameIn = document.getElementById('name');
const emailIn = document.getElementById('email');
const phoneIn = document.getElementById('phone');
const myForm = document.querySelector('#my-form');
const list = document.querySelector('.list');

// onSubmit event listener
myForm.addEventListener('submit', onSubmit);

// submit function 
function onSubmit(e) {
    e.preventDefault();
    // fetch user data
    const userData = {
        name: nameIn.value,
        email: emailIn.value,
        phone: phoneIn.value
    }
    
    // save in database/cloud
    axios.post('https://crudcrud.com/api/08c6b968d64549c283c46dd8a6e2f2a7/appointmentData', userData)
    .then((res) => {
        showNewUserOnScreen(res.data)
        console.log(res)
    })
    .catch((err) => {
        console.log(err);
    })

    function showNewUserOnScreen(userData) {
        
        // create li, delete and edit elements
        const li = document.createElement('li');
        const delBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        // adding class name to elements
        li.className = 'list-item';
        delBtn.className = 'delete-btn delete-btn-hover';
        editBtn.className = 'edit-btn edit-btn-hover';

        // adding text node to all element
        const listTextNode = document.createTextNode(`${nameIn.value} ${emailIn.value} ${phoneIn.value}`);
        const delBtnTextNode = document.createTextNode('Delete');
        const editBtnTextNode = document.createTextNode('Edit');

        // append textNode to specific elements
        li.appendChild(listTextNode);
        delBtn.appendChild(delBtnTextNode);
        editBtn.appendChild(editBtnTextNode);

        // append element to parent element
        list.appendChild(li);
        li.appendChild(delBtn);
        li.appendChild(editBtn);

        // clear input
        nameIn.value = '';
        emailIn.value = '';
        phoneIn.value = '';

        // event listener
        delBtn.addEventListener('click', deleteEl);
        editBtn.addEventListener('click', editEl);

        // Delete function
        function deleteEl() {
            li.remove();
            localStorage.removeItem(userKey);
        }

        // Edit function
        function editEl() {
            const values = JSON.parse(localStorage.getItem(userKey));
            nameIn.value = values.name;
            emailIn.value = values.email;
            phoneIn.value = values.phone;

            li.remove();
            localStorage.removeItem(userKey);
        }

    }

    
}

