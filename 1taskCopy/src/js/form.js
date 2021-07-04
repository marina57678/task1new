
	function createForm(){
		const fromContainer = document.querySelector('.form-note');
		let formAdd = document.createElement('form');
		formAdd.className = 'form-note-body';
		formAdd.id= ('form-note')

		function createOptions(type){	
			const formAdd = document.getElementById('form-note');
			let options = document.createElement('div');

			for(let el of type){
				options.insertAdjacentHTML('beforeend', `
					<div class="type-${el.id}">
						<input id="form-radio-${el.id}" name="type" type="radio" value="${el.name}" class="${el.name}" ${el.checked}>
						<label for="form-radio-${el.id}">${el.name}</label>
					</div>	
					`)
					formAdd.appendChild(options);
				}
				return options;
			}

			formAdd.innerHTML = `
			<textarea name="comment" cols="40" rows="10" class="form__content _req _content"></textarea>
			`;
			fromContainer.appendChild(formAdd);
			formAdd.append(createOptions(type));
			formAdd.insertAdjacentHTML('beforeend',`
				<div class="submit">
					<input type="submit" value="Отправить"  class="form__submit btn btn-re">
					<input type="reset" value="Очистить" class=" btn btn-del">
					<input type="button" value="Закрыть" class="form__close btn btn-arh ">
				</div
			`)
			formAdd.className = 'form-note-body';
			formAdd.id= ('form-note');
			
			return formAdd;
		};
		
	