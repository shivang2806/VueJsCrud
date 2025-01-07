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
              <h2>User List</h2>         
                <table class="table myTable" id="example">
                  <thead>
                      <tr>
                          <th>name</th>
                          <th>email</th>
                          <th>phone</th>
                      </tr>
                  </thead>
                  <tbody>
                  
                      <tr v-for="(user, index) in users" :key="index">
                        <td>{{ user.name || 'N/A' }}</td>
                        <td>{{ user.email || 'N/A' }}</td>
                        <td>{{ user.phone_number || 'N/A' }}</td>
                      </tr>    

                  </tbody>
              </table>   
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
        users: [],
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
          const response = await axios.get("http://127.0.0.1:8000/api/v1/user/user-list", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            this.users = response.data.data; // Store the fetched user data
          }
          
        } catch (error) {
          this.$router.push("/login");
        }
      }
    },

    methods: {
   
    }

  }


</script>
