import bcrypt from "bcryptjs";

const users = [
   {
      name: "Admin user",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: true,
   },
   {
      name: "Raghav",
      email: "raghav@example.com",
      password: bcrypt.hashSync("123456", 10),
   },
   {
      name: "Ram",
      email: "ram@example.com",
      password: bcrypt.hashSync("123456", 10),
   },
];

export default users;
