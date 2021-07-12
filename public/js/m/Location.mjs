/**
 * @fileOverview  The model class Location with attribute definitions and storage management methods
 * @authors Gerd Wagner & Juan-Francisco Reyes
 * @copyright Copyright 2013-2021 Gerd Wagner (Chair of Internet Technology) and Juan-Francisco Reyes, Brandenburg University of Technology, Germany.
 * @license This code is licensed under The Code Project Open License (CPOL), implying that the code is provided "as-is",
 * can be modified to create derivative works, can be redistributed, and can be used in commercial applications.
 */
/**
 * Constructor function for the class Location
 * @constructor
 * @param {{isbn: string, title: string, year: number}} slots - Object creation slots.
 */
 import { NoConstraintViolation, MandatoryValueConstraintViolation, RangeConstraintViolation,
  IntervalConstraintViolation, PatternConstraintViolation, UniquenessConstraintViolation }
  from "../../lib/errorTypes.mjs";
import { isNonEmptyString, isIntegerOrIntegerString, isBooleanOrBooleanString }
  from "../../lib/util.mjs";

class Location {
  // using a single record parameter with ES6 function parameter destructuring
  constructor({id, name}) {
    this.id = id;
    this.name = name;
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


/*********************************************************
 ***  Check methods **
 *********************************************************/
  static async checkIdAsId( t) {
    console.log("checkIdAsId!!!")
    let validationResult = Location.checkId( t);
    if ((validationResult instanceof NoConstraintViolation)) {
      if (!t) {
        validationResult = new MandatoryValueConstraintViolation(
          "A value for the Id must be provided!");
      } else {
        let keyDocSn = await db.collection("locations").doc( t).get();
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

/*********************************************************
 ***  Set methods **
 *********************************************************/
  set id( t) {
    const validationResult = Location.checkId( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._id = t;
    } else {
      throw validationResult;
    }
  };

  set name( t) {
    const validationResult = Location.checkName( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._name = t;
    } else {
      throw validationResult;
    }
  };


} // end class Location

/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
/**
 *  Conversion between a Location object and a corresponding Firestore document
 */
 Location.converter = {
  toFirestore: function (location) {
    const data = {
      id: location.id,
      name: location.name,
    };
    return data;
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data( options);
    return new Location( data);
  },
};
// Load a location record from Firestore
Location.retrieve = async function (id) {
  const keysCollRef = db.collection("locations"),
        keyDocRef = keysCollRef.doc( id);
  var keyDocSnapshot=null;
  try {
    keyDocSnapshot = await keyDocRef.get();
  } catch( e) {
    console.error(`Error when retrieving location record: ${e}`);
    return null;
  }
  const keyRecord = keyDocSnapshot.data();
  return keyRecord;
};
// Load all location records from Firestore
Location.retrieveAll = async function () {
  const keysCollRef = db.collection("locations");
  var keysQuerySnapshot=null;
  try {
    keysQuerySnapshot = await keysCollRef.get();
  } catch( e) {
    console.error(`Error when retrieving location records: ${e}`);
    return null;
  }
  const keyDocs = keysQuerySnapshot.docs,
        keyRecords = keyDocs.map( d => d.data());
  console.log(`${keyRecords.length} location records retrieved.`);
  return keyRecords;
};


// Create a Firestore document in the Firestore collection "locations"
/* Location.add = async function (slots) {
  const keysCollRef = db.collection("locations"),
        keyDocRef = keysCollRef.doc( slots.id);
  try {
    await keyDocRef.set( slots);
  } catch( e) {
    console.error(`Error when adding location record: ${e}`);
    return;
  }
  console.log(`Location record ${slots.name} created.`);
}; */

Location.add = async function (slots) {
  var location = null;
  try {
    // validate data by creating Location instance
    console.log(slots)
    location = new Location( slots);
    console.log(location)
    // invoke asynchronous ID/uniqueness check
    let validationResult = await Location.checkIdAsId( location.id);
    if (!validationResult instanceof NoConstraintViolation) {
      throw validationResult;
    }
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
    location = null;
  }
  if (location) {
    try {
      const keyDocRef = db.collection("locations").doc( location.id);
      await keyDocRef.withConverter( Location.converter).set( location);
      console.log(`Location record "${location.id}" created!`);
    } catch (e) {
      console.error(`Error when adding location record: ${e}`);
    }
  }
};
// Update a Firestore document in the Firestore collection "locations"
Location.update = async function (slots) {
  const updSlots={};
  let validationResult = null,
  keyRec = null,
  keyDocRef = null;
  try {
    // retrieve up-to-date book record
    keyDocRef = db.collection("locations").doc(slots.id);
    const keyDocSn = await keyDocRef.withConverter(Location.converter).get();
    console.log(keyDocSn.data())
    keyRec = keyDocSn.data();
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
  }
  // update only those slots that have changed
  try {
    if (keyRec._name !== slots.name) {
      validationResult = Location.checkName( slots.name);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.name = slots.name;
      } else {
        throw validationResult;
      }
    }
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
  }

  if (Object.keys( updSlots).length > 0) {
    try {
      await db.collection("locations").doc(slots.id).update( updSlots);
    } catch( e) {
      console.error(`Error when updating location record: ${e}`);
      return;
    }
    console.log(`Location record ${slots.id} modified.`);
  }
};
// Delete a Firestore document in the Firestore collection "locations"
Location.destroy = async function (id) {
  try {
    await db.collection("locations").doc( id).delete();
  } catch( e) {
    console.error(`Error when deleting location record: ${e}`);
    return;
  }
  console.log(`Location record ${id} deleted.`);
};


export default Location;