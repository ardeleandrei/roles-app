<template>
  <div class="wrapper">
    <div class="container">
      <div v-if="this.$route.query.action === 'create'" class="create">
        <h1>Create Role</h1>
      </div>
      <div v-if="this.$route.query.action === 'edit'" class="edit">
        <h1>Edit Role: {{ this.$store.state.selectedRole.name }}</h1>
      </div>
      <div class="form">
        <div class="label">Name</div>
        <input v-model="name" placeholder="Enter name" />
        <div class="label">Type</div>
        <input v-model="type" placeholder="Enter type" />
        <div class="label">Description</div>
        <textarea v-model="description" placeholder="Enter description" />
        <div>
          <label for="editable">Is editable</label>
          <input type="checkbox" v-model="editable" id="editable" />
        </div>
        <div>
          <label for="active">Is active</label>
          <input type="checkbox" v-model="active" id="editable" />
        </div>
        <button
          class="submit-btn"
          v-if="this.$route.query.action === 'create'"
          v-on:click="submitRole"
        >
          Submit role
        </button>
        <button
          class="submit-btn"
          v-if="this.$route.query.action === 'edit'"
          v-on:click="editRole"
        >
          Update role
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      name: "",
      type: "",
      description: "",
      editable: false,
      active: false,
      users: [],
    };
  },

  created() {
    if (this.$route.query.action === "edit") {
      let role = this.$store.state.selectedRole;
      this.name = role.name;
      this.type = role.type;
      this.description = role.description;
      this.editable = role.editable;
      this.active = role.active;
      this.users = role.users;
    }
  },
  methods: {
    submitRole() {
      let randomId = Math.floor(Math.random() * 100) + 10;
      let now = new Date();
      let date =
        now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
      let mockUsers = [
        {
          id: 1,
          first_name: "Jason",
          last_name: "Mossburg",
          photo_url: "http://placekitten.com/60/60",
        },
        {
          id: 2,
          first_name: "Bill",
          last_name: "Hayes",
          photo_url: "http://placekitten.com/60/60",
        },
      ];
      let newRole = {
        id: randomId,
        name: this.name,
        type: this.type,
        description: this.description,
        editable: this.editable,
        active: this.active,
        users: mockUsers,
        created_on: date,
        modified_on: date,
      };
      if (this.name && this.type) {
        // Update state
        this.$store.commit("addRole", newRole);
        // Navigate to main page
        this.$router.push("/");
      } else {
        alert("Form is incomplete");
      }
    },
    editRole() {
      let now = new Date();
      let date =
        now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
      let updatedRole = {
        ...this.$store.state.selectedRole,
        name: this.name,
        type: this.type,
        description: this.description,
        editable: this.editable,
        active: this.active,
        modified_on: date,
      };
      // Update state
      this.$store.commit("editRole", updatedRole);
      // Navigate to main page
      this.$router.push("/");
    }
  },
};
</script>
<style scoped>
h1 {
  font-size: 18px;
  color: grey;
  margin: 30px;
}
.wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 20px);
}
.container {
  display: flex;
  width: 60%;
  height: 70vh;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.form {
  display: flex;
  flex-direction: column;
  width: 250px;
}
input {
  margin-top: 10px;
}

textarea {
  margin-top: 10px;
}

.label {
  margin-top: 12px;
  text-align: left;
}

label {
  margin: 10px;
}

.submit-btn {
  border: none;
  background-color: rgb(62, 184, 199);
  height: 30px;
  color: white;
  margin-top: 12px;
  border-radius: 4px;
}

.submit-btn:hover {
  cursor: pointer;
}
</style>
