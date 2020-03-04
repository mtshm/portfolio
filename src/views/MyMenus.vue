<template>
  <div class="about">
    <v-toolbar flat>
      <v-toolbar-title>メニューの一覧</v-toolbar-title>
    </v-toolbar>
    <DisplayNutrient class="selectbox"></DisplayNutrient>
    <v-btn class="mb-6" @click="creatNewNenu">➕ メニュー作成</v-btn>
    <v-data-table :headers="headers" :items="menus" class="elevation-1">
      <!-- <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>メニューの一覧</v-toolbar-title>
        </v-toolbar>
      </template>-->
      <!-- 合計量を表示するためのslot -->
      <template v-slot:item.totalQuantity="{ item }">{{totalQuantity(item.items)}}</template>
      <template v-slot:item.action="{ item }">
        <v-icon medium @click="onMenuSelection(item)">mdi-pencil</v-icon>
        <v-icon medium @click="makeCopy(item)">mdi-clipboard-check-multiple-outline</v-icon>
        <v-icon medium @click="executeDeletion(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  COPY_MENU,
  DELETE_MENU,
  UPDATE_CURRENT
} from "../store/mutation-types";
import Mixin from "../mixins/mixin";
import DisplayNutrient from "../components/DisplayNutrient";

export default {
  data() {
    return {
      headers: [
        {
          text: "メニュー名",
          value: "title",
          align: "center",
          sortable: false
        },
        { text: "栄養の合計量", align: "center", value: "totalQuantity" },
        { text: "操作", value: "action", align: "center", sortable: false }
      ]
    };
  },
  computed: mapState(["menus"]),
  components: {
    DisplayNutrient
  },
  mixins: [Mixin],
  methods: {
    ...mapActions([COPY_MENU, DELETE_MENU, UPDATE_CURRENT]),
    creatNewNenu() {
      this[UPDATE_CURRENT](null);
      this.$router.push("/menu");
    },
    onMenuSelection(menu) {
      this[UPDATE_CURRENT](Object.assign({}, menu));
      this.$router.push("/menu");
    },
    makeCopy(menu) {
      let copy = Object.assign({}, menu);
      copy.id = this.getUniqueStr();
      this[COPY_MENU](Object.assign({}, copy));
    },
    executeDeletion(menu) {
      this[DELETE_MENU](menu);
    }
  }
};
</script>

<style scoped>
.selectbox {
  margin-top: 15px;
}
</style>