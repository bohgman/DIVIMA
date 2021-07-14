/**
 * @fileOverview  The model class Visitor with attribute definitions and storage management methods
 * @authors Gerd Wagner & Juan-Francisco Reyes
 * @copyright Copyright 2013-2021 Gerd Wagner (Chair of Internet Technology) and Juan-Francisco Reyes, Brandenburg University of Technology, Germany.
 * @license This code is licensed under The Code Project Open License (CPOL), implying that the code is provided "as-is",
 * can be modified to create derivative works, can be redistributed, and can be used in commercial applications.
 */
/**
 * Constructor function for the class Visitor
 * @constructor
 * @param {{isbn: string, title: string, year: number}} slots - Object creation slots.
 */
import {
  NoConstraintViolation,
  MandatoryValueConstraintViolation,
  RangeConstraintViolation,
  IntervalConstraintViolation,
  PatternConstraintViolation,
  UniquenessConstraintViolation
}
from "../../lib/errorTypes.mjs";
import {
  isNonEmptyString,
  isIntegerOrIntegerString,
  isBooleanOrBooleanString
}
from "../../lib/util.mjs";


class Visits {
  // using a single record parameter with ES6 function parameter destructuring

  constructor({
    id,
    location,
    // visitor id,
    title,
    date,
    // key,
    parkingPlace,
    isAvailable
  }) {
    this.id = id;
    this.location = location;
    // this.visitorID = visitorID;
    this.title = title;
    this.date = date;
    // this.key = key;
    this.parkingPlace = parkingPlace;
    this.isAvailable = isAvailable;
  }
  /*********************************************************
   ***  Get methods **
   *********************************************************/
  get id() {
    return this._id;
  };

  get location() {
    return this._location;
  };


  get title() {
    return this._title;
  };


  get date() {
    return this._date;
  };

