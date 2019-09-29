module.exports = {
    // 插入数据
    insert: 'insert into loginuser(uuid, nickname, password, sex) values(?,?,?,?)',
    // 删除表中的所有数据
    drop: 'drop table loginuser',
    // 查询所有的数据
    queryAll: 'select * from loginuser',
    // 按uuid查询
    queryByUuid: 'select * from loginuser where uuid=?',
    // 按nickname查询
    queryByNickname: 'select * from loginuser where nickname=?',
    // 按nickname, password查询
    queryExist: 'select * from loginuser where nickname=? && password=?',
};