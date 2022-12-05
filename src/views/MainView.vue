<template>
  <div class="main-container">
    <span class="main-text fw-bold"
      >구해줘 홈즈 <br /><router-link to="apt"
        ><button class="btn btn-primary main-btn">아파트 실거래가 조회하기</button></router-link
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "MainView",
};
</script>

<style>
.main-container {
  width: 100%;
  height: 950px;
  background-image: url("../assets/city.jpg");
}

.main-text {
  margin: auto;
}

.main-text {
  padding: 5px 10px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  font-size: 70px;
  color: white;
  text-shadow: 3px 3px 3px gray;
}

.main-btn {
  width: 250px;
  height: 60px;
}

.main-section-apt-list {
  min-height: 100%;
  position: relative;
  padding-bottom: 70px; /* footer height */
}
</style>
