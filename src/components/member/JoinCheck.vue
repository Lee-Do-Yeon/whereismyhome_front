<template>
  <b-container class="bv-example-row mt-3">
    <b-card-group deck style="justify-content: center; margin-top: 200px">
      <b-card border-variant="primary" title="일반" tag="article" style="max-width: 400px">
        <font-awesome-icon class="fa-6x" icon="fa-solid fa-user-large" />
        <br />
        <br />
        <router-link to="/member/joinMember"
          ><b-button variant="primary">가입하기</b-button></router-link
        >
      </b-card>

      <b-card border-variant="primary" title="중개사" tag="article" style="max-width: 400px">
        <font-awesome-icon class="fa-6x" icon="fa-solid fa-building-user" />
        <br />
        <br />
        <router-link to="/member/joinAgent"
          ><b-button variant="primary">가입하기</b-button></router-link
        >
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
export default {};
</script>

<style></style>
