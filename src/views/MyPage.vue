 <template>
  <div>
    <slot name="title" :pageTitle="pageTitle"></slot>
    <v-data-table :headers="headers" :items="requrements" hide-default-footer class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>一日に摂取する栄養の目標量</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.amount="props">
        <v-edit-dialog :return-value.sync="props.item.amount" large persistent>
          <div>{{ props.item.amount }}</div>
          <template v-slot:input>
            <v-text-field v-model="props.item.amount" label="Edit" single-line counter autofocus></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <div class="ml-2 my-4">
      <router-link to="guide" class="blue--text subtitle-1">このアプリの使い方はこちら</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { UPDATE_REQUREMENTS } from "../store/mutation-types";

export default {
  name: "MyPage",
  data: () => ({
    pageTitle: "目標量",
    items: [],
    headers: [
      {
        text: "栄養素",
        value: "label",
        align: "center",
        sortable: false
      },
      {
        text: "目標量/日",
        align: "center",
        value: "amount",
        sortable: false
      },
      { text: "単位", value: "unit", align: "left", sortable: false }
    ]
  }),
  computed: {
    ...mapState(["requrements"])
  },
  created() {
    this.items = this.requrements;
  },
  methods: {
    ...mapActions([UPDATE_REQUREMENTS]),
    onChange() {
      this[UPDATE_REQUREMENTS](this.items);
    }
  }
};
</script>
