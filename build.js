import rspack from "@rspack/core";
import { RspackDevServer } from "@rspack/dev-server";

async function build() {
  const configMaps = [];

  configMaps.push({
    mode: "production",
    entry: "./src/components/TestA/index.tsx",
    externals: ["react"],
    externalsType: "amd",
    module: {
      rules: [
        {
          test: /\.module\.scss$/i,
          use: [
            {
              loader: "style-loader",
              options: {
                esModule: false, // only `esModule: false` is supported right now.
              },
            },

            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                },
              },
            },
            // // postcssOptions,
            {
              loader: "sass-loader",
              options: {
                // ...
              },
            },
          ],
        },
      ],
    },
    builtins: {
      react: {
        runtime: "automatic",
      },
    },
    output: {
      filename: `[name]/[name].js`,
      library: {
        name: "test",
        export: "default",
        type: "amd",
      },
    },
    resolve: {
      alias: {
        src: "src",
      },
    },
    optimization: {
      minimize: true,
    },
  });

  const multipleCompiler = rspack.rspack(configMaps);

  multipleCompiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    if (stats.hasErrors()) {
      console.log(stats.toJson());
      return;
    }
  });

  // const server = new RspackDevServer(
  //   {
  //     hot: true,
  //     liveReload: true,
  //     // port: 10001,
  //     // host: '0.0.0.0',
  //   },
  //   multipleCompiler
  // );

  // await server.start();
}

build();

// const compiler = rspack.rspack({
//   mode: "development",
//   entry: {
//     TestA: "./src/components/TestA/index.tsx",
//     TestB: "./src/components/TestB/index.tsx",
//   },
//   externals: ["react"],
//   externalsType: "amd",
//   builtins: {
//     react: {
//       runtime: "classic",
//     },
//   },
//   output: {
//     filename: "[name]/[name].js",
//     library: "test",
//     libraryTarget: "amd",
//   },
// });

// compiler.build((err) => {
//   if (err) {
//     console.log(err);
//   }
// });
