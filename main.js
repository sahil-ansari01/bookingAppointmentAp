const nameIn = document.getElementById('name');
const emailIn = document.getElementById('email');
const phoneIn = document.getElementById('phone');
const myForm = document.querySelector('#my-form');
const list = document.querySelector('.list');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    
    const userData = {
        name: nameIn.value,
        email: emailIn.value,
        phone: phoneIn.value
    }
    const userKey = userData.email;
    const userDataStringify = JSON.stringify(userData);
    localStorage.setItem(userKey, userDataStringify);

    const li = document.createElement('li');
    li.className = 'list-item';

    const listTextNode = document.createTextNode(`${nameIn.value} ${emailIn.value} ${phoneIn.value}`);
    li.appendChild(listTextNode)
    list.appendChild(li);

    li.setAttribute('style', 'text-decoration: none;')
}
