// Chave para array de posts no localStorage
const postsKey = 'posts'

function user() {
	/*
	if (JSON.parse(sessionStorage.getItem("user")) == null) {
		window.open('login.html','_self')
	}
	*/
	let user = document.getElementById('username')
	user.innerHTML = JSON.parse(sessionStorage.getItem("user")).username
	return user
}

function postIt(post) {
	if (localStorage.getItem(postsKey) == null) {
		localStorage.setItem(postsKey, '[]');
	}

	let posts = JSON.parse(localStorage.getItem(postsKey));
	if (!verifyPostFormDataOk(post)) return;

	posts.push(post);
	localStorage.setItem(postsKey, JSON.stringify(posts));
	clearForm(document.getElementById('form-post'));
	updateTable();
}

function getPostFormData() {
	return {
		"title":document.getElementById('inputTitle').value,
		"text":document.getElementById('inputText').value,
		"font":document.getElementById('selectFont').value,
		"color":document.getElementById('selectColor').value,
		"isPrivate":document.getElementById('isPrivate').checked
	}
}

function clearForm(form) {
	form.reset();
}

function verifyPostFormDataOk(post) {
	let warningElement = document.getElementById('form-post-warning');
	if (post.title == null || post.title == '') {
		warningElement.innerHTML = 'O título deve ser preenchido';
		warningElement.style.display = 'block';
		return false;
	}
	
	if (post.text == null || post.text == '') {
		warningElement.innerHTML = 'Escreva algo no post-it';
		warningElement.style.display = 'block';
		return false;
	}

	warningElement.style.display = 'none';
	return true;
}

function getPost(index) {
	return JSON.parse(localStorage.getItem(postsKey))[index];
}

function getHTML_tableRows() {
	if (isPostsNull()) return '';
	let posts = JSON.parse(localStorage.getItem(postsKey));
	let str = ``;
	
	for (let i = 0; i < posts.length; i++) {
		let text = getPost(i).text;
		if (text.length > 22) {
			text = text.substring(0, 22)+'...';
		}
		str += `<tr>
		<td><img src="assets/icons/trash.svg" alt="Lixeira" onclick='removePost(${i})'></td>
		<td>${getPost(i).title}</td>
		<td title="${getPost(i).text}">${text}</td>
		<td>${document.getElementById('username').innerHTML}</td>
		<td>${getPost(i).font}</td>
		<td>${getPost(i).color}</td>
		</tr>`;
	}
	return str;
}

function updateTable() {
	let rows = getHTML_tableRows();
	document.getElementById('datatable').innerHTML = rows;
	
}

function hideButton() {
	let btn_test = document.getElementById('btn-test')
	let btn_cancel = document.getElementById('btn-cancel')
	let btn_limpar = document.getElementById('btn-limpar')
	let btn_postit = document.getElementById('btn-postit')
		
	btn_test.style.display = "none"
	btn_cancel.style.display = "none"
	btn_postit.style.display = "inline-block"
	btn_limpar.style.display = "inline-block"
}

function showButton() {
	let btn_limpar = document.getElementById('btn-limpar')
	let btn_postit = document.getElementById('btn-postit')
	let btn_test = document.getElementById('btn-test')
	let btn_cancel = document.getElementById('btn-cancel')

	btn_limpar.style.display = "none"
	btn_postit.style.display = "none"
	btn_test.style.display = "inline-block"
	btn_cancel.style.display = "inline-block"
}

function isPostsNull() {
	return (localStorage.getItem(postsKey) == null
	|| JSON.parse(localStorage.getItem(postsKey)).length === 0);
}

function removePost(index) {
	if (isPostsNull()) return;
	let posts = JSON.parse(localStorage.getItem(postsKey));
	if (confirm("Deletar post-it?")) {
		posts.splice(index, 1);
		localStorage.setItem(postsKey, JSON.stringify(posts));
		updateTable();
	}
}