<template>
  <ul>
    <li class="active"><a href="#">All Jobs</a></li>
    <li><a href="#">Recommended Jobs</a></li>
    <li><a href="#">Saved Jobs</a></li>
    <li><a href="#">Applied Jobs</a></li>
  </ul>
  <q-btn
    color="green-1"
    class="q-px-sm"
    dense
    size="sm"
    outline
    rounded
    text-color="green"
    icon="edit_square"
    label="0/15 Jobs Applied"
  />
</template>

<script setup></script>

<style lang="scss" scoped>
ul {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 40px;
  margin: 0;
  li {
    a {
      color: #000;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 500;
      padding: 8px 0;
    }
  }
  .active {
    border-bottom: 2px solid #000;
  }
}
@media (min-width: 768px) and (max-width: 1024px){
  ul {
    column-gap: 15px;
    li {
      padding: 5px 0;
      a {
        font-size: 11px;
      }
    }
  }
}
@media (max-width: 767px) {
  ul {
    column-gap: 15px;
    overflow-x: auto;
    padding: 5px 0;
    width: 100%;
    justify-content: flex-start;
    li {
      text-align: center;
      padding: 5px 0;
      a {
        font-size: 12px;
        padding: 5px 0;
        letter-spacing: 0;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 2px;
    height: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(90, 94, 185, 0.5);
    border-radius: 10px;
  }
  .q-btn{
    margin-top: 25px;
  }
}
</style>
