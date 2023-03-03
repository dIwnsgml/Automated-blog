const connection = await (await pool).getConnection();
const category = await connection.query("SELECT * FROM category");
for(let i = 0; i < category.length; i++){
  let input = 
  `
  <url>
    <loc>https://flozable.com/category/${category[i].name}</loc>
    <lastmod>2023-03-02T06:45:32+01:00</lastmod>
    <priority>0.8</priority>
  </url>`
fs.appendFile('public/sitemap.xml', String(input), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
}

