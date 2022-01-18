var selectedRow = null
function onFormSubmit() {
    if (validate()) 
    {
        var formData = readFormData();
        if (selectedRow == null)
           { saveData(formData);
            insertNewRecord(formData);
           }
        else
            updateRecord(formData);
        resetForm();
    }
  }
 insertNewRecord();
function readFormData() {
   
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}
function insertNewRecord() 
{
    let fromdata=new Array();
    fromdata=JSON.parse(localStorage.getItem("users"));
    if(fromdata!=null)
    {   
        var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        for(var i=0;i<(fromdata.length);i++)
        {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML =fromdata[i].name ;
           // localStorage.setItem("fullName", data.fullName);
            cell2 = newRow.insertCell(1);
            cell2.innerHTML = fromdata[i].empcode;
            //localStorage.setItem("empCode", data.empCode);
            cell3 = newRow.insertCell(2);
            cell3.innerHTML = fromdata[i].salary;
            //localStorage.setItem("salary", data.salary);
            cell4 = newRow.insertCell(3);
            cell4.innerHTML = fromdata[i].city;
            //localStorage.setItem("city", data.city);
            cell4 = newRow.insertCell(4);
            cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                               <a onClick="onDelete(this)">Delete</a>`
                                ;
        } 
        
    }   
}
function insertNewRecord2()
{
}
//my code
function saveData(data)
  {
    let usid,name,emp,sal,city;
    usid=data.Id;
  name=data.fullName;
  emp=data.empCode;
  sal=data.salary;
  city=data.city;
    let user_records=new Array();
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if(user_records.some((v)=>{return v.empCode==emp}))
    {
      alert("Duplicate Data");
    }
    else 
    {
      user_records.push({
       
      "name":name,
      "empcode":emp, 
      "salary":sal,
      "city":city,
      "usid":usid
    })
     //Data Store in LocalStorage
     localStorage.setItem("users",JSON.stringify(user_records));   
    }
    location.reload();
  }

function resetForm() {
    document.getElementById("fullName").value = " ";
    document.getElementById("empCode").value = " ";
    document.getElementById("salary").value = " ";
    document.getElementById("city").value = " ";
    selectedRow = null;
}
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    localStorage.getItem("fullName", td.fullName);
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
    localStorage.getItem("empCode", td.empCode);
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    localStorage.getItem("salary", td.salary);
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
    localStorage.getItem("city", td.city);
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
     selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
    let update=new Array();
    update=JSON.parse(localStorage.getItem("users"));
    for (var i=0; i<update.length; i++) 
    {
        update[i].name=formData.fullName;
        update[i].empcode=formData.empCode;
        update[i].salary=formData.salary;
        update[i].city=formData.city;
        
        localStorage.setItem("users",JSON.stringify(update));
    }
  
    
   
}
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
        let user=new Array();
        localStorage.removeItem(JSON.stringify(user));
        
    }
}
function deletedata(td){
    let user=new Array();
    localStorage.removeItem("users",user);
}
function validate() 
{ 
    var isValid=true;
    function validationforName()
    {
        
        var isValid=true;
        var name=document.getElementById("fullName").value;
        if ((! isNaN(name))||(name==''||name==' ')) 
        {
             isValid = false;
             document.getElementById("fullNameValidationError").classList.remove("hide");
        } 
        else
        {
            if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");  //Name
        }
        return isValid;
    }
    function validationforCity()
    {
        var isValid=true;
        var city=document.getElementById("city").value;
        if ((! isNaN(city))||(city==''||city==' ')) 
         {
        isValid=false;
        document.getElementById("cityintextValidationError").classList.remove("hide");
        }
        else
        {
            if (!document.getElementById("cityintextValidationError").classList.contains("hide"))
            document.getElementById("cityintextValidationError").classList.add("hide");  //Salary
        }
        return isValid;
    }
    function validationforSal()
    {
        var isValid=true;
        var sal=document.getElementById("salary").value;
        if(isNaN(sal)||(sal==''||sal==' '))
         {
        isValid=false;
        document.getElementById("salIsNumberValidationError").classList.remove("hide");
         }
        else
        {
            if (!document.getElementById("salIsNumberValidationError").classList.contains("hide"))
            document.getElementById("salIsNumberValidationError").classList.add("hide");  //Salary
        }
        return isValid;
    }
    function validationforEmpcode()
    {
        var isValid=true;
        var emp=document.getElementById("empCode").value;
        if(isNaN(emp)||(emp==''||emp==' '))
        {
           isValid=false;
           document.getElementById("empIsNumberValidationError").classList.remove("hide");
        }
        else
        {
            if (!document.getElementById("empIsNumberValidationError").classList.contains("hide"))
            document.getElementById("empIsNumberValidationError").classList.add("hide");  //EmpCode
        }
        return isValid;
    }
    var name=validationforName();
    var city=validationforCity();
    var sal=validationforSal();
    var emp=validationforEmpcode();
    
    if((name==false)||(city==false)||(sal==false)||(emp==false))
        {isValid=false;
        return isValid;
        }  
    if(isValid==true)
     {
        
        
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");  //Name
        if (!document.getElementById("empIsNumberValidationError").classList.contains("hide"))
            document.getElementById("empIsNumberValidationError").classList.add("hide");  //EmpCode
        if (!document.getElementById("salIsNumberValidationError").classList.contains("hide"))
            document.getElementById("salIsNumberValidationError").classList.add("hide");  //Salary
        if (!document.getElementById("cityintextValidationError").classList.contains("hide"))
            document.getElementById("cityintextValidationError").classList.add("hide");  //Salary
    }
         return isValid;
}

 
