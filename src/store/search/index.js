import axios from 'axios';

const state = {
  items: [],
};

const getters = {
  items(state) {
    return state.items;
  }
};

const mutations = {
  setResults(state, payload) {
    state.items = payload;
  }
};

const actions = {
  async doSearch({ commit }, keyword) {
    try {
      if (keyword === "") {
        commit('setResults', []);
        return;
      }
      const params = {
        fields:
          "item_id,nf_serving_weight_grams,item_description,nf_ingredient_statement,item_name,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein"
      };
      const apiKey = process.env.VUE_APP_API_KEY;
      const results = await axios(
        "https://nutritionix-api.p.rapidapi.com/v1_1/search/" + keyword,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
            "Content-Type": "application/json"
          },
          params: params
        }
      );
      const { data } = results;
      const items = [];
      for (let hit of data.hits) {
        items.push({
          quantity: 1,
          id: hit.fields.item_id,
          name: hit.fields.item_name,
          protein: hit.fields.nf_protein,
          calories: hit.fields.nf_calories,
          carbohydrate: hit.fields.nf_total_carbohydrate,
          fat: hit.fields.nf_total_fat,
          servingWeightGrams: hit.fields.nf_serving_weight_grams,
          image: hit.fields.images_front_full_url
        });
      }
      commit('setResults', items)
    } catch (e) {
      throw new Error('エラーが発生しました', e);
    }
  }
};

const search = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default search;