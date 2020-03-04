<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-card-title class="headline">このアプリできること</v-card-title>
      <v-card-text class="body-1 font-weight-medium text--primary">
        プロミルへようこそ!
        <br />早速ですが日々の食事で大切なことは何でしょうか?
        <br />味つけ、量、値段など挙げると切りがありませんよね。
        <br />私達は食事で第一に優先するべきことは身体に必要な栄養素を必要な量摂取することだと考えています。
        <br />身体に必要な栄養素は数十種類ありますが、まず満たすべきは三大栄養素（タンパク質、脂質、炭水化物）です。
        <br />このアプリではあなたに必要な三大栄養素の量を満たす食事のメニューを簡単に作ることができます。
        <br />では、早速メニューを作ってみましょう！
        <p class="caption mt-2 mb-0">
          もっと詳しい考え方を知りたい方は
          <a target="_blank" href="https://hackmd.io/@makotaro/r1_1d9yNL">
            <span class="blue--text">リンク先</span>
          </a>
          ご覧ください
        </p>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto" outlined>
      <v-card-title class="headline">使い方</v-card-title>
      <v-card-subtitle class="title font-weight-black">step1 目標を設定する</v-card-subtitle>
      <v-card-text class="body-1 font-weight-medium text--primary">
        <router-link to="/" class="blue--text">「目標」のページ</router-link>であなたに必要な一日の栄養量を入力しましょう。
        <br />必要な栄養量を入力するとstep2のメニュー作成のページに表示されるので栄養の過不足を確認しながら一日の食事を組み立てることができます。適切な目標値の設定は以下のサイトを参考にしてください。
        <p class="my-3">
          <a
            target="_blank"
            href="https://dietgenius.jp/macro-nutrient-calculator/#1492304410953-fc2d4b82-8b8c"
          >
            <span class="blue--text">DIET GENIUS</span>
          </a>
        </p>
        <p class="caption mb-0">今後、体重や運動量を基に栄養の必要量を自動で計算する機能を追加する予定です。</p>
      </v-card-text>

      <v-card-subtitle class="title font-weight-black">step2 メニューを作る</v-card-subtitle>
      <v-card-text class="body-1 font-weight-medium text--primary">
        <router-link to="/menu" class="blue--text">「メニュー作成」ページ</router-link>で一日の食事のメニューを作ってみましょう。
        <br />画面下部の検索欄に食べ物の名前を入力することで、食品を検索できます（現在、英語のみ対応しています）。
        <br />検索結果項目の右に表示される「＋」マークを押すとメニューに追加されます。
        <br />メニューに食品が追加される毎に、含まれる栄養の合計量とstep1で入力した栄養の必要量との差を計算しますので、栄養の過不足を確認しながら一日の食事を組み立てることができます。
        <br />メニューができたら、「保存する」ボタンを押してメニューを保存してみましょう。保存したメニューは
        <router-link to="/menus" class="blue--text">「メニュー一覧」ページ</router-link>でいつでも見返すことができます。
        一覧画面では、保存したメニューを編集・コピーすることができるので、メニューを変更したり種類を増やす際に便利です。
      </v-card-text>
      <v-card-subtitle class="title font-weight-black">表示する栄養素の切替について</v-card-subtitle>
      <v-card-text class="body-1 font-weight-medium text--primary">
        メニュー作成画面には「表示する栄養素を切替える」ボタンがあり、この値を変更するとアプリ全体で表示する栄養素を切替えることができます。
        <br />これにより、栄養素一つ一つに対して、作成中のメニューに含まれる量が不足していないか確認することができます。
        <br />一度に複数の栄養素を表示しないことで、スマートフォンの画面で表示がごちゃごちゃしないようしています。
      </v-card-text>
    </v-card>
  </div>
</template>