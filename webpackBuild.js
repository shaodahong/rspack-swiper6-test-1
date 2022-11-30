import webpack from "webpack";

const compiler = webpack({
  mode: "development",
  entry: {
    TestA: "./src/components/TestA/index.tsx",
    TestB: "./src/components/TestB/index.tsx",
  },
  externals: {
    react: "React",
  },
  externalsType: "amd",
  output: {
    filename: "[name]/[name].js",
    library: "test",
    libraryTarget: "amd-require",
  },
  module: {
       // loaders 則是放想要使用的 loaders，在这边是使用 babel-loader 将所有 .js（这边用到正则）相关文件（排除了 npm 安裝的套件位置 node_modules）编译成浏览器可以阅读的 JavaScript。preset 则是使用的 babel 编译规则，这边使用 react、es2015。若是已经单独使用 .babelrc 作为 presets 設定的话，则可以省略 query
     loaders: [
       {
         test: /\.tsx$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
           presets: ['es2015', 'react'],
         },
       },
     ],
   },
});

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
});
