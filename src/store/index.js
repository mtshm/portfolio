import Vue from "vue";
import Vuex from "vuex";
import { UPDATE_REQUREMENTS, UPDATE_CURRENT, UPDATE_MENU, COPY_MENU, DELETE_MENU, UPDATE_DISPLAY_NUTRIENT } from "./mutation-types";
import { cloneDeep } from 'lodash-es';
import search from "./search";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search
  },
  state: {
    requrements: [
      { name: "calories", label: "カロリー", amount: 0, unit: "kcal" },
      { name: "protein", label: "タンパク質", amount: 0, unit: "g" },
      { name: "carbohydrate", label: "糖質", amount: 0, unit: "g" },
      { name: "fat", label: "脂質", amount: 0, unit: "g" }
    ],
    items: [],
    menus: [],
    current: null,
    displayNutrient: { label: "タンパク質", value: "protein" }
  },
  getters: {
    getMenuById(state) {
      return id => {
        return state.menus.find(menu => menu.id === id)
      }
    },
  },
  mutations: {
    [UPDATE_REQUREMENTS](state, payload) {
      state.requrements = payload;
    },
    [UPDATE_MENU](state, payload) {
      let registeredMenuIndex = state.menus.findIndex(menu => menu.id === payload.id);
      if (registeredMenuIndex !== -1) {
        Object.assign(state.menus[registeredMenuIndex], payload);
        return
      }
      state.menus.push(payload);
    },
    [COPY_MENU](state, payload) {
      let copy = cloneDeep(payload);
      state.menus.push(copy);
    },
    [DELETE_MENU](state, payload) {
      const index = state.menus.indexOf(payload);
      confirm("メニューを削除します") && state.menus.splice(index, 1);
    },
    [UPDATE_CURRENT](state, payload) {
      state.current = payload;
    },
    [UPDATE_DISPLAY_NUTRIENT](state, payload) {
      state.displayNutrient = payload;
    }
  },
  actions: {
    [UPDATE_REQUREMENTS]({ commit }, payload) {
      commit(UPDATE_REQUREMENTS, payload);
    },
    [UPDATE_MENU]({ commit }, payload) {
      commit(UPDATE_MENU, payload);
    },
    [COPY_MENU]({ commit }, payload) {
      commit(COPY_MENU, payload);
    },
    [DELETE_MENU]({ commit }, payload) {
      commit(DELETE_MENU, payload);
    },
    [UPDATE_CURRENT]({ commit }, payload) {
      commit(UPDATE_CURRENT, payload);
    },
    [UPDATE_DISPLAY_NUTRIENT]({ commit }, payload) {
      commit(UPDATE_DISPLAY_NUTRIENT, payload);
    }
  },
  plugins: [createPersistedState({
    key: 'portfolio',
    storage: localStorage
  })]
});
