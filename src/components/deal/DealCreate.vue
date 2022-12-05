<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>매물 등록하기</h3></b-alert>
      </b-col>
    </b-row>
    <deal-input-item type="register" />
  </b-container>
</template>

<script>
import DealInputItem from "@/components/deal/item/DealInputItem";

export default {
  name: "DealCreate",
  components: { DealInputItem },
};
</script>

<style></style>
