/**
 * @fileOverview  The model class Parking with attribute definitions and storage management methods
 * @authors Gerd Wagner & Juan-Francisco Reyes
 * @copyright Copyright 2013-2021 Gerd Wagner (Chair of Internet Technology) and Juan-Francisco Reyes, Brandenburg University of Technology, Germany.
 * @license This code is licensed under The Code Project Open License (CPOL), implying that the code is provided "as-is",
 * can be modified to create derivative works, can be redistributed, and can be used in commercial applications.
 */
/**
 * Constructor function for the class Parking
 * @constructor
 * @param {{isbn: string, title: string, year: number}} slots - Object creation slots.
 */
 import { NoConstraintViolation, MandatoryValueConstraintViolation, RangeConstraintViolation,
  IntervalConstraintViolation, PatternConstraintViolation, UniquenessConstraintViolation }
  from "../../lib/errorTypes.mjs";
import { isNonEmptyString, isIntegerOrIntegerString, isBooleanOrBooleanString }
  from "../../lib/util.mjs";

class Parking {
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
    let validationResult = Parking.checkId( t);
    if ((validationResult instanceof NoConstraintViolation)) {
      if (!t) {
        validationResult = new MandatoryValueConstraintViolation(
          "A value for the Id must be provided!");
      } else {
        let keyDocSn = await db.collection("parkings").doc( t).get();
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
    const validationResult = Parking.checkId( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._id = t;
    } else {
      throw validationResult;
    }
  };

  set name( t) {
    const validationResult = Parking.checkName( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._name = t;
    } else {
      throw validationResult;
    }
  };

  set title( t) {
    const validationResult = Parking.checkTitle( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._title = t;
    } else {
      throw validationResult;
    }
  };

  set location( t) {
    const validationResult = Parking.checkLocation( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._location = t;
    } else {
      throw validationResult;
    }
  };

  set isAvailable( t) {
    const validationResult = Parking.checkIsAvailable( t);
    if (validationResult instanceof NoConstraintViolation) {
      this._isAvailable = t;
    } else {
      throw validationResult;
    }
  };

} // end class Parking

/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
/**
 *  Conversion between a Parking object and a corresponding Firestore document
 */
 Parking.converter = {
  toFirestore: function (parking) {
    const data = {
      id: parking.id,
      name: parking.name,
      title: parking.title,
      location: parking.location,
      isAvailable: parking.isAvailable
    };
    return data;
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data( options);
    return new Parking( data);
  },
};
// Load a parking record from Firestore
Parking.retrieve = async function (id) {
  const keysCollRef = db.collection("parkings"),
        keyDocRef = keysCollRef.doc( id);
  var keyDocSnapshot=null;
  try {
    keyDocSnapshot = await keyDocRef.get();
  } catch( e) {
    console.error(`Error when retrieving parking record: ${e}`);
    return null;
  }
  const keyRecord = keyDocSnapshot.data();
  return keyRecord;
};
// Load all parking records from Firestore
Parking.retrieveAll = async function () {
  const keysCollRef = db.collection("parkings");
  var keysQuerySnapshot=null;
  try {
    keysQuerySnapshot = await keysCollRef.get();
  } catch( e) {
    console.error(`Error when retrieving parking records: ${e}`);
    return null;
  }
  const keyDocs = keysQuerySnapshot.docs,
        keyRecords = keyDocs.map( d => d.data());
  console.log(`${keyRecords.length} parking records retrieved.`);
  return keyRecords;
};


// Create a Firestore document in the Firestore collection "parkings"
/* Parking.add = async function (slots) {
  const keysCollRef = db.collection("parkings"),
        keyDocRef = keysCollRef.doc( slots.id);
  try {
    await keyDocRef.set( slots);
  } catch( e) {
    console.error(`Error when adding parking record: ${e}`);
    return;
  }
  console.log(`Parking record ${slots.name} created.`);
}; */

Parking.add = async function (slots) {
  var parking = null;
  try {
    // validate data by creating Parking instance
    console.log(slots)
    parking = new Parking( slots);
    console.log(parking)
    // invoke asynchronous ID/uniqueness check
    let validationResult = await Parking.checkIdAsId( parking.id);
    if (!validationResult instanceof NoConstraintViolation) {
      throw validationResult;
    }
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
    parking = null;
  }
  if (parking) {
    try {
      const keyDocRef = db.collection("parkings").doc( parking.id);
      await keyDocRef.withConverter( Parking.converter).set( parking);
      console.log(`Parking record "${parking.id}" created!`);
    } catch (e) {
      console.error(`Error when adding parking record: ${e}`);
    }
  }
};
// Update a Firestore document in the Firestore collection "parkings"
Parking.update = async function (slots) {
  const updSlots={};
  let validationResult = null,
  keyRec = null,
  keyDocRef = null;
  try {
    // retrieve up-to-date book record
    keyDocRef = db.collection("parkings").doc(slots.id);
    const keyDocSn = await keyDocRef.withConverter(Parking.converter).get();
    console.log(keyDocSn.data())
    keyRec = keyDocSn.data();
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
  }
  // update only those slots that have changed
  try {
    if (keyRec._name !== slots.name) {
      validationResult = Parking.checkName( slots.name);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.name = slots.name;
      } else {
        throw validationResult;
      }
    }
    if (keyRec._title !== slots.title) {
      validationResult = Parking.checkTitle( slots.title);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.title = slots.title;
      } else {
        throw validationResult;
      }
    }
    if (keyRec._location !== slots.location) {
      validationResult = Parking.checkLocation( slots.location);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.location = slots.location;
      } else {
        throw validationResult;
      }
    }
    if (keyRec._isAvailable !== slots.isAvailable) {
      validationResult = Parking.checkIsAvailable( slots.isAvailable);
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
      await db.collection("parkings").doc(slots.id).update( updSlots);
    } catch( e) {
      console.error(`Error when updating parking record: ${e}`);
      return;
    }
    console.log(`Parking record ${slots.id} modified.`);
  }
};
// Delete a Firestore document in the Firestore collection "parkings"
Parking.destroy = async function (id) {
  try {
    await db.collection("parkings").doc( id).delete();
  } catch( e) {
    console.error(`Error when deleting parking record: ${e}`);
    return;
  }
  console.log(`Parking record ${id} deleted.`);
};


export default Parking;