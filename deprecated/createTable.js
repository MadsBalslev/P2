const con = require('../db');

/**
 * Checks if the given table is already in DB and if not creates it
 * @param {string} table Tablename to check if already exits or else create
 */
const checkTable = (table) => {
  const createTable = `CREATE TABLE IF NOT EXISTS ${table} (
    id int NOT NULL AUTO_INCREMENT,
    tekst varchar(255) NOT NULL COLLATE utf8_danish_ci,
    var1 varchar(255) NOT NULL COLLATE utf8_danish_ci,
    udtryk varchar(3) NOT NULL COLLATE utf8_danish_ci,
    var2 varchar(255) NOT NULL COLLATE utf8_danish_ci,
    facit varchar(255) NOT NULL COLLATE utf8_danish_ci,
    type varchar(255) NOT NULL COLLATE utf8_danish_ci,
    point int NOT NULL,
    PRIMARY KEY (id)
  );`;

  con.query(createTable, (err) => {
    if (err) console.log(err);
  });
};

module.exports = { checkTable };
