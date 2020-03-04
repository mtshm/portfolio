<template>
  <div>
    <v-select
      @change="changeNutrient"
      v-model="selectedNutrient"
      item-text="label"
      item-value="value"
      :items="nutrients"
      label="表示する栄養素を切替える"
      return-object
      outlined
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { UPDATE_DISPLAY_NUTRIENT } from "../store/mutation-types";

export default {
  name: "display-nutrient",
  data() {
    return {
      nutrients: [
        { label: "カロリー", value: "calories", unit: "kcal" },
        { label: "タンパク質", value: "protein", unit: "g" },
        { label: "糖質", value: "carbohydrate", unit: "g" },
        { label: "脂質", value: "fat", unit: "g" }
      ],
      selectedNutrient: {}
    };
  },
  computed: mapState(["displayNutrient"]),
  mounted() {
    this.selectedNutrient = this.displayNutrient;
  },
  methods: {
    ...mapActions([UPDATE_DISPLAY_NUTRIENT]),
    changeNutrient() {
      this[UPDATE_DISPLAY_NUTRIENT](this.selectedNutrient);
    }
  }
};
</script>