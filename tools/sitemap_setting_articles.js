const connection = await (await pool).getConnection();
const category = await connection.query("SELECT * FROM category");
let articles = [];
for(let i = 0; i < category.length; i++){
  connection.query("SELECT * FROM ??", [category[i].name], (err, rows) => {
    for(let j = 0; j < rows.length; j++){
      //console.log(rows[j].path)
      let input = `<url>
      <loc>https://flozable.com/${rows[j].path}</loc>
      <lastmod>2023-03-02T06:45:32+01:00</lastmod>
      <priority>0.7</priority>
    </url>`
    fs.appendFile('public/sitemap.xml', String(input), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    }
  });
}