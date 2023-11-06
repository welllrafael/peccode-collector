export class fieldSettings {

    constructor(id, label, minWidth, align, icon=false, menu=false) {
        return{id: id, label: label, minWidth: minWidth, align: align, icon, menu: menu}
    }
}