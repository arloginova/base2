import { readFileSync, writeFileSync } from 'node:fs';

export class DBJson {
    constructor (path) {
        this.path = path;
    }

    // Получение всех записей
    getAll () {
        return JSON.parse(readFileSync(this.path, 'utf-8'));
    }


    // Найти запись по id
    findByKey (key) {
        const data = this.getAll();

        const info = data[key];

        return info;
    }

    getValueByParams(value, key) {
        const data = this.getAll()

        const info = Object.values(data).find(item => item[key] === value);

        return info;
    }

    getValueFromKey(key) {
        const data = this.getAll();

        return data[key];
    }

    deleteValueFromKey(key) {
        const data = this.getAll();

        console.log(data);
        console.log(key);

        delete data[key];

        writeFileSync(this.path, JSON.stringify(data));

        return;
    }


    // Добавить запись
    add (payload, key) {

        const data = this.getAll();

        data[key] = payload;

        writeFileSync(this.path, JSON.stringify(data));

        return true;
    }

    // Удалить запись
    deleteById (id) {
        const data = this.getAll();

        const hasItem = data.find(item => item.id === id);

        if (hasItem) {
            const newData = data.filter(item => item.id !== id);

            writeFileSync(this.path, JSON.stringify(newData));

            return true;
        } else {
            return false;
        }
    }

    updateValueByKey(id, findKey, newProfile) {
        const data = this.getAll();

        const oldProfile = data[id];

        if (oldProfile == undefined || oldProfile == null) {
            data[id] = newProfile;

            writeFileSync(this.path, JSON.stringify(data));

            return;
        }


        for (const key in newProfile[findKey]) {
            if (data[id][findKey].hasOwnProperty(key)) {
                data[id][findKey][key] = newProfile[findKey][key];
            }
        }

        writeFileSync(this.path, JSON.stringify(data));

        return;
    }
}

