//main function
const filterJSON = (keys) => {
  let ans = {};

  /**
   * the function returns the path to the requested keys
   *
   * @param {object} obj JavaScript Object (JSON)
   * @param {Array} keys  an array of keys
   * @param {Array} stackPath  an array to save the recursive keys
   * @return {object}  path of all specifies keys in the JSON
   */
  const find = (obj, keys, stackPath) => {
    const addPathFromStack = () => {
      let ref = ans; //shadow copy
      stackPath.forEach((element) => {
        ref[element] = {};
        ref = ref[element]; //change reference to the value of the key element
      });
      ref[key] = value;
    };

    //optional: check if we receive a JSON
    if (typeof obj != "object") {
      return;
    }

    for (var [key, value] of Object.entries(obj)) {
      if (keys.includes(key)) {
        //key matching
        if (stackPath.length == 0) {
          //outer recursion call:add {key:value}
          ans[key] = value;
        } else {
          //inner recursion call: add path
          addPathFromStack();
        }
      } else if (typeof value == "object") {
        //no key matching: check match in inner object
        find(value, keys, stackPath.concat(key));
      }
    }
  };

  find(obj, keys, []);
  return ans;
};

const obj = {
  key1: { key2: { key3: "data3", key4: "data4" }, key5: "data5" },
  key6: "data6",
};

const keysToFilter = ["key4", "key6"];

const filteredJSON = filterJSON(keysToFilter);
console.log(filteredJSON);
