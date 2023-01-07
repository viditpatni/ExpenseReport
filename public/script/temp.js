var check = function() {
  if( document.getElementById('confirm_password').value==="") return
    if (document.getElementById('password').value ==
      document.getElementById('confirm_password').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'matching';
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'not matching';
    }
  }
var verify=function(){
  console.log("inside VERIFY")
    if( document.getElementById('message').innerHTML!='matching'){
    
      alert("Passwords do not match, please try again")
      return false;
    }

    else return true;
}

