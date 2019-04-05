import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from 'vuex-module-decorators'
import store from '@/store/'; // デコレータでstoreを指定するためimportする必要あり
import {storeModule} from '@/store/api/store'; // デコレータでstoreを指定するためimportする必要あり

// state's interface
export interface IStoreDetailState {
  editInitial: IStoreDetail
  edit: IStoreDetail
}

type IStoreDetail = {
  storeId: number
  storeName: string
  description: string
}
@Module({ dynamic: true, store, name: 'StoreDetail', namespaced: true })
class StoreDetail extends VuexModule implements IStoreDetailState {
  // state
  public editInitial: IStoreDetail = {
    storeId: -1,
    storeName: '',
    description: '',
  }
  public edit: IStoreDetail = {
    ...this.editInitial,
  }

  // mutation
  @Mutation
  public SET_STORE_NAME(storeName: string) {
    this.edit.storeName = storeName;
  }
  @Mutation
  public SET_DESCRIPTION(description: string) {
    this.edit.description = description;
  }
  @Mutation
  public COPY_ORIGIN_TO_EDIT(storeDetail: any) {
    this.edit = {
      storeId: storeDetail.storeId || this.editInitial.storeId,
      storeName: storeDetail.storeName || this.editInitial.storeName,
      description: storeDetail.description || this.editInitial.description,
    };
  }



  // actions
  @Action({})
  public async pageInit() {
    try {
      await storeModule.fetchStoreDetail()
      console.log(this.origin)

      // コピー
      this.COPY_ORIGIN_TO_EDIT(this.origin)

    } catch (e) {
      alert('読み込みに失敗しました 再読込します')
      location.reload()
    }
  }
  @Action({})
  public updateStoreDetail() {
    storeModule.updateStoreDetail({
      storeName: this.edit.storeName,
      description: this.edit.description,
    });
  }




  get storeNameValid() {
    return this.edit.storeName !== '' ? undefined : '入力してください'
  }

  get descriptionValid() {
    if (this.edit.description === '') {
      return '入力してください'
    } else if (this.edit.description.search(/.*ばか|バカ.*/) !== -1) {
      return '暴言はよくありませんよ'
    } else {
      return undefined
    }
  }

  get origin() {
    return storeModule.storeDetail
  }
}

export const storeDetailModule = getModule(StoreDetail);
