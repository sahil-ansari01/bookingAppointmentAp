const nameIn = document.getElementById('name');
const emailIn = document.getElementById('email');
const phoneIn = document.getElementById('phone');
const myForm = document.querySelector('#my-form');
const list = document.querySelector('.list');

window.addEventListener("DOMContentLoaded", () => {
    // get data from database/cloud
    axios.get('https://crudcrud.com/api/0fac035a6ead42858f895374c23e64d9/appointmentData')
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                showNewUserOnScreen(res.data[i]); 
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

// onSubmit event listener
myForm.addEventListener('submit', onSubmit);

// submit function
function onSubmit(e) {
    e.preventDefault();
    // fetch user data
    const userData = {
        name: nameIn.value,
        email: emailIn.value,
        phone: phoneIn.value,
    };
    // save in database/cloud
    axios.post('https://crudcrud.com/api/0fac035a6ead42858f895374c23e64d9/appointmentData', userData)
        .then((res) => {
            showNewUserOnScreen(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

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
    const listTextNode = document.createTextNode(`${userData.name} ${userData.email} ${userData.phone}`); // Fix: Use userData instead of nameIn, emailIn, phoneIn
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

    editBtn.addEventListener('click', () => {
        populateInputField(userData);
        li.remove();
        updateUserData(userData._id, userData);
    })

    function populateInputField(userData) {
        nameIn.value = userData.name;
        emailIn.value = userData.email;
        phoneIn.value = userData.phone;
    }

    function updateUserData(userId, userData) {
        axios.put(`https://crudcrud.com/api/0fac035a6ead42858f895374c23e64d9/appointmentData/${userId}`, {
            name: nameIn.value,
            email: emailIn.value,
            phone: phoneIn.value
        })
    }

    delBtn.addEventListener('click', () => {
        deleteUserData(userData._id, userData.name);
        li.remove();
    })

    function deleteUserData(userId, name) {
        axios.delete(`https://crudcrud.com/api/0fac035a6ead42858f895374c23e64d9/appointmentData/${userId}`)
        .then((res) => {
            console.log(`${name}'s data was deleted`)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
