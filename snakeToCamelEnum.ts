// Define your types and enums
enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING_APPROVAL = "PENDING_APPROVAL",
  }
  
interface User {
    first_name: string;
    last_name: string;
    user_id: number;
    user_status: UserStatus;
    legal_residency: boolean;
    profile_details?: {
        street_address: string;
        zip_code: string;
    };
    an_array: number[];
    extra?: { name: string } | null;
    additional?: string;
}

interface AnyObject {
    [key: string]: any;
}
  
function snakeToCamel(str: string): string {
    return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}
  
function convertKeysToCamelCase<T>(obj: T): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => convertKeysToCamelCase(item));
    }
  
    if (typeof obj !== 'object' || obj === null) {
        return obj; // Return primitive values directly
    }
  
    const camelCaseObj: AnyObject = {};
  
    for (const key in obj as object) { // Type assertion to iterate
      if (Object.prototype.hasOwnProperty.call(obj, key)) { // More robust hasOwnProperty check
        const camelCaseKey = snakeToCamel(key);
        const value = (obj as AnyObject)[key];
  
        if (typeof value === 'object' && value !== null) {
          camelCaseObj[camelCaseKey] = convertKeysToCamelCase(value); // Recursive call
        } else {
          camelCaseObj[camelCaseKey] = value;
        }
      }
    }
  
    return camelCaseObj;
  }
  
  // Example Usage
  const user: User = {
    first_name: "John",
    last_name: "Doe",
    user_id: 123,
    user_status: UserStatus.ACTIVE,
    legal_residency: true,
    profile_details: {
      street_address: "123 Main St",
      zip_code: "90210",
    },
    an_array: [1,2,3],
    extra: null,
  };
  const user2: User = {
    first_name: "Jane",
    last_name: "Doe",
    user_id: 3425,
    user_status: UserStatus.PENDING_APPROVAL,
    legal_residency: false,
    profile_details: {
      street_address: "34323 Main St",
      zip_code: "78745",
    },
    an_array: [3],
    extra: null,
    additional: "extra extra"
  };
  
  const camelCaseUser = convertKeysToCamelCase<User>(user);
  
  console.log("Original User (Snake Case):", JSON.stringify(user, null, 2));
  console.log("Converted User (Camel Case):", JSON.stringify(camelCaseUser, null, 2));
  
  const users: User[] = [user, user2];
  const camelCaseUsers = convertKeysToCamelCase<User[]>(users);
  
  console.log("Original Users Array (Snake Case):", JSON.stringify(users, null, 2));
  console.log("Converted Users Array (Camel Case):", JSON.stringify(camelCaseUsers, null, 2));