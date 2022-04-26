const obj = require("./dummy.json");

obj.endpoints[0].map((value) => {
  delete value["id"];
  delete value["title1"];
  console.log(value);
});

// console.log(obj.endpoints);
