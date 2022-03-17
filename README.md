# Typescript

[Typescript](https://www.typescriptlang.org/) (TS) is a language that is a _superset_ of Javascript (JS) because it includes JS as well as added syntax for _types_ (types are described below).

## Learning Objectives

+ Understand the difference between static typing and loose typing
+ Understand the difference between _compile time_ and _runtime_ errors
+ Use Typescript to produce annotated types in your programs

## Introduction

Inspiration for this intro' has been taken from [Typescript for the new programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html).

### A Brief History of Javascript

JavaScript began life as a simple scripting language for browsers and in those early days, the expectation was that it would only ever get used for creating simple behaviours on the web.

However, over time, the use of JS increased exponentially (nowadays, it is the most commonly-used programming language), and web developers began using JS to create engaging, interactive experiences - nowadays, we have ever-so capable JS frameworks, like [React](https://reactjs.org/), which allow developers to build web pages that feature super-slick user experiences.

JS is also used outside of the context of browsers - developers now create backend node-based APIs, too. This "run anywhere" nature of JS makes it an attractive choice for cross-platform development because you can use the same technology everywhere; in other words, you only need JavaScript to program the entire frontend to backend technology stack! This has lots of positive implications for development teams.

Nevertheless, JS retains some quirks from its early days:

```js
if ("" == 0) {
  // True! But why??
}

if (1 < x < 3) {
  // True for any value of x! Again - why?
}

const obj = { width: 10, height: 15 };
// The following produces NaN because the object property does not exist. Can you spot the typo?
const area = obj.width * obj.heigth; 
```

For more of these ideosyncracies of JS, watch [wat](https://www.destroyallsoftware.com/talks/wat).

The problem comes when you begin writing more extensive applications because those kind of quirks can introduce annoying (and hard to find) runtime bugs into your codebase. Consider this:

```js
function flip(x) {
  return x.flop();
}
```

This function will only work if given an object with a callable `flop` property. Unfortunately, the only way you can tell for sure whether _x_ contains that property is to call it and see what happens! That makes it hard to predict what code will do before it runs. It also makes code harder to write in the first place!

Seen in this way, a type is the concept of describing which values can be safely passed to `flip`, and which will crash.

In essence, the problem is that JavaScript is a [loosely and dynamically typed language](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) where we can only see what happens at _runtime_ because JS variables are not directly associated with any particular value type. Furthermore, any variable can be assigned (and re-assigned) values of all types. You'd probably never do this, but consider that the following is valid JS:

```js
let foo = 42;    // foo is now a number
foo     = 'bar'; // foo is now a string
foo     = true;  // foo is now a boolean
```

## An Overview Typescript

Inspiration for this section has been taken from [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

While JS provides language primitives like string and number, it doesn’t check that you’ve consistently assigned those primitives. Typescript does, though. So if you are a JS developer who has written a function that takes a parameter and you have become uneasy with the idea of assuming that the parameter is a number or a string or an object with a particular property (etc.), then Typescript is probably for you because avoiding such problems is the language's goal - it does so by using a static type system to make predictions about what code is expected _before_ a program runs.

### Static Type Checking

TypeScript is a langauge that is a _typed_ superset of Javascript. That means that if you move code from JavaScript to TypeScript, it is guaranteed to run the same way, since the TS compiler never changes the behaviour of your program - it produces the same plain JS, even if its compiler reports that the code has type errors! Hence, if your JS program had a runtime bug, your TS program will include that same bug. However, TS will almost certainly help you identify (and remove) that type error runtime bug. That's because TS features _compile-time_ static type checking, where the _type_ of values used in a program are checked before the progam is _run_, thus avoiding certain kinds of runtime errors.

TS basically adds rules about how different kinds of values can be used, thereby helping to increase the quality of the codebase. For example, the JS program featuring `obj`, above, would produce a _runtime_ error because the variable `obj` does not have the property `heigth`. However, the TypeScript compiler would have identified the error beforehand:

_Property 'heigth' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?_

### Defining Types

TypeScript offers all of JavaScript’s features, but includes an additional _type system_ layer on top. When creating a variable and assigning it to a particular value, TypeScript will use the value as its type. Consider the examples from earlier:

```js
let foo = 42; 
```

TS will infer the following type for `foo`:

```js
foo: number
```

And any further assignments to `foo` that are not numbers will introduce _compile time_ errors.

TypeScript also allows you to explicitly describe the shape of your types:

```ts
interface User {
  name: string;
  isVegetarian: boolean;
}
```

You can then declare that a JavaScript object must conform to the shape of your new type:

```ts
const user: User = {
  name: "Steve",
  isVegetarian: true,
};
```

Subsequently, if you provide an object that doesn’t match the interface, TypeScript will warn you:

```ts
const user: User = {
  name: "Steve",
  age: 459,
};
```

_Type '{ name: string; age: number; }' is not assignable to type 'User'._
_Object literal may only specify known properties, and 'age' does not exist in type 'User'._

You can use interfaces to annotate parameters and return values from functions (and declarations within classes):

```ts
interface User {
  name: string;
  isVegetarian: boolean;
}

function getAdminUser(): User {
  //...
}
 
function deleteUser(user: User) {
  // ...
}
```

### Extending Primitive Types

TypeScript extends the primitive types available in JavaScript - `any` (allow anything - use sparingly (if at all) because it's essentially an escape hatch from the type system), `unknown` (as opposed to `any`, `unknown` flips the default from permitting everything to permitting (almost) nothing because TypeScript disallows arbitrary operations on values of type `unknown`. Instead, you have to narrow the type of the value you're working with by first performing some sort of type checking. For more on `any` versus `unknown`, see here: https://mariusschulz.com/blog/the-unknown-type-in-typescript). Finally, Tyoescript also includes the types `never` (it’s not possible that this type could happen), and `void` (a function which returns undefined or has no return value) - `never` and `void` are closely related, see here: https://www.tutorialsteacher.com/typescript/typescript-never.

### Composing Types

TS uses _unions_, _generics_ and _intersections_ to enable you to form complex types from simple ones.

#### Unions

TS actually has two syntaxes for building types: `interface` and `type` - prefer `interface` but use `type` when you need specific features, such as _unions_. A popular use-case for union types is to describe the set of string or number literals that a value can have:

```ts
type LightStates = "on" | "off" | "dimmed";

interface Light {
  isLed: boolean,
  state: LightStates
}
```

Unions also add flexibility to function parameters:

```ts
function getLength(obj: string | string[]) {
  return obj.length;
}
```

#### Generics

An array without generics could contain anything. An array with generics can describe the values that the array contains:

```ts
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

You can declare your own types that use generics:

```ts
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
 
// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;
 
// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();
 
// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add(23);
```

#### Intersections

An intersection combines multiple types into one.

```ts
interface User {
  name: string;
  isVegetarian: boolean;
}

interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

type UserResponse = User & ErrorHandling

const handleUser = (response: UserResponse): string => {
  if (response.error) {
    console.error(response.error.message);
    return response.error.message;
  }
 
  return response.name;
};
```

### Type Assertions

Sometimes you will have information about the type of a value that TypeScript can’t know about.

For example, if you’re using `document.getElementById`, TypeScript only knows that this will return some kind of `HTMLElement`, but you might know that your page will always have an `HTMLCanvasElement` with a given ID:

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

## Exercise

This repo contains a [react](https://reactjs.org/) project that uses Typescript. It was initialised using  _Create React App_ - for more information about adding Typescript when using _Create React App_, see https://create-react-app.dev/docs/adding-typescript/.

To complete the exercise in this repo', do the following:

1. Fork this repository and clone the fork to your machine
2. Run `npm ci` to install project dependencies
3. In the [./src](./src) directory you'll find a version of the Todo application that you saw earlier in the course. However, this time, it's using Typescript. Unfortunately, if you run `npm run start`, you'll see a whole bunch of TypeScript errors. Your job is to fix them
