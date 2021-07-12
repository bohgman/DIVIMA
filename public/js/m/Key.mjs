/**
 * @fileOverview  The model class Key with attribute definitions and storage management methods
 * @authors Gerd Wagner & Juan-Francisco Reyes
 * @copyright Copyright 2013-2021 Gerd Wagner (Chair of Internet Technology) and Juan-Francisco Reyes, Brandenburg University of Technology, Germany.
 * @license This code is licensed under The Code Project Open License (CPOL), implying that the code is provided "as-is",
 * can be modified to create derivative works, can be redistributed, and can be used in commercial applications.
 */
/**
 * Constructor function for the class Key
 * @constructor
 * @param {{isbn: string, title: string, year: number}} slots - Object creation slots.
 */
import { NoConstraintViolation, MandatoryValueConstraintViolation, RangeConstraintViolation,
  IntervalConstraintViolation, PatternConstraintViolation, UniquenessConstraintViolation }
  from "../../lib/errorTypes.mjs";
import { isNonEmptyString, isIntegerOrIntegerString, isBooleanOrBooleanString }
  from "../../lib/util.mjs";

class Key {
  // using a single record parameter with ES6 function parameter destructuring
  constructor({id, name, title, location, isAvailable}) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.location = location;
    this.isAvailable = isAvailable;
  }
/*********************************************************
 ***  Get methods **
 *********************************************************/
  get id() {
    return this._id;
  };

  get name() {
    return this._name;
  };

  get title() {
    return this._title;
  };

  get location() {
    return this._location;
  };

  get isAvailable() {
    return this._isAvailable;
  };

