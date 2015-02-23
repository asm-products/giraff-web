gulp = require "gulp"
imagemin = require "gulp-imagemin"


gulp.task "default", ["build"]
gulp.task "build", ["i"]


# compress images
gulp.task "i", ->
  gulp.src "./assets/images/*", base: "./"
  .pipe imagemin()
  .pipe gulp.dest "./"

