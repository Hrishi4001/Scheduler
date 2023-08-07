const app = require("./src/app");

// ==== Start Project ====
const PORT = process.env.PORT;
app.listen(3000, () => console.log(`server running on 3000....`));
