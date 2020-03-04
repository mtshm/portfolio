<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["displayNutrient"])
  },
  methods: {
    totalQuantity: function(items) {
      const initialValue = 0;
      return items.reduce((accumulator, item) => {
        return accumulator + item[this.displayNutrient.value] * item.quantity;
      }, initialValue);
    },
    getUniqueStr(myStrong) {
      let strong = 1000;
      if (myStrong) strong = myStrong;
      return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
      );
    }
  }
};
</script>
