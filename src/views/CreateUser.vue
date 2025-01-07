<template>
  <main>
    <div class="container-fluid">
    
      <div class="row">
        <div class="col-md-2 mt-5">
          <ul class="list-group">
                <li class="list-group-item">
                  <RouterLink to="/create-user">Create User</RouterLink>
                </li>
                <li class="list-group-item">
                  <RouterLink to="/user-list">List User</RouterLink>
                </li>
            </ul>
        </div>
        <div class="col-md-10 mt-5">

          <div class="base-box">
            <div class="p-5">
              <h2>Create User</h2>         
              <form>
                  <div class="form-group">
                    <label for="name">User Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" v-model="form_data.name" placeholder="Enter User Name">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form_data.email" placeholder="Enter email">
                    <div class="text-danger" >{{this.validation_msg}}</div>

                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="form_data.password">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Phone Number</label>
                    <input type="phone_number" class="form-control"  placeholder="Password" v-model="form_data.phone_number">
                  </div>
                  <button type="button" class="btn btn-primary mt-3" @click="loginUser" > Sign In</button>
                </form>     
            </div>
          </div>

        </div>
      </div>


    </div> 
  </main>
</template>

<script>

import axios from 'axios'

export default {
    data() {
      return {
        validation_msg: '',
        form_data : {
          name : 'shivang',
          email : 'user@gmail.com',
          password : '12345678',
          phone_number : '12345678'
        },
      };
    },

    mounted() {
      //
    },

    async created() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        this.$router.push("/login");
      } else {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/user/getProfile", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          this.userName = response.data.data.name;
        } catch (error) {
          this.$router.push("/login");
        }
      }
    },

    methods: {
      async loginUser() {
      const token = localStorage.getItem("accessToken");
        
        this.validation_msg = '';

        this.response = await axios.post("http://127.0.0.1:8000/api/v1/user/createUser", 
          {
            email : this.form_data.email,
            password : this.form_data.password
          },
          {
            headers: {
                Authorization: `Bearer ${token}`
              }
          },
          
          ).then(res => {

              if (res.status == 200) {
                
                this.$router.push('/user-list');
              } 
              if(this.accessToken == '')
              {
                this.validation_msg = 'Some thinsg went wrong, Try again!';
              }

            }).catch((err) => {
              if (err.response && err.response.data) {
                this.validation_msg = err.response.data.message;
              }
            });

        }
    }

  }


</script>
