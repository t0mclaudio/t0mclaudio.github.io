.PHONY: run build clean install

install:
	bundle install

run:
	bundle exec jekyll serve --livereload

build:
	bundle exec jekyll build

clean:
	bundle exec jekyll clean
