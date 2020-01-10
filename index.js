var width = 960,
  height = 600;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

var projection = d3.geoMercator()
  .center([107, 31])
  .scale(650)
  .translate([width / 1.9, height / 1.6]);

var path = d3.geoPath().projection(projection);


var positions = [
  { name: "北京", loc: [116, 39], color: "#FF8585", id: 'beijing' },
  { name: "上海", loc: [121, 31], color: "#FFA142", id: 'shanghai' },
  { name: "广州", loc: [113, 23], color: "#FFFF42", id: 'guangzhou1' },
  { name: "昆明", loc: [102, 24], color: "#42FF42", id: 'kunming' },
  { name: "西安", loc: [108, 34], color: "#42FFFF", id: 'xian' },
  { name: "武汉", loc: [114, 30], color: "#4242FF", id: 'wuhan' },
  { name: "乌鲁木齐", loc: [87, 43], color: "#C285FF", id: 'wulumuqi' },
  { name: "拉萨", loc: [91, 29], color: "#FF85FF", id: 'lasa' }
].map(v => (v.pos = projection(v.loc), v));

d3.json("china.topojson").then(toporoot => {
  //输出china.topojson的对象
  // console.log(toporoot);

  //将TopoJSON对象转换成GeoJSON，保存在georoot中
  var georoot = topojson.feature(toporoot, toporoot.objects.china);

  //输出GeoJSON对象
  // console.log(georoot);

  //包含中国各省路径的分组元素
  var china = svg.append("g");

  //添加中国各种的路径元素
  var provinces = china.selectAll("path")
    .data(georoot.features)
    .enter()
    .append("path")
    .attr("class", "province")
    .attr("d", path);

  // 在 svg 的末尾添加一个 g 元素，以后 D3 绘制的图形就添加在这个 g 里
  var g = svg.append("g");

  var circle = g.selectAll("circle")
    .data(positions)
    .enter()
    .append("circle")
    .attr("fill", "yellow")
    .attr("r", 3);

  circle
    .attr('cx', d => d.pos[0])
    .attr('cy', d => d.pos[1])
    .attr('id', d => d.id)

  const paths = [{
    type: "LineString",
    coordinates: [positions[0].loc, positions[2].loc],
    i: 1,
  }]

  var arcs = svg.selectAll(".arc")
    .data(paths, d => 1);

  arcs.enter().append("path")
    .attr("class", "arc")
    .attr("d", path)

}, err => console.error(err));

