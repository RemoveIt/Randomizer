var gulp = require("gulp");
var typescript = require("gulp-typescript");
var runSequence = require("run-sequence");
var open = require("open");
var nodemon = require("gulp-nodemon");
var rename = require("gulp-rename");

gulp.task("default", function () {
    runSequence(["build-server", "build-client"],
			"run");
});

gulp.task("build-server", function () {
    gulp.src("./Server/**/*.ts")
       .pipe(typescript({ module: "commonjs", target: "ES5" }))
       .pipe(gulp.dest("./out"));

});

gulp.task("build-client", function () {
    gulp.src("./Client/**/*.ts")
        .pipe(typescript({ target: "ES5" }))
        .pipe(rename("script.js"))
        .pipe(gulp.dest("./out/static"));

    gulp.src(["./Client/**/*.css", "./Client/**/*.html", "./Client/3rd/*.*"])
        .pipe(gulp.dest("./out/static"))
       
});

gulp.task("run", function () {
    nodemon({ script: "app.js", cwd: "./out", ext: "html js css", ignore: ["ignored.js"] })
    .on("restart", function () {
        console.log("Restarted")
    })
    open("http://localhost:3000");
})
