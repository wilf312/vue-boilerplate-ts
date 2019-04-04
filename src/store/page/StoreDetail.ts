import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from 'vuex-module-decorators'
import store from '@/store/'; // デコレータでstoreを指定するためimportする必要あり

// state's interface
export interface IStoreDetailState {
  incrementCounter: number; // 数字が増えてくカウンター
}
@Module({ dynamic: true, store, name: 'StoreDetail', namespaced: true })
class StoreDetail extends VuexModule implements IStoreDetailState {
  // state
  public incrementCounter: number = 0;
  public storeName: string = 'tests';
  public description: string = 'tests';

  // mutation
  @Mutation
  public SET_STORE_NAME(storeName: string) {
    this.storeName = storeName;
  }
  @Mutation
  public SET_DESCRIPTION(description: string) {
    this.description = description;
  }

  // actions
  @Action({})
  public setStoreName(storeName: string) {
    this.SET_STORE_NAME(storeName);
  }
  public setDescription(description: string) {
    this.SET_STORE_NAME(description);
  }

  get storeNameValid() {
    return this.storeName !== '' ? undefined : '入力してください'
  }

  get descriptionValid() {
    if (this.description === '') {
      return '入力してください'
    } else if (this.description.search(/.*ばか|バカ.*/) !== -1) {
      return '暴言はよくありませんよ'
    } else {
      return undefined
    }
  }

  // actions + mutation
  // incrementCounter decrementCounter両方をリセットするアクションとミューテーション
  @MutationAction({mutate: ['incrementCounter']})
  public async resetCounter() {
    return {
      incrementCounter: 0,
    };
  }
}

export const storeDetailModule = getModule(StoreDetail);
