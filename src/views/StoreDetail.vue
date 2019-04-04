<template>
  <div class="Counter">
    <h1>店舗情報 編集</h1>
    <p>店舗名 </p>
    <p v-if="storeNameError">エラー {{storeNameError}}</p>
    <div><input :value="storeName" @input="updateStoreName"></div>

    <p>店舗紹介</p>
    <p v-if="descriptionError">エラー {{descriptionError}}</p>
    <div><input :value="description" @input="updateDescription"></div>

    <button @click="submit">送信</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { storeDetailModule } from '@/store/page/StoreDetail' // モジュールクラスをインポート
@Component({})
export default class StoreDetail extends Vue {
  public storeNameError = ''
  public descriptionError = ''

  get storeName() {
    return storeDetailModule.storeName;
  }
  get description() {
    return storeDetailModule.description;
  }
  private isValid() {
    let isValid = true

    if (this.storeName === '') {
      isValid = false
      this.storeNameError = '入力してください'
    } else {
      this.storeNameError = ''
    }

    if (this.description === '') {
      isValid = false
      this.descriptionError = '入力してください'
    } else {
      this.descriptionError = ''
    }

    return isValid
  }

  private updateStoreName(e: any) {
    storeDetailModule.SET_STORE_NAME(e.target.value)
  }
  private updateDescription(e: any) {
    storeDetailModule.SET_DESCRIPTION(e.target.value)
  }

  private submit() {
    console.log('valid')
    if (this.isValid()) {
      console.log('valid')
    }
  }
}
</script>
