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
              <h2>Welcome to the Dashboard</h2>
              <p v-if="userName">Hello, {{ userName }}!</p>
              <p v-else>Loading...</p>
              
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
        userName: "",
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
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
      }
    }

  }


</script>
