const list = document.getElementById("list_table");
const button = document.getElementsByName("test2");
const text = document.getElementById("upload_textbox");
const date = document.getElementById("date");
const toDoForm = document.getElementById("toDoForm");


document.getElementById('date').valueAsDate = new Date();
const Todolist = "todolist";
let todo_list = [];
function createtodo(){
    const todo = upload_textbox.value;
    const tododate = date.value;
    painttodo(todo,tododate);
    upload_textbox.value = "";
}
function painttodo(todo,tododate){
    const li = document.createElement('li');
    const p = document.createElement('p');
    const delButton = document.createElement('button');
    const insbutton = document.createElement('button');
    li.setAttribute('class','list_text');
    p.innerHTML = todo;
    delButton.innerHTML = "삭제";
    insbutton.innerHTML = "수정";
    delButton.addEventListener("click",delete_list);
    insbutton.addEventListener("click",insert_list);
    li.innerHTML = "<span>"+tododate+"</span>";
    li.appendChild(p);
    list.appendChild(li);
    li.appendChild(delButton,insbutton);
    li.appendChild(insbutton);
    savetodolist(todo,tododate);
    li.setAttribute('id',todo_list.length)
}
function savetodolist(todo,tododate){
    const loadtext = {text: todo, date: tododate, idx: todo_list.length +1};
    todo_list.push(loadtext);
    localStorage.setItem(Todolist,JSON.stringify(todo_list));
}
function loadtodolist(){
    const load = localStorage.getItem(Todolist);
    if(load !== null){
        const parsedlist = JSON.parse(load);
        parsedlist.sort(date_ascending)
        for(let toDo of parsedlist){
            const {text} = toDo;
            const {date} = toDo;
            painttodo(text,date);
        }
    }
}
function date_ascending(a, b) {
    const dateA = new Date(a['date']).getTime();
    const dateB = new Date(b['date']).getTime();
    return dateA > dateB ? 1 : -1;
}
function delete_list(event){
    const deletebutton = event.target;
    const deletelist = deletebutton.parentElement;
    todo_list = todo_list.filter((toDo) => toDo.idx !== Number(deletelist.id));
    deletelist.remove();
    localStorage.setItem(Todolist,JSON.stringify(todo_list)); 
}
function insert_list(event){
    const insertinput = document.createElement('input');
    insertinput.setAttribute('id','input_text')
    const insertbutton = event.target;
    const insertlist = insertbutton.parentElement;
    const inserttext = insertbutton.previousSibling.previousSibling;
    inserttext.remove();
    insertlist.appendChild(insertinput);
}
function init(){
    loadtodolist();
    toDoForm.addEventListener("submit", createtodo);
}
init();