

window.addEventListener('DOMContentLoaded' , () => { 
	creatConstTable(notes,type);
	function creatConstTable(notes,type){	
		function findDates(str){
			for(let elem of notes){
				const regExp = /(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}/g	;	
				let data = elem.content;
				const result = data.match(regExp);
				
				if(result!= (null && undefined)){
					const str = result.map(a => `${ Object(a) }`).join(", ")
					elem.date = str;
					console.log(str)
					console.log(elem.date)
				}
			}	
		}
	findDates();

	let table = document.querySelector('.table-body');
	let content0 = document.createElement('tr');

	for(let elem of notes){
		if(!elem.archived){
			table.insertAdjacentHTML('beforeend', `
				<tr class="table__row ${elem.type.name}" id="table-row-${elem.id}">
						<td class="table__text table__num" id="row-id-${elem.id}">${elem.id}</td>
						<td class="table__text table__date">${elem.dateCreat}</td>
						<td class="table__text  table__comment" id="text-row-${elem.id}">${elem.content}</td>
						<td class="table__text  table__type" id="type-row-${elem.id}">${elem.type.name}</td>
						<td class="table__text  table__time">${elem.date}</td>
						<td class="delete">
					<input type="button" value="Редакт"  id="re-row-${elem.id}" class="btn btn-re" >
					<input type="button" value="Архив"  id="arh-row-${elem.id}" class="btn btn-arh" >
					<input type="button" value="Удалить"  id="delete-row-${elem.id}" class="btn btn-del" >
				</td> 
				</tr>
			`)
			table.appendChild(content0);;	
		}
		button(elem.id);
		// console.log(elem.id);
	}
		return table
	}
	

	function creatArchiveTable(){	
		function findDates(str){
			for(let elem of notes){
				const regExp = /(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}/g	;	
				let data = elem.content;
				const result = data.match(regExp);
				if(result!= null){
					const str = result.map(a => `${ Object(a) }`).join(", ")
					elem.date = str;
				}
			}	
		}
		findDates();

		let tableArch = document.querySelector('.table-arch-body');
		let contentArch = document.createElement('tr');
	
		for (let i= 0; i < notes.length; i++) {
			const element = notes[i];

			if(element.archived){
				tableArch.insertAdjacentHTML('beforeend', `
					<tr class="table__row ${element.type.name}" id="table-row-${element.id}">
						<td class="table__text table__num" id="line-id-${element.id}">${element.id}</td>
						<td class="table__text table__date">${element.dateCreat}</td>
						<td class="table__text  table__comment" id="text-row-${element.id}">${element.content}</td>
						<td class="table__text  table__type" id="type-row-${element.id}">${element.type.name}</td>
						<td class="table__text  table__time">${element.date}</td>
						<td class="delete">
							<input type="button" value="Редакт"  id="re-row-${element.id}" class="btn btn-re" >
							<input type="button" value="Разархивировать"  id="unarh-row-${element.id}" class="btn btn-unarch" >
							<input type="button" value="Удалить"  id="delete-row-${element.id}" class="btn btn-del" >
						</td> 
					</tr>
				`)
				tableArch.appendChild(contentArch);
				
				let unArhRow = document.getElementById("unarh-row-"+element.id);
					
				if (unArhRow) unArhOneRow(element.id);
			}
			button(notes.id);
		}
			
		return tableArch;
	}
	function arhRow(id){	
		let arhRow = document.getElementById('arh-row-'+id);
		let row = document.getElementById('table_line-'+id);
		
		arhRow.addEventListener('click', (e) => {
			e.preventDefault();
			
			const archived = notes.findIndex(el => el.id === id);
			
			notes[archived].archived = true;
			
			document.querySelector('.table-arch-body').innerHTML=``;
			document.querySelector('.table-body').innerHTML=``;
			document.querySelector('.renote').innerHTML = '';
			creatArchiveTable();
			
			creatConstTable(notes,type);
		});
	}
	createForm();
	document.getElementById('form-note').addEventListener('submit', (event) => {
		event.preventDefault();
		
		const form = document.getElementById('form-note');
		const date =  new Date();
		let error = formValidate(form);
		let data = document.querySelector('.form__content').value;		
		let lenghNotes = notes.length;
		let lastNote = notes[lenghNotes-1];
		
		if(error === 0 ){
			const newNote = {
            id: lastNote.id+1,
            dateCreat: dateNow,
            content: form.elements.comment.value,
				type: type.find(item => item.name == form.elements.type.value),
				date:'',
            archived: false,
			}
      notes.push(newNote);
		
		let oldRows = document.querySelectorAll('.table__row');
		
		for (let i= 0; i < oldRows.length; i++) {
			const row = oldRows[i];
			row.remove();
			button(notes.id);
		}
			creatArchiveTable();
			creatConstTable(notes,type);

			document.querySelector('.form-note').classList.toggle('__active');
			document.querySelector('.form__content').value=``;
		}
		
		else alert("заполни!");
		
		button(notes.id);
	});
	
	function button (id){
		let delOneRow = document.getElementById("delete-row-"+id);
		let reOneRow = document.getElementById("re-row-"+id);
		let arhOneRow = document.getElementById("arh-row-"+id);
		
		if(delOneRow) delRow(id);
		if(reOneRow) reRow(id);
		if(arhOneRow) arhRow(id);
		createSumTable(notes,type);
	}
	
	
	function delRow(id){
		
		let delRow = document.getElementById('delete-row-'+id);
		delRow.addEventListener('click', (e) => {
			e.preventDefault();	
			
			const deleted = notes.findIndex(el => el.id === id);
			
			if(deleted>=0){
			
			notes.splice(deleted,1);
			console.log('удалили '+deleted);
			document.querySelector('.table-arch-body').innerHTML=``;
			creatArchiveTable();
			document.querySelector('.table-body').innerHTML=``;
			document.querySelector('.form-note-body').remove();
			creatConstTable(notes,type);
			console.log(notes);
			}
		})
	}
	
	function unArhOneRow(id){
		let unarhRow = document.getElementById('unarh-row-'+id);
		let row = document.getElementById('table_line-'+id);
		
		unarhRow.addEventListener('click', (e) => {
			e.preventDefault();
			const archived = notes.findIndex(el => el.id === id);
			console.log(archived);
			notes[archived].archived = false;
			
			document.querySelector('.table-arch-body').innerHTML=``;
			document.querySelector('.table-body').innerHTML=``;
			
			creatArchiveTable();
			creatConstTable(notes,type);
		});
	}
	
	function reRow(id){
		let reRow=document.getElementById('re-row-'+id);
		
		reRow.addEventListener('click', (e) => {
			const edited = notes.findIndex(el => el.id === id);
			e.preventDefault();
			console.log('я отдаю'+id);
			
			editForm(id);
			
			const formEditClose = document.querySelector('.reform__close');
			
			if (formEditClose) {
				formEditClose.addEventListener('click', () => {
					document.getElementById('form-renote').remove();
				});
			}
			
			const form = document.getElementById('form-renote');
			
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				
				const form = document.getElementById('form-renote');
				let reTextarea = 	document.querySelector('.form__recontent');
				const edited = notes.findIndex(el => el.id === id);
				let reData =  reTextarea.value;
				let reType = form.elements.type.value;
				let curType = type.findIndex(el => el.name === reType);
				
				notes[edited].type=type[curType];
				notes[edited].content=reData;
				
				document.querySelector('.table-arch-body').innerHTML=``;
				document.querySelector('.table-body').innerHTML=``;
				
				creatArchiveTable();
				creatConstTable(notes,type);
				form.remove();
			});
			
		})	
	}
	
	function formValidate(form) {
		
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		
		for (let i= 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input); 
			
			if (input.classList.contains('_content')) {
				if (input.value === '' ) {
					formAddError(input);
					error++;
				}
		}
		console.log(error);
		return error;
		}
	}
	
	function formRemoveError(input) {
		input.classList.remove('_error');
	}
	
	function formAddError(input) {
		// input.parentElement.classList.add('_error');
		input.classList.add('_error');
		console.log('helpMe');
	}
	
	function createSumTable(notes, type){
		const sumContainer = document.querySelector('.table-sum-container');
		
		sumContainer.innerHTML=``;
		
		const summaryTable = document.createElement('table')
		summaryTable.className='table table-sum';
		
		summaryTable.innerHTML=`
			<th  class="table__text ">Type</th>
			<th  class="table__text ">Active</th>
			<th  class="table__text ">Archieved</th>
		`
		sumContainer.appendChild(summaryTable);
		
		type.forEach(el => {
			el.activeSum=0
			el.archiveSum=0
		})
		notes.forEach(el => {
			if(!el.archived){
				el.type.activeSum++
			}
			if(el.archived){
				el.type.archiveSum++
			}
		})
		
		for(let elem of type){
			summaryTable.insertAdjacentHTML('beforeend', `
				<tr class="table__row ${elem.name}">
						<td class="table__text">${elem.name}</td>
						<td class="table__text ">${elem.activeSum}</td>
						<td class="table__text ">${elem.archiveSum}</td>
				</tr>
			`)
		}
		return summaryTable
	}
});










