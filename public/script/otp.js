window.onload=()=>{
  load();
}

let verifyOtp = (id)=>{

    // console.log(id)
    // console.log(document.getElementById("otp").value)
  
  if(document.getElementById("otp").value==id){
    
    document.getElementById('verify').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  </svg>
  <div class="alert alert-success d-flex align-items-center justify-content-between mt-2" role="alert">
  <div>
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    OTP Verified Successfully!
  </div>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
    
    document.getElementById('form').innerHTML=`<div class="form-floating mb-3">
    <input type="password" class="form-control" id="password"
        placeholder="Password" name="p1"
        pattern=(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}
        
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        required onkeyup='check();'>
    <label for="password">Password</label>
</div>

<div class="form-floating mb-3">
    <input type="password" class="form-control" id="confirm_password"
        placeholder="Password" name="p2" required onkeyup='check();'>
    <label for="confirm_password">Confirm Password</label>
</div>

<div id='message' class="text-center m-4"></div>

<div class="d-grid">
    <button class="btn btn-primary btn-login text-uppercase fw-bold"
        type="submit">Reset
        Password</button>
</div>`

  }
  else{
    
        document.getElementById('verify').innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
      </svg>
      <div class="alert alert-warning d-flex align-items-center justify-content-between mt-2" role="alert">
        <div>
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          Invalid OTP, please try again.
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
  }
  }

  

let load=async ()=>{
  
  document.getElementById("resend").disabled=true

var timeleft = 20;
await new Promise(resolve=>{ 
  
  var counter=setInterval(function(){
  if(timeleft<1){
    resolve("abc");
    clearInterval(counter);
  }
  else{
    document.getElementById("count").innerHTML = timeleft+"s";
    
  }
  timeleft -= 1;
}, 1000);
})
document.getElementById("count").innerHTML=""
document.getElementById("resend").disabled=false


}
