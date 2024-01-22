"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getAll = void 0;
async function getAll(db) {
    return await db.all("SELECT * FROM feature_flags");
}
exports.getAll = getAll;
async function update(db, name, status) {
    return db.run("UPDATE feature_flags SET status = ? WHERE name = ?", [status, name]);
}
exports.update = update;
