module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],

  importOrder: ["^@/(.*)$", "^[./]"],
};
