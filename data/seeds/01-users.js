
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: "berachele", password: 'pass1', department: "student"},
        {username: "brimes7", password: 'pass2', department: "team lead"},
        {username: "buddy_dusters", password: 'pass3', department: "instructor"}
      ]);
    });
};
