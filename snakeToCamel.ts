interface AnyObject {
    [key: string]: any;
  }
  
  function snakeToCamel(str: string): string {
    return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
  }
  
  function convertKeysToCamelCase(obj: AnyObject | any[]): AnyObject | any[] {
    if (Array.isArray(obj)) {
      return obj.map((item) => convertKeysToCamelCase(item));
    }
  
    if (typeof obj !== 'object' || obj === null) {
        return obj; // Return primitive values directly
    }
  
    const camelCaseObj: AnyObject = {};
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelCaseKey = snakeToCamel(key);
        const value = obj[key];
  
        if (typeof value === 'object' && value !== null) {
          camelCaseObj[camelCaseKey] = convertKeysToCamelCase(value); // Recursive call for nested objects/arrays
        } else {
          camelCaseObj[camelCaseKey] = value;
        }
      }
    }
  
    return camelCaseObj;
  }
  
  // Example usage:
  const snakeCaseObject = {
    first_name: 'John',
    last_name: 'Doe',
    user_address: {
      street_address: '123 Main St',
      zip_code: '90210',
      nested_array: [{item_one: 1}, {item_two: 2}]
    },
      an_array: [1,2,3]
  };
  
  const camelCaseObject = convertKeysToCamelCase(snakeCaseObject);
  
  console.log("Original Snake Case Object:", JSON.stringify(snakeCaseObject, null, 2));
  console.log("Converted Camel Case Object:", JSON.stringify(camelCaseObject, null, 2));
  
  
  //Example with an array of objects
  
  const snakeCaseArray = [
      {item_one: "one", item_two: "two"},
      {item_three: "three", item_four: "four"}
  ]
  
  const camelCaseArray = convertKeysToCamelCase(snakeCaseArray);
  console.log("Original Snake Case Array:", JSON.stringify(snakeCaseArray, null, 2));
  console.log("Converted Camel Case Array:", JSON.stringify(camelCaseArray, null, 2));
  
  
  // Example with null and primitive values
  const mixedObject = {
      my_string: "hello",
      my_number: 123,
      my_null: null,
      my_boolean: true
  }
  const convertedMixedObject = convertKeysToCamelCase(mixedObject);
  console.log("Original Mixed Object:", JSON.stringify(mixedObject, null, 2));
  console.log("Converted Mixed Object:", JSON.stringify(convertedMixedObject, null, 2));