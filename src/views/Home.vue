<template>
  <div class="wrapper">
    <div class="backdrop">
      <div class="container">
        <div class="header">
          <div class="inputs">
            <input
              class="search-input"
              v-model="searchQuery"
              placeholder="Search"
            />
            <div class="dropdown">
              <label for="status">Role status</label>
              <select v-model="statusFilter" name="status" id="status">
                <option value="ANY">Active and Inactive</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          <button class="create-role-button" v-on:click="create">CREATE NEW ROLE</button>
        </div>
        <div class="roles">
          <RoleCard
            v-for="role in filteredRoles"
            :key="role.id"
            :roleId="role.id"
            :roleName="role.name"
            :roleType="role.type"
            :roleDescription="role.description"
            :isEditable="role.editable"
            :isActive="role.active"
            :users="role.users"
            :dateCreated="role.created_on"
            :dateModified="role.modified_on"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RoleCard from "@/components/RoleCard.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    RoleCard,
  },
  data() {
    return {
      statusFilter: "ANY",
      searchQuery: "",
    };
  },

  computed: mapState({
    filteredRoles(state) {
      if (this.statusFilter === "ACTIVE") {
        return state.roles.filter((role) =>
          role.active && this.searchQuery !== ""
            ? role.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            : role.active
        );
      } else if (this.statusFilter === "INACTIVE") {
        return state.roles.filter((role) =>
          !role.active && this.searchQuery !== ""
            ? role.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            : !role.active
        );
      } else {
        return state.roles.filter((role) =>
          this.searchQuery !== ""
            ? role.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            : true
        );
      }
    },

    roleNames(state) {
      return state.roles.map((role) => role.name);
    },
  }),
  methods: {
    create: function() {
      this.$router.push({name: 'manage', query: {action: 'create'}});
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.backdrop {
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: white;
  margin-top: 12px;
  margin-bottom: 50px;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: auto;
}
.title {
  align-self: center;
  text-align: left;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1010px;
  color: grey;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  max-width: 1010px;
}
.roles {
  display: flex;
  flex-wrap: wrap;
  max-width: 1038px; /** Fit 3 cards horizontally at most */
  justify-content: center;
  margin-bottom: 70px;
  margin-top: 50px;
}
.create-role-button {
  border: none;
  border-radius: 4px;
  width: auto;
  padding-left: 18px;
  padding-right: 18px;
  height: 32px;
  background-color: rgb(62, 184, 199);
  color: white;
}
.create-role-button:hover {
  cursor: pointer;
}
.search-input {
  border: none;
  border-bottom: solid rgb(62, 184, 199) 2px;
  height: 17px;
  width: 210px;
  padding-top: 23px;
}

.search-input:focus {
  outline: none;
}
input {
  background: url("https://img.icons8.com/material-outlined/24/919191/search--v1.png") right no-repeat;
  background-size: 16px;
  background-position-y: bottom;
}
.inputs {
  display: flex;
  align-items: center;
}

.dropdown {
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  border-bottom: solid rgb(62, 184, 199) 2px;
  width: 210px;
}

.dropdown label {
  font-size: 12px;
  font-weight: bold;
  color: grey;
  text-align: left;
  margin-bottom: 8px;
}

select {
  border: 0px;
  outline: 0px;
  height: 19px;
}

select:hover {
  cursor: pointer;
}
</style>
