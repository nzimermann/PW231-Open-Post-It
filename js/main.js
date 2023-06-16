// Chave para array de posts no localStorage
const postsKey = 'posts'
let postRemovido = false;

function user() {
	
	if (JSON.parse(sessionStorage.getItem("user")) == null) {
		window.open('login.html','_self')
	}
	
	let user_label = document.getElementById('username');
	if (sessionStorage.getItem("user") != null) {
		user_label.innerHTML = `
		<span style="text-decoration: none;" 
		onclick="alert('Usuário já logado')">
		${JSON.parse(sessionStorage.getItem("user")).username}
		</span>`
	}
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
	let user;
	if (sessionStorage.getItem('user') == null) {
		user = null;
	} else {
		user = JSON.parse(sessionStorage.getItem('user')).username
	}
	return {
		"user":user,
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

	if (post.user == null || post.user == '') {
		warningElement.innerHTML = 'É preciso logar para fazer um Post-It';
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
		str += `<tr onclick="alterPost(${i})">
		<td><img src="assets/icons/trash.svg" alt="Lixeira" onclick='removePost(${i})'></td>
		<td>${getPost(i).title}</td>
		<td title="${getPost(i).text}">${text}</td>
		<td>${getPost(i).user}</td>
		<td>${getPost(i).font}</td>
		<td>${getPost(i).color}</td>
		</tr>`;
	}
	return str;
}

function getHTML_divPostIts() {
	if (isPostsNull()) return '';
	let posts = JSON.parse(localStorage.getItem(postsKey));
	let str = ``;
	
	for (let i = posts.length-1; i >= 0 && i > posts.length-7; i--) {
		let color = getPost(i).color;
		let font = getPost(i).font;

		switch(color) {
			case 'Amarelo':
				color = "background-color:#FFC03F;"
				break;
			case 'Azul':
				color = "background-color:#9FD5DF;"
				break;
			case 'Rosa':
				color = "background-color:#F0A2A2;"
				break;
			case 'Verde':
				color = "background-color:#69D7B1;"
				break;
		}

		switch(font) {
			case 'Roboto':
				font = "font-family: 'Roboto', sans-serif;"
				break;
			case 'Arial':
				font = "font-family: Arial, Helvetica, sans-serif;"
				break;
			case 'Times':
				font = "font-family: 'Times New Roman', Times, serif;"
				break;
			case 'Segoe UI':
				font = "font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;"
				break;
		}

		str += `<div class="post-it" style="${color}${font}">
			<h4>${getPost(i).title}</h4>
			<p>${getPost(i).text}</p>
		</div>`;
	}
	return str;
}

function updateTable() {
	let rows = getHTML_tableRows();
	document.getElementById('datatable').innerHTML = rows;
	updatePostIts();
}

function updatePostIts() {
	let divs = getHTML_divPostIts();
	document.getElementById('postit-area').innerHTML = divs;
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
	clearForm(document.getElementById('form-post'));
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
	if (!verifyUser(getPost(index).user)) {
		alert('Você não pode excluir publicações de outros usuários!');
		return;
	}
	if (confirm("Deletar post-it?")) {
		posts.splice(index, 1);
		localStorage.setItem(postsKey, JSON.stringify(posts));
		updateTable();
		postRemovido = true;
	}
}

function alterPost(index) {
	if (isPostsNull()) return;
	if (postRemovido) {
		postRemovido = false;
		return;
	}
	document.getElementById('form-post-warning').style.display = 'none';
	if (!verifyUser(getPost(index).user)) return;
	loadPost_to_form(getPost(index));
	document.getElementById('btn-test').onclick = function() {
		if (!verifyPostFormDataOk(getPostFormData())) return;
		updatePost(getPostFormData(), index);
		hideButton();
	}
}

function loadPost_to_form(post) {
	if (post == null || post == '') return;
	document.getElementById('inputTitle').value = post.title;
	document.getElementById('inputText').value = post.text;
	document.getElementById('selectFont').value = post.font;
	document.getElementById('selectColor').value = post.color;
	document.getElementById('isPrivate').checked = post.isPrivate;
	showButton();
}

function updatePost(newPost, index) {
	if (isPostsNull()) return;
	let posts = JSON.parse(localStorage.getItem(postsKey));
	posts[index] = newPost;
	localStorage.setItem(postsKey, JSON.stringify(posts));
	updateTable();
}

function verifyUser(username) {
	return (JSON.parse(sessionStorage.getItem('user')).username === username);
}