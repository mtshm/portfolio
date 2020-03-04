<template>
  <v-app>
    <!-- ナビゲーション -->
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->
        <!-- <v-divider></v-divider> -->

        <v-list dense nav>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" :to="nav_list.link">
            <!-- アイコン -->
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>

            <!-- メニュー名 -->
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>

    <!-- ヘッダー -->
    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>プロミル</v-toolbar-title>
    </v-app-bar>

    <!-- コンテンツ -->
    <v-content>
      <v-card class="mx-auto" max-width="600px">
        <v-container>
          <router-view />
        </v-container>
      </v-card>
    </v-content>

    <!-- フッター -->
    <v-footer color="primary" dark app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
    nav_lists: [
      {
        name: "使い方",
        icon: "mdi-card-text-outline",
        link: "/guide"
      },
      { name: "目標", icon: "mdi-flag-variant", link: "/" },
      {
        name: "メニュー作成",
        icon: "mdi-pencil",
        link: "/menu"
      },
      {
        name: "メニュー一覧",
        icon: "mdi-format-list-bulleted-square",
        link: "/menus"
      }
      // { name: "カレンダー", icon: "mdi-calendar-month" }
    ]
  })
};
</script>