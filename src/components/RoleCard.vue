<template>
<div class="container">
  <div class="content">
    <div class="status-header">
      <div v-if="!isActive" class="status-badge">INACTIVE</div>
    </div>
    <h1>{{ roleName }}</h1>
    <h2>
      {{
        roleType === "admin" ? "Administrator Role" : "Job Administation Role"
      }}
    </h2>
    <p class="description">{{ roleDescription }}</p>
    <div class="user-avatars">
      <img v-for="user in users" :key="user.id" :src="user.photo_url + '?image=' + user.id" class="user-avatar" width="30px" height="30px">
    </div>
  </div>
  <div class="footer">
      <div v-if="isEditable" class="footer-for-editable">
        <div class="timestamp">Last update: {{dateModified.split('T')[0]}}</div>
        <div class="action-buttons">
          <button class="footer-button edit">EDIT</button>
          <button class="footer-button delete"> DELETE</button>
          
        </div>
      </div>
      <div v-if="!isEditable">
        <div class="timestamp">Date created: {{dateCreated.split('T')[0]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleCard",
  props: {
    roleName: String,
    roleType: String,
    roleDescription: String,
    roleMembers: Array,
    isActive: Boolean,
    isEditable: Boolean,
    users: Array,
    dateCreated: String,
    dateModified: String,
  },
};
</script>

<style scoped>
h1 {
  font-size: 18px;
  color: grey;
}
h2 {
  margin: 0px;
  font-size: 14px;
  font-weight: 300;
  color: rgb(160, 160, 160);
}
p {
  font-size: 14px;
}
.container {
  display: flex;
  flex-direction: column;
  margin: 12px;
  width: 320px;
  height: 320px;
  border: solid rgb(216, 216, 216) 1px;
  border-radius: 4px;
}
.content {
  text-align: left;
  padding: 24px 24px 10px 20px;
}
.status-header {
  height: 24px;
  display: flex;
  flex-direction: row-reverse;
}
.status-badge {
  width: auto;
  padding: 7px 12px 8px 12px;
  border-radius: 6px;
  background-color: red;
  font-size: 9px;
  color: white;
}
.user-avatars {
  display: flex;
}
.user-avatar {
  border-radius: 50px;
  margin-right: 6px;
}
.footer {
  display: flex;
  align-items: center;
  height: 100px;
  background-color: rgb(248, 248, 248);
  border-radius: 0px 0px 4px 4px;
}
.timestamp {
  font-size: 11px;
  margin-left: 20px;
  color: rgb(160, 160, 160);
}
.flex {
  display: flex;
}

.footer-for-editable {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.footer-button {
  margin-right: 10px;
  border:none; 
  background-color: transparent;
  font-weight: bold;
}

.footer-button:hover {
  cursor: pointer;
}

.footer-button.edit {
  color: grey;
}

.footer-button.delete {
  color: red;
}

</style>