/*********************************************************
 ***  Check methods **
 *********************************************************/
  static async checkIdAsId( t) {
    console.log("checkIdAsId!!!")
    let validationResult = Key.checkId( t);
    if ((validationResult instanceof NoConstraintViolation)) {
      if (!t) {
        validationResult = new MandatoryValueConstraintViolation(
          "A value for the Id must be provided!");
      } else {
        let keyDocSn = await db.collection("keys").doc( t).get();
        console.log(keyDocSn)
        if (keyDocSn.exists) {
          validationResult = new UniquenessConstraintViolation(
            "There is already an ID with this record");
        } else {
          validationResult = new NoConstraintViolation();
        }
      }
    }
    return validationResult;
  };
  static checkId( t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("An Id must be provided!");
    } else if (!isNonEmptyString( t)) {
      return new RangeConstraintViolation("The id must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };
  static checkName( t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A name must be provided!");
    } else if (!isNonEmptyString( t)) {
      return new RangeConstraintViolation("The name must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };

  static checkTitle( t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A title must be provided!");
    } else if (!isNonEmptyString( t)) {
      return new RangeConstraintViolation("The title must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };

  static checkLocation( t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A location must be provided!");
    } else if (!isNonEmptyString( t)) {
      return new RangeConstraintViolation("The location must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };
  static checkIsAvailable( t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A location must be provided!");
    } else if (!isBooleanOrBooleanString( t)) {
      return new RangeConstraintViolation("The location must be a non-empty boolean!");
    } else {
      return new NoConstraintViolation();
    }
  };
/*********************************************************
 ***  Set methods **
 *********************************************************/
  set id( t) {
    const validationResult = Key.checkId( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._id = t;
    } else {
      throw validationResult;
    }
  };

  set name( t) {
    const validationResult = Key.checkName( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._name = t;
    } else {
      throw validationResult;
    }
  };

  set title( t) {
    const validationResult = Key.checkTitle( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._title = t;
    } else {
      throw validationResult;
    }
  };

  set location( t) {
    const validationResult = Key.checkLocation( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._location = t;
    } else {
      throw validationResult;
    }
  };

  set isAvailable( t) {
    const validationResult = Key.checkIsAvailable( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._isAvailable = t;
    } else {
      throw validationResult;
    }
  };

} // end class Key

/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
/**
 *  Conversion between a Key object and a corresponding Firestore document
 */
 Key.converter = {
  toFirestore: function (key) {
    const data = {
      id: key.id,
      name: key.name,
      title: key.title,
      location: key.location,
      isAvailable: key.isAvailable
    };
    return data;
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data( options);
    return new Key( data);
  },
};
// Load a key record from Firestore
Key.retrieve = async function (id) {
  const keysCollRef = db.collection("keys"),
        keyDocRef = keysCollRef.doc( id);
  var keyDocSnapshot=null;
  try {
    keyDocSnapshot = await keyDocRef.get();
  } catch( e) {
    console.error(`Error when retrieving key record: ${e}`);
    return null;
  }
  const keyRecord = keyDocSnapshot.data();
  return keyRecord;
};
// Load all key records from Firestore
Key.retrieveAll = async function () {
  const keysCollRef = db.collection("keys");
  var keysQuerySnapshot=null;
  try {
    keysQuerySnapshot = await keysCollRef.get();
  } catch( e) {
    console.error(`Error when retrieving key records: ${e}`);
    return null;
  }
  const keyDocs = keysQuerySnapshot.docs,
        keyRecords = keyDocs.map( d => d.data());
  console.log(`${keyRecords.length} key records retrieved.`);
  return keyRecords;
};


// Create a Firestore document in the Firestore collection "keys"
/* Key.add = async function (slots) {
  const keysCollRef = db.collection("keys"),
        keyDocRef = keysCollRef.doc( slots.id);
  try {
    await keyDocRef.set( slots);
  } catch( e) {
    console.error(`Error when adding key record: ${e}`);
    return;
  }
  console.log(`Key record ${slots.name} created.`);
}; */

Key.add = async function (slots) {
  var key = null;
  try {
    // validate data by creating Key instance
    console.log(slots)
    key = new Key( slots);
    console.log(key)
    // invoke asynchronous ID/uniqueness check
    let validationResult = await Key.checkIdAsId( key.id);
    if (!validationResult instanceof NoConstraintViolation) {
      throw validationResult;
    }
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
    key = null;
  }
  if (key) {
    try {
      const keyDocRef = db.collection("keys").doc( key.id);
      await keyDocRef.withConverter( Key.converter).set( key);
      console.log(`Key record "${key.id}" created!`);
    } catch (e) {
      console.error(`Error when adding key record: ${e}`);
    }
  }
};
// Update a Firestore document in the Firestore collection "keys"
Key.update = async function (slots) {
  const updSlots={};
  let validationResult = null,
  keyRec = null,
  keyDocRef = null;
  try {
    // retrieve up-to-date book record
    keyDocRef = db.collection("keys").doc(slots.id);
    const keyDocSn = await keyDocRef.withConverter(Key.converter).get();
    console.log(keyDocSn.data())
    keyRec = keyDocSn.data();
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
  }
  // update only those slots that have changed
  try {
    if (keyRec._name !== slots.name) {
      validationResult = Key.checkName( slots.name);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.name = slots.name;
      } else {
        throw validationResult;
      }
    }
    if (keyRec._title !== slots.title) {
      validationResult = Key.checkTitle( slots.title);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.title = slots.title;
      } else {
        throw validationResult;
      }
    }
    if (keyRec._location !== slots.location) {
      validationResult = Key.checkLocation( slots.location);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.location = slots.location;
      } else {
        throw validationResult;
      }
    }
    if (keyRec._isAvailable !== slots.isAvailable) {
      validationResult = Key.checkIsAvailable( slots.isAvailable);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.isAvailable = slots.isAvailable;
      } else {
        throw validationResult;
      }
    } 
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
  }

  if (Object.keys( updSlots).length > 0) {
    try {
      await db.collection("keys").doc(slots.id).update( updSlots);
    } catch( e) {
      console.error(`Error when updating key record: ${e}`);
      return;
    }
    console.log(`Key record ${slots.id} modified.`);
  }
};
// Delete a Firestore document in the Firestore collection "keys"
Key.destroy = async function (id) {
  try {
    await db.collection("keys").doc( id).delete();
  } catch( e) {
    console.error(`Error when deleting key record: ${e}`);
    return;
  }
  console.log(`Key record ${id} deleted.`);
};
/*******************************************
 *** Auxiliary methods for testing **********
 ********************************************/
// Create test data
Key.generateTestData = async function () {
  let keyRecords = [
    {
      id: 1,
      name: "Max Must",
      keyType: "internal key",
      assignedBranch: "Berlin",
      companyName: "XYZ GmbH",
      email: "max@email.com"
    },
  ];
  // save all key records
  await Promise.all( keyRecords.map(
    keyRec => db.collection("keys").doc( keyRec.id).set( keyRec)
  ));
  console.log(`${Object.keys( keyRecords).length} keys saved.`);
};
// Clear test data
Key.clearData = async function () {
  if (confirm("Do you really want to delete all key records?")) {
    // retrieve all keys documents from Firestore
    const keyRecords = await Key.retrieveAll();
    // delete all documents
    await Promise.all( keyRecords.map(
      keyRec => db.collection("keys").doc( keyRec.id).delete()));
    // ... and then report that they have been deleted
    console.log(`${Object.values( keyRecords).length} keys deleted.`);
  }
};


export default Key;