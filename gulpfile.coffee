gulp = require "gulp"
imagemin = require "gulp-imagemin"
pngquant = require "imagemin-pngquant"


gulp.task "default", ["build"]
gulp.task "build", ["i"]


# compress images
gulp.task "i", ->
  gulp.src "./assets/images/*", base: "./"
  .pipe imagemin
    progressive: true,
    use: [pngquant()]
  .pipe gulp.dest "./"

