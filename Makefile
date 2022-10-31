lint:
	npx stylelint ./src/sass/*.scss

	npx htmlhint ./build/
	npx stylelint ./build/

deploy:
	npx surge ./src/
