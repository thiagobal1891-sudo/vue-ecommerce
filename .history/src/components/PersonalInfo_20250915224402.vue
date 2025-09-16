<template>
  <header class="main-header">
  <div class="userprofile">
    <a href="#">Home</a>
    <span>›</span>
    <span>User Profile</span>
  </div>
  <button class="logout-btn">
    ➜ Logout
  </button>
      </header>
  <div class="containeido_personal">
      <header class="info-header">
        <h1>Personal Information</h1>
      </header>
      <section class="perfil">
        <div class="profile-pic">
          <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" alt="Profile">
          <div>
            <button class="upload-btn">Upload</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
  <div>
    <form style="display: flex; flex-direction: column; gap: 10px;">
          <div class="datos">
  <div class="datos fila">
  <div class="campo">
    <label>First Name</label>
    <input type="text" placeholder="">
  </div>
  <div class="campo">
    <label>Last Name</label>
    <input type="text" placeholder="">
  </div>
  </div> 
            <label for="email">Email</label>
            <input class="email" placeholder="" />
            <label for="number">Mobile Number</label>
            <input class="number" placeholder="+598 ">
            <label for="birth">Date of Birth</label>
            <div class="date">            
            <input type="date" placeholder="Select date">
            <span class="icono">&#9662;</span>
            </div>
          </div>

          <h3>Change Password</h3>
          <div class="datos">
            <label>Current Password</label>
            <input class="contraseña" type="text" v-model="password" v-if="ViewPassword">
            <input class="contraseña" type="password" v-model="password" v-else>
            <button class="ojito" @click="ViewPassword =  !ViewPassword" >
            <FontAwesomeIcon :icon="['fas', 'eye']" />
            </button>
            <label>New Password</label>
            <input class="contraseña" type="password" value="********">
            <label>Confirm Password</label>
            <input class="contraseña" type="password" value="********">
          </div>
          <button type="submit" class="save-btn_">Save Changes</button>
        </form>
    </div>
    </section>
  
  </div>

</template>

<script>





export default {
  name: 'PersonalInfo',
  components: {

  },
  data() {
    return {
  productos: [],
  password: "",
  ViewPassword: false
  }
  }
}

</script>

<style>

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 25px;
  margin-right: 190px;
  height: 25px;
}


.userprofile a {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #1B4B66;
  border-color: white;
}

.userprofile span {
  margin: 0 5px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #626262;
}

.logout-btn {
  display: flex;
  align-items: flex-end;
  background: transparent;
  border: 1px solid #1B4B66;
  border-radius: 6px;
  padding: 6px 12px;
  color: #1B4B66;

}

.logout-btn:hover {
  background: #f2f6f8;
}


.containeido_personal {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

h1{
text-align: left;
font-family: 'Inter',sans-serif;
width: 288px;
font-size: 20px;
color: #13101E;
}

h3{
text-align: left;
font-family: 'Inter',sans-serif;
width: 874px;
font-size: 20px;
color: #13101E;
  border-bottom: 1px solid #ccc;
  margin: 25px 0 15px 0;
}




.info-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
  border-bottom: 1px solid #ccc;
  width: 874px;
}

.perfil {
  margin-top: 30px;
  width: 874px;
}

.profile-pic {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px; 
  margin-bottom: 25px;
}

.profile-pic img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.upload-btn,
.delete-btn {
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

.upload-btn {
  color: white;
  width: 136px;
  background: #1B4B66;
  border-radius: 8px;
}

.delete-btn {
  color: #B00020;
  box-sizing: border-box;
  width: 136px;
  background: #FFFFFF;
  border: 2px solid #B00020;
  border-radius: 8px;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.datos {
  display: flex;
  flex-direction: column;
}

.fila {
  flex-direction: row;
  gap: 40px
}

.campo {
  display: flex;
  flex-direction: column;
  width: 284px;
}


label {
font-family: 'Inter', sans-serif;
font-style: normal;
font-weight: 500;
font-size: 16px;
display: flex;
align-items: flex-start;
color: #171520;
margin: 5px;
}

input {
  padding: 10px;
  border-radius: 6px;
  margin: 5px;
  border: 1px solid #ddd;
  background-color: #f3f3f3;
}

.date{
display: flex;
width: 304px;
}

.email{
width: 604px;
}

.number{
width: 392px;
}

.contraseña{
width: 287px;
}

.ojito {
  display: flex;
  width: 20px;
}


.save-btn_ {
  color: white;
  border: none;
  margin-top: 20px;
  padding: 8px;
  width: 136px;
  height: 36px;
  background: #1B4B66;
  border-radius: 8px;
  justify-content: flex-end;
}

</style>