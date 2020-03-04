<template>
  <v-form ref="form">
    <v-container>
      <v-toolbar flat>
        <v-toolbar-title>メニューを作成・編集</v-toolbar-title>
      </v-toolbar>
      <!-- タイトル欄 -->
      <v-text-field label="メニュー名" v-model="form.title" clearable outlined></v-text-field>

      <!-- メモ欄 -->
      <v-textarea label="メモ" v-model="form.memo" clearable outlined></v-textarea>

      <!-- 保存ボタン -->
      <div class="text-right">
        <v-btn class="mb-6" @click="onSubmit()">保存する</v-btn>
      </div>

      <!-- 表示項目選択 -->
      <DisplayNutrient></DisplayNutrient>
      <!-- 目標量との差 -->

      <v-row align="center" justify="end">
        <v-card-title>あと {{differenceOfTargetAndSum | adjustmentDigit }}</v-card-title>
      </v-row>
      <!-- 選択した食品の栄養の合計量 -->
      <v-row align="center" justify="end">
        <v-card-title>合計 {{totalQuantity(selectedItems.items) | adjustmentDigit}}</v-card-title>
      </v-row>

      <!-- 選択した食品 -->
      <v-data-table
        :headers="selectedItemHeaders"
        :items="selectedItems.items"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>メニューに追加した食品</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.nutrientQuantity="props">
          <div>{{props.item.quantity * props.item[displayNutrient.value] | adjustmentDigit }}</div>
        </template>
        <template v-slot:item.quantity="props">
          <v-edit-dialog :return-value.sync="props.item.quantity" large persistent>
            <div>{{ props.item.quantity }}</div>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.quantity"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-subheader>検索窓</v-subheader>

      <!-- 元の記述 -->
      <v-text-field type="text" v-model="keyword"></v-text-field>

      <v-expand-transition>
        <v-data-table
          :headers="searchResultHeaders"
          :items="items"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>検索結果</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item.nutrientQuantity="props">
            <div>{{ props.item[displayNutrient.value]}}</div>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon medium @click="addItem(item)">mdi-plus-thick</v-icon>
          </template>
        </v-data-table>
      </v-expand-transition>
    </v-container>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { UPDATE_CURRENT, UPDATE_MENU } from "../store/mutation-types";
import Mixin from "../mixins/mixin";
import DisplayNutrient from "../components/DisplayNutrient";

export default {
  data: () => ({
    keyword: "",
    selectedItems: {
      // ToDo selectedItemsの命名をmenuに変更して、form内のプロパティもまとめる
      // ToDo 以下の構造に変更する
      // menu{selectedItems:Array,registrationDate:Date,title:Str,memo:Str}
      // APIからのレスポンスの値をstateから取得してこの配列に代入する
      items: []
    },
    form: {
      id: null,
      registrationDate: new Date(),
      title: "",
      memo: ""
    },
    selectedItemHeaders: [
      {
        text: "食品名",
        value: "name",
        align: "center",
        sortable: false
      },
      { text: "重量(g)", value: "servingWeightGrams", align: "center" },
      {
        text: "栄養量",
        value: "nutrientQuantity",
        align: "center",
        sortable: false
      },
      { text: "数量", value: "quantity", align: "center", sortable: false },
      { text: "削除", value: "action", align: "center", sortable: false }
    ],
    searchResultHeaders: [
      {
        text: "食品名",
        value: "name",
        align: "left",
        sortable: false
      },
      { text: "重量(g)", value: "servingWeightGrams", align: "left" },
      {
        text: "栄養量",
        value: "nutrientQuantity",
        align: "left",
        sortable: false
      },
      { text: "追加", value: "action", align: "center", sortable: false }
    ]
  }),
  components: {
    DisplayNutrient
  },
  mixins: [Mixin],
  watch: {
    keyword: function() {
      this.$store.dispatch("search/doSearch", this.keyword);
    }
  },
  computed: {
    ...mapState(["requrements", "current", "displayNutrient"]),
    items() {
      return this.$store.getters["search/items"];
    },
    targetAmount: function() {
      let selectedRequrement;
      selectedRequrement = this.requrements.find(
        ({ name }) => name === this.displayNutrient.value
      );
      return selectedRequrement.amount;
    },
    differenceOfTargetAndSum: function() {
      return this.targetAmount - this.totalQuantity(this.selectedItems.items);
    }
  },
  created() {
    let menu = this.current;
    this.form.id = menu ? menu.id : "";
    this.form.title = menu ? menu.title : "";
    this.form.memo = menu ? menu.memo : "";
    this.selectedItems.items = menu ? menu.items : [];
  },
  methods: {
    ...mapActions([UPDATE_CURRENT, UPDATE_MENU]),
    addItem: function(item) {
      this.selectedItems.items.push(item);
    },
    deleteItem: function(item) {
      const index = this.selectedItems.items.indexOf(item);
      this.selectedItems.items.splice(index, 1);
    },
    onSubmit() {
      if (!this.form.id) {
        this.form.id = this.getUniqueStr();
      }
      this[UPDATE_MENU](Object.assign({}, this.form, this.selectedItems));
      this.$router.push("menus");
    }
  }
};
</script>
