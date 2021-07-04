const type = [
	{id:1, name: 'Task', activeSum: 0, archiveSum: 0,checked: ''},
	{id:2, name:'Random', activeSum: 0, archiveSum: 0, checked: ''},
	{id:3, name:'Idea', activeSum: 0, archiveSum: 0,checked: 'checked'}
]
const date =  new Date();
let dateNow = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay()+' '+date.getHours()+':'+date.getMinutes();
let notes = [
	{ id:1, dateCreat: dateNow , content: 'hello my friend', type:type[0], date:'', archived: false },
	{ id:2, dateCreat: dateNow, content: 'i have dinner 29.11.2021 and 30.11.2021 and 29.12.2021', type:type[2] , date:'', archived: false },
	{ id:3, dateCreat: dateNow, content: 'my', type:type[0], date:'', archived: false },
	{ id:4, dateCreat: dateNow, content: 'hello', type:type[1] , date:'', archived: false },
	{ id:5, dateCreat: dateNow ,content: 'end', type:type[0] , date:'', archived: false },
	{ id:6, dateCreat: dateNow ,content: 'hello', type:type[2] , date:'', archived: false },
	{ id:7, dateCreat: dateNow,content: 'friend', type:type[1] , date:'', archived: false },
]
// console.log(notes[1].type.name);