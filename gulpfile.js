var gulp = require("gulp");
var typescript = require("gulp-typescript");
var runSequence = require("run-sequence");
var open = require("open");
var nodemon = require("gulp-nodemon");

gulp.task("default", function () {
    runSequence("build",
			"run");
});

gulp.task("build", function () {
    gulp.src("./Server/**/*.ts")
       .pipe(typescript({ module: "commonjs", target: "ES5" }))
       .pipe(gulp.dest("./out"));
});

gulp.task("run", function () {
    nodemon({ script: "./out/app.js", ext: "html js css", ignore: ["ignored.js"] })
    .on("restart", function () {
        console.log("Restarted")
    })
    open("http://localhost:3000");
})