  // get key() {
  //   return this._key;
  // };
  get parkingPlace() {
    return this._parkingPlace;
  };
  get isAvailable() {
    return this._isAvailable;
  };
  /*********************************************************
   ***  Check methods **
   *********************************************************/
  static async checkIdAsId(t) {
    console.log("checkIdAsId!!!")
    let validationResult = Visit.checkId(t);
    if ((validationResult instanceof NoConstraintViolation)) {
      if (!t) {
        validationResult = new MandatoryValueConstraintViolation(
          "A value for the Id must be provided!");
      } else {
        let keyDocSn = await db.collection("visits").doc(t).get();
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
  static checkId(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("An Id must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The id must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };
  static checkLocation(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A Location must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The Location must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };

  static checkTitle(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A title must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The title must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };

  static checkDate(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A Date must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The Date must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };
  // static checkKey(t) {
  //   if (!t) {
  //     return new MandatoryValueConstraintViolation("A Key must be provided!");
  //   } else if (!isNonEmptyString(t)) {
  //     return new RangeConstraintViolation("The Key must be a non-empty string!");
  //   } else {
  //     return new NoConstraintViolation();
  //   }
  // };
  static checkParkingPlace(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A ParkingPlace must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The ParkingPlace must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };
  static checkIsAvailable(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A location must be provided!");
    } else if (!isBooleanOrBooleanString(t)) {
      return new RangeConstraintViolation("The location must be a non-empty boolean!");
    } else {
      return new NoConstraintViolation();
    }
  };

  /*********************************************************
   ***  Set methods **
   *********************************************************/
  set id(t) {
    const validationResult = Visit.checkId(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._id = t;
    } else {
      throw validationResult;
    }
  };

  set location(t) {
    const validationResult = Visit.checkLocation(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._location = t;
    } else {
      throw validationResult;
    }
  };

  set title(t) {
    const validationResult = Visit.checkTitle(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._title = t;
    } else {
      throw validationResult;
    }
  };

  set date(t) {
    const validationResult = Visit.checkDate(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._date = t;
    } else {
      throw validationResult;
    }
  };

  set key(t) {
    const validationResult = Visit.checkKey(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._key = t;
    } else {
      throw validationResult;
    }
  };
  set parkingPlace(t) {
    const validationResult = Visit.checkParkingPlace(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._parkingPlace = t;
    } else {
      throw validationResult;
    }
  };
  set isAvailable(t) {
    const validationResult = Parking.checkIsAvailable(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._isAvailable = t;
    } else {
      throw validationResult;
    }
  };
} // end class Visit

/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
/**
 *  Conversion between a Visit object and a corresponding Firestore document
 */
Visit.converter = {
  toFirestore: function(visit) {
    const data = {
      id: visit.id,
      location: visit.location,
      title: visit.title,
      date: visit.date,
      // key: visit.key,
      parkingPlace: visit.parkingPlace,
      isAvailable: visit.isAvailable
    };
    return data;
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new Visit(data);
  },
};
// Load a Visit record from Firestore
Visit.retrieve = async function(id) {
  const keysCollRef = db.collection("visits"),
    keyDocRef = keysCollRef.doc(id);
  var keyDocSnapshot = null;
  try {
    keyDocSnapshot = await keyDocRef.get();
  } catch (e) {
    console.error(`Error when retrieving visits record: ${e}`);
    return null;
  }
  const keyRecord = keyDocSnapshot.data();
  return keyRecord;
};
// Load all visit records from Firestore
Visit.retrieveAll = async function() {
  const keysCollRef = db.collection("visits");
  var keysQuerySnapshot = null;
  try {
    keysQuerySnapshot = await keysCollRef.get();
  } catch (e) {
    console.error(`Error when retrieving visit records: ${e}`);
    return null;
  }
  const keyDocs = keysQuerySnapshot.docs,
    keyRecords = keyDocs.map(d => d.data());
  console.log(`${keyRecords.length} visit records retrieved.`);
  return keyRecords;
};

//
// // Create a Firestore document in the Firestore collection "visitors"
// Visitor.add = async function(slots) {
//   const visitorsCollRef = db.collection("visitors"),
//     visitorDocRef = visitorsCollRef.doc(slots.id);
//   try {
//     await visitorDocRef.set(slots);
//   } catch (e) {
//     console.error(`Error when adding visitor record: ${e}`);
//     return;
//   }
//   console.log(`Visitor record ${slots.name} created.`);
// };
Visit.add = async function(slots) {
  var visit = null;
  try {
    // validate data by creating visitor instance
    console.log(slots)
    visit = new Visit(slots);
    console.log(visit)
    // invoke asynchronous ID/uniqueness check
    let validationResult = await Visit.checkIdAsId(visit.id);
    if (!validationResult instanceof NoConstraintViolation) {
      throw validationResult;
    }
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
    visit = null;
  }
  if (visit) {
    try {
      const keyDocRef = db.collection("visits").doc(visit.id);
      await keyDocRef.withConverter(Visit.converter).set(visit);
      console.log(`Visit record "${visit.id}" created!`);
    } catch (e) {
      console.error(`Error when adding visit record: ${e}`);
    }
  }
};
// Update a Firestore document in the Firestore collection "visitors"
Visit.update = async function(slots) {
      const updSlots = {};
      let validationResult = null,
        keyRec = null,
        keyDocRef = null;
      try {
        // retrieve up-to-date book record
        keyDocRef = db.collection("visits").doc(slots.id);
        const keyDocSn = await keyDocRef.withConverter(Visit.converter).get();
        console.log(keyDocSn.data())
        keyRec = keyDocSn.data();
      } catch (e) {
        console.error(`${e.constructor.name}: ${e.message}`);
      }
      // update only those slots that have changed
      try {
        if (keyRec._location !== slots.location) {
          validationResult = Visits.checkLocation(slots.location);
          if (validationResult instanceof NoConstraintViolation) {
            updSlots.location = slots.location;
          } else {
            throw validationResult;
          }
        }
        if (keyRec._title !== slots.title) {
          validationResult = Key.checkTitle(slots.title);
          if (validationResult instanceof NoConstraintViolation) {
            updSlots.title = slots.title;
          } else {
            throw validationResult;
          }
        }
        try {
          if (keyRec._date !== slots.date) {
            validationResult = Key.checkDate(slots.date);
            if (validationResult instanceof NoConstraintViolation) {
              updSlots.date = slots.date;
            } else {
              throw validationResult;
            }
          }
          try {
            if (keyRec._parkingPlace !== slots.parkingPlace) {
              validationResult = Key.checParkingPlace(slots.parkingPlace);
              if (validationResult instanceof NoConstraintViolation) {
                updSlots.parkingPlace = slots.parkingPlace;
              } else {
                throw validationResult;
              }
            }
            if (keyRec._isAvailable !== slots.isAvailable) {
              validationResult = Key.checkIsAvailable(slots.isAvailable);
              if (validationResult instanceof NoConstraintViolation) {
                updSlots.isAvailable = slots.isAvailable;
              } else {
                throw validationResult;
              }
            }
          } catch (e) {
            console.error(`${e.constructor.name}: ${e.message}`);
          }

          if (Object.keys(updSlots).length > 0) {
            try {
              await db.collection("visits").doc(slots.id).update(updSlots);
            } catch (e) {
              console.error(`Error when updating visit record: ${e}`);
              return;
            }
            console.log(`visit record ${slots.id} modified.`);
          }
        };
        // Delete a Firestore document in the Firestore collection "visitors"
        Visit.destroy = async function(id) {
          try {
            await db.collection("visits").doc(id).delete();
          } catch (e) {
            console.error(`Error when deleting visit record: ${e}`);
            return;
          }
          console.log(`Visit record ${id} deleted.`);
        };
        /*******************************************
         *** Auxiliary methods for testing **********
         ********************************************/
        // Create test data
        Visit.generateTestData = async function() {
          let visitorRecords = [{
            id: 1,
            location: "Berlin",
            title: "parking",
            date: "20.07.2021",
            parkingPlace: "42",

          }, ];
          // save all visit records
          await Promise.all(visitRecords.map(
            visitorRec => db.collection("visits").doc(visitRec.id).set(visitorRec)
          ));
          console.log(`${Object.visits( visitRecords).length} visits saved.`);
        };
        // Clear test data
        Visit.clearData = async function() {
          if (confirm("Do you really want to delete all visit records?")) {
            // retrieve all visits documents from Firestore
            const visitRecords = await Visit.retrieveAll();
            // delete all documents
            await Promise.all(visitRecords.map(
              visitRec => db.collection("visits").doc(visitRec.id).delete()));
            // ... and then report that they have been deleted
            console.log(`${Object.values( visitRecords).length} visits deleted.`);
          }
        };


        export default Visit;
