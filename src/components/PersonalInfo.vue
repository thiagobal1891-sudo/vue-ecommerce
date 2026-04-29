<template>
  <header class="main-header">
    <div class="userprofile">
      <a href="#">Home</a>
      <span>›</span>
      <span>User Profile</span>
    </div>
    <button class="logout-btn">➜ Logout</button>
  </header>
  <div class="page-profile">
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
  <form @submit.prevent="guardar">
  <div class="form-grid">

    <div class="campo">
      <label>First Name</label>
      <input v-model="form.firstName" type="text">
      <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
    </div>

    <div class="campo">
      <label>Last Name</label>
      <input v-model="form.lastName" type="text">
    </div>

    <div class="campo full">
      <label>Email</label>
      <input v-model="form.email" type="email">
      <span class="error" v-if="errors.email">{{ errors.email }}</span>
    </div>

    <div class="campo">
      <label>Mobile Number</label>
      <input v-model="form.phone" type="text" placeholder="+598">
    </div>

    <div class="campo">
      <label>Date of Birth</label>
      <input v-model="form.birth" type="date">
    </div>

  </div>
  <h3>Change Password</h3>
  <div class="password-section">
    <div class="campo">
      <label>Current Password</label>
<div class="password-field">
  <input 
    :type="showPassword.current ? 'text' : 'password'" 
    v-model="form.currentPassword"/>
  <button 
    type="button" 
    class="ojito" 
    @click="showPassword.current = !showPassword.current">
    <i v-if="!showPassword.current" class="fa-solid fa-eye"></i>
    <i v-else class="fa-solid fa-eye-slash"></i>
  </button>
  </div>
    </div>
    <div class="campo">
      <label>New Password</label>
  <div class="password-field">
  <input 
    :type="showPassword.new ? 'text' : 'password'" 
    v-model="form.newPassword"/>
  <button 
    type="button" 
    class="ojito" 
    @click="showPassword.new = !showPassword.new">
    <i v-if="!showPassword.new" class="fa-solid fa-eye"></i>
    <i v-else class="fa-solid fa-eye-slash"></i>
  </button>
  </div>
      <div class="strength" :class="passwordStrength">
        {{ passwordStrength }}
      </div>
    </div>
    <div class="campo">
      <label>Confirm Password</label>
  <div class="password-field">
  <input 
    :type="showPassword.confirm ? 'text' : 'password'" 
    v-model="form.confirmPassword"/>
  <button 
    type="button" 
    class="ojito" 
    @click="showPassword.confirm = !showPassword.confirm">
    <i v-if="!showPassword.confirm" class="fa-solid fa-eye"></i>
    <i v-else class="fa-solid fa-eye-slash"></i>
  </button>
  </div>
    </div>
  </div>
  <button type="submit" class="save-btn_">Save Changes</button>
  </form>
    </section>
  </div>
</template>
<script>
export default {
data() {
  return {
    form: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birth: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    errors: {},

    showPassword: {
      current: false,
      new: false,
      confirm: false
    }
  }
},

  computed: {
    passwordStrength() {
      const p = this.form.newPassword
      if (!p) return ''
      if (p.length < 6) return 'weak'
      if (p.match(/[A-Z]/) && p.match(/[0-9]/)) return 'strong'
      return 'medium'
    }
  },
  methods: {
    validar() {
      this.errors = {}
      if (!this.form.firstName) {
        this.errors.firstName = 'Required'
      }
      if (!this.form.email.includes('@')) {
        this.errors.email = 'Invalid email'
      }
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.errors.password = 'Passwords do not match'
      }
      return Object.keys(this.errors).length === 0
    },
    guardar() {
      if (!this.validar()) return
      localStorage.setItem('profile', JSON.stringify(this.form))
      alert('Saved successfully 🚀')
    }
  }
}
</script>
<style>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.userprofile a {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #050505;
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
  border: 1px solid #050505;
  border-radius: 6px;
  padding: 6px 12px;
  color: #13101E;
  margin-right: 20px;
  margin-top: 20px;
}
.logout-btn:hover {
  background: #f2f6f8;
}
h1{
  text-align: left;
  font-family: 'Inter',sans-serif;
  font-size: 20px;
  color: #13101E;
}
h3{
  text-align: left;
  font-family: 'Inter',sans-serif;
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
  border: 3px solid #f3f4f6;
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
  background:#050505;
  border-radius: 8px;
  border: 2px solid #050505;
}
.delete-btn {
  color: #B00020;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 2px solid #B00020;
  border-radius: 8px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.datos {
  display: flex;
  flex-direction: column;
}
.fila {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
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
.date{
  display: flex;}
.password-field {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 350px;
}
.password-field input {
  width: 100%;
  padding-right: 40px;
}
.ojito {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #626262;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ojito:hover {
  color: #22c55e;
}
.save-btn_:hover {
  background: white;
  color: #050505;
}
.page-profile {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
.perfil {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  max-width: 700px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.full {
  grid-column: span 2;
}
.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #f9fafb;
}
input:focus {
  outline: none;
  border-color: #1B4B66;
  box-shadow: 0 0 0 3px rgba(27,75,102,0.1);
}
.save-btn_ {
  margin-top: 20px;
  background: #050505;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
}
.error {
  color: #B00020;
  font-size: 12px;
}
.strength {
  font-size: 12px;
  margin-top: 5px;
  text-transform: capitalize;
}
.strength.weak {
  color: red;
}
.strength.medium {
  color: orange;
}
.strength.strong {
  color: green;
}
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .full {
    grid-column: span 1;
  }
  .perfil {
    max-width: 100%;
  }
}
</style>