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
    
    // save in localStorage
    const userKey = userData.email;
    const userDataStringify = JSON.stringify(userData);
    localStorage.setItem(userKey, userDataStringify);


    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const listTextNode = document.createTextNode(`${nameIn.value} ${emailIn.value} ${phoneIn.value}`);
    const delBtnTextNode = document.createTextNode('Delete');

    delBtn.className = 'delete-btn delete-btn-hover';
    li.className = 'list-item';

    li.appendChild(listTextNode);
    delBtn.appendChild(delBtnTextNode);

    li.appendChild(delBtn);
    list.appendChild(li);

    // clear input
    nameIn.value = '';
    emailIn.value = '';
    phoneIn.value = '';

    delBtn.addEventListener('click', deleteEl);

    // Delete function
    function deleteEl() {
        li.remove();
        localStorage.removeItem(userKey);
    }
}

