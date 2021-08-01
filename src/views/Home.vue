<template>
<div class="container">
  <div class="roles">
    <RoleCard
      v-for="role in filteredRoles"
      :key="role.id"
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
    };
  },

  computed: mapState({
    filteredRoles(state) {
      if (this.statusFilter === "ACTIVE") {
        return state.roles.filter((role) => role.active);
      } else if (this.statusFilter === "INACTIVE") {
        return state.roles.filter((role) => !role.active);
      } else {
        return state.roles;
      }
    },

    roleNames(state) {
      return state.roles.map((role) => role.name);
    },
  }),
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.roles {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: center;
}
</style>
