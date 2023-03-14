let title = document.getElementById("title");
let cost = document.querySelectorAll("#cost input");
let count = document.getElementById("count");
let department = document.getElementById("department");
let btncreate = document.getElementById("btncreate");
let tablebody = document.getElementById("table-body") 
let mood="create";
let allDATA;
let globalID;

if(localStorage.product != null){
    allDATA= JSON.parse(localStorage.product);
}else
{
    allDATA=[];
}

let getTotal = ()=>{

    let price= cost[0].value;
    let tax= cost[1].value;
    let tcost= cost[2].value;
    let discount= cost[3].value;
    let taxes= (price * tax)/100;
    let pwt=+price + +taxes;
    let disc= (pwt * discount)/100;
    let totalvalue=(+pwt + +tcost) - disc;
    cost[4].value= Math.ceil( totalvalue);
    

}

for(let i=0 ; i<cost.length ; i++){
    cost[i].addEventListener('keyup',getTotal);
}

const date = new Date();
let day = date.getDay();
let month = date.getMonth() +1;
let year = date.getFullYear();

let createobject = () =>{

    let isValid = validation();
    if(isValid == false) {
        alert("fill all cells");
        return;
        }
        let newdata={
        title: title.value,
        price: cost[0].value,
        tax: cost[1].value,
        tcost: cost[2].value,
        discount: cost[3].value,
        total: cost[4].value,
        count: count.value,
        department: department.value,
        Date: date


    }
    if(mood=="create"){
    if(newdata.count>1){
        for(let i = 0; i < newdata.count ; i++){ 
            allDATA.push(newdata);
        } 
    }else{
        allDATA.push(newdata);
    
    }
}else{
    allDATA[globalID]= newdata;
    mood='create';
    btncreate.innerHTML="create";
    btncreate.classList.replace("btn-warning","btn-info");
    count.classList.remove("none");
}
    localStorage.setItem('product', JSON.stringify(allDATA));
    clearInputs();
    showdata();
}

let showdata = ()=>{
    let table= '';

    for(let i=0; i< allDATA.length; i++){

        table +=`
        <tr>
            <td> ${i+1}</td>
            <td> ${allDATA[i].title}</td>
            <td> ${allDATA[i].price}</td>
            <td> ${allDATA[i].tax}</td>
            <td> ${allDATA[i].tcost}</td>
            <td> ${allDATA[i].discount}</td>
            <td> ${allDATA[i].total}</td>
            <td> ${allDATA[i].department}</td>
            <td> <button onclick='deleteItem(${i})' class="btn btn-danger"> Remove </button> </td>
            <td> <button onclick='updateData(${i})' class='btn btn-primary'> Update </button> </td>
            <td>${allDATA[i].Date}</td>
        </tr>
`
    }
    tablebody.innerHTML=table;
    
}


// check validation
let validation = () => {
    let isValid = true;
    for(let i = 0 ; i < 5; i++) {
        if(cost[i].value == null || cost[i].value == "" ) {
            isValid = false;
        }
    }
    if (title.value == null || title.value == "") {
        isValid = false;
    }
    if (count.value == null || count.value == "") {
        isValid = false;
    }
    if (department.value == null || department.value == "") {
        isValid = false;
    }
    return isValid;
}

//clear input
let clearInputs= ()=>{
    title.value=""
    cost[0].value=""
    cost[1].value=""
    cost[2].value=""
    cost[3].value=""
    cost[4].value=""
    count.value=""
    department.value =""
}


//delete one Item
let deleteItem = (i)=>{
    allDATA.splice(i,1);
    localStorage.product = JSON.stringify(allDATA);
    showdata();
}



let updateData=(i)=>{
    mood="update"; 
  title.value=allDATA[i].title;
  cost[0].value=allDATA[i].price;
    cost[1].value=allDATA[i].tax;
   cost[2].value=allDATA[i].tcost;
   cost[3].value=allDATA[i].discount;
   cost[4].value=allDATA[i].total;
   department.value=allDATA[i].department;
   globalID=i;
   count.classList.add("none");
   btncreate.innerHTML="update";
   btncreate.classList.replace("btn-info","btn-warning");
}

btncreate.addEventListener('click',createobject);


showdata();

localStorage.clear();