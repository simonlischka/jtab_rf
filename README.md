# jTabRF - Guitar Chord and Tab Library

This is a fork of the jTab Javascript library. Check out

[original jTab Documentation](http://jtab.tardate.com/ 

and

[Original jTab Github Repo](https://github.com/tardate/jtab

RF stands for refactor. For the record: the original library is aussumn! While fixing a bug I noticed that
there's some potential for refactoring and testing this library and improving the code quality.

This is the place to go for radical changes that make reading and maintining the code easier.

## Vision

### The basics

- port existing tests to Jest so they can be easily run with NPM and profit from modern testing framework nicities
- add additional tests and do some simple refactoring where appropreate
- remove monkey patching of libraries
- extract decoupled modules/adapters for interchangability: input parsing, vector drawing
- introduce design patterns if appropriate

### The vivids

- possibly add visual tests for vector drawing adapters
- write some different input adapters for more tab-like notation
- write output adapters with different stylings, different libraries
- typescript types or entire project to typescript
- react component to easily use this

## Contributing

0. Get in touch if you need strategic inspiration and want to contribute
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
