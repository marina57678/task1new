function editForm(id){
	console.log('я получил'+id);

	const edited = notes.findIndex(el => el.id === id);
	const fromContainer = document.querySelector('.renote');
	let formRe = document.createElement('form');

	formRe.id='form-renote';
	formRe.classList = 'form-note-body';

	function createOptions(type){	
		const formRe = document.getElementById('form-renote');
		let options = document.createElement('div');

		for(let el of type){
			options.insertAdjacentHTML('beforeend', `
				<div class="type-${el.id}">
					<input id="form-radio-${el.id}" name="type" type="radio" value="${el.name}" class="${el.name}" >
					<label for="form-radio-${el.id}">${el.name}</label>
				</div>	
				`)
				formRe.appendChild(options);
				options.classList = 'options';
			}
			return options;
		}
		
	formRe.innerHTML = `
	<textarea name="comment" cols="40" rows="10" class="form__recontent _req _content">${notes[edited].content}</textarea>
	`;
	fromContainer.appendChild(formRe);
	formRe.append(createOptions(type));
	formRe.insertAdjacentHTML('beforeend',`
	<div class="submit">
		<input type="submit" value="Отправить"  class="form__resubmit form__submit btn btn-re">
		<input type="button" value="выйти" class="reform__close  form__close btn btn-del">
	</div>
	`)
	formRe.className = 'form-note-body';
	formRe.id= ('form-renote');
	
	return formRe;
}