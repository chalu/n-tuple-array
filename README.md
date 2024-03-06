# n-tuple-array

Get a **`configurable`** amount of items when iterating over a JavaScript array, instead of a single item that arrays provide per iteration, by default.


## Motivation

Imagine that you received a large collection of coordinates (latitude and longitude), but they were sent 
as a flat array of values to speed up the data transfer.

`n-tuple-array` can help you get out the coordinates in pairs (i.e their logical representation), such that you'd go

**from** 
```json
// flat coordinates
["5.7225", "-9.6273", "2.68452", "-30.9501", ...]
```

**to**
```javascript
// the iterable will generate pairs by default
const coordsIterable = tuplesFromArray({ list: flatCoords });

// using for..of, get pairs as ["5.7225", "-9.6273"] ...
for (const pair of coordsIterable) {
    console.log(pair);
}

// OR manipulate pairs with regular array 
// functions like map, filter, forEach ...
const coordsInPairs = Array.from(coordsIterable);
console.log(Array.isArray(coordsInPairs));   // true
coordsInPairs
    .map(pair => {
        // pair is ["5.7225", "-9.6273"] ...
        return myTransform(pair);
    })
	.forEach((pair) => {
        // pair is ["5.7225", "-9.6273"] ...
        placeOnMap(pair);
    });
```

### Some Real World Examples

#### 1. Wole Joko

I first tried my hands on this concept when [fleshing out wole-joko](https://github.com/chalu/wole-joko/blob/dev/src/js/utils.js#L57-L92), which strated as a _live coding task_ I was asked to do in an engineering manager interview :man_shrugging 
It was a simulation of people entering an event hall to get seated, but **only two** could get in at a time - https://wole-joko.netlify.app/

#### 2. Execute max of `N` async tasks

![](./assets/the-dax-js-challenge.png "JS challenge by @thdxr")

> The below was adapted for more concise terminal output

`n-tuple-array` solution. View [code here](https://github.com/chalu/n-tuple-array/blob/main/src/examples/classic.ts#L6-L40)  <br>
![](./assets/demo-classic.png "n-tuple-array solution")
<br> <br>

`n-tuple-array` solution demo <br>
![](./assets/ntuple-array-demo-optimized.gif "n-tuple-array solution demo")

 

## Setup & Usage

```bash
npm install @chalu/n-tuple-array
```

```javascript
const { tuplesFromArray } = require('@chalu/n-tuple-array');

// some setup
const numbers = Array.from({length: 100}, (_, i) => i + 1);
const isEven = (item) => {
    if (
        !item
        || typeof item !== 'number'
        || item % 2 !== 0
    ) return false;

    return true;
};

// use the lib
const quintetIterator = tuplesFromArray({
    list: numbers, maxItems: 5, match: isEven
});

for (const quintet of quintetIterator) {
    // prints [ 2, 4, 6, 8, 10 ] ... [ 92, 94, 96, 98, 100 ]
	console.log(quintet);
}
```

See more examples in [src/examples](./src/examples/) 

