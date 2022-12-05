<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>매물 수정하기</h3></b-alert>
      </b-col>
    </b-row>
    <deal-input-item type="modify" />
  </b-container>
</template>

<script>
import DealInputItem from "@/components/deal/item/DealInputItem";

export default {
  name: "DealModify",
  components: { DealInputItem },
};
</script>

<style></style>
