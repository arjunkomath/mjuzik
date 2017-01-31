import {observable} from "mobx";

class LabelStore {
    @observable name = "mjuzik"
    @observable icon = ""
}

export default new LabelStore