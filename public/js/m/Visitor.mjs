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

const VisitorTypeEL = new Enumeration({
  "IV": "Internal Visitor",
  "EV": "External Visitor",
  "SP": "Service Provider",
});

class Visitor {
  // using a single record parameter with ES6 function parameter destructuring
  constructor({
    id,
    name,
    visitorType,
    assignedBranch,
    companyName,
    email
  }) {
    this.id = id;
    this.name = name;
    this.visitorType = visitorType;
    this.assignedBranch = assignedBranch;
    this.companyName = companyName;
    this.email = email;
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

  get visitorType() {
    return this._visitorType;
  };

  get assignedBranch() {
    return this._assignedBranch;
  };

  get companyName() {
    return this._companyName;
  };
  get email() {
    return this._email;
  };
  /*********************************************************
   ***  Check methods **
   *********************************************************/
  static async checkIdAsId(t) {
    console.log("checkIdAsId!!!")
    let validationResult = Visitor.checkId(t);
    if ((validationResult instanceof NoConstraintViolation)) {
      if (!t) {
        validationResult = new MandatoryValueConstraintViolation(
          "A value for the Id must be provided!");
      } else {
        let keyDocSn = await db.collection("visitors").doc(t).get();
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
  static checkName(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A name must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The name must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };

  static checkVisitorType(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A VisitorType must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The VisitorType must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };

  static checkassignedBranch(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A assignedBranch must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The assignedBranch must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };
  static checkCompanyName(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A CompanyName must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The CompanyName must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };
  static checkEmail(t) {
    if (!t) {
      return new MandatoryValueConstraintViolation("A Email must be provided!");
    } else if (!isNonEmptyString(t)) {
      return new RangeConstraintViolation("The Email must be a non-empty string!");
    } else {
      return new NoConstraintViolation();
    }
  };

  /*********************************************************
   ***  Set methods **
   *********************************************************/
  set id(t) {
    const validationResult = Visitor.checkId(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._id = t;
    } else {
      throw validationResult;
    }
  };

  set name(t) {
    const validationResult = Visitor.checkName(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._name = t;
    } else {
      throw validationResult;
    }
  };

  set visitorType(t) {
    const validationResult = Visitor.checkVisitorType(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._visitorType = t;
    } else {
      throw validationResult;
    }
  };

  set companyName(t) {
    const validationResult = Visitor.checkCompanyName(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._companyName = t;
    } else {
      throw validationResult;
    }
  };

  set assignedBranch(t) {
    const validationResult = Visitor.checkAssignedBranch(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._assignedBranch = t;
    } else {
      throw validationResult;
    }
  };
  set email(t) {
    const validationResult = Visitor.checkEmail(t);
    if (validationResult instanceof NoConstraintViolation) {
      this._email = t;
    } else {
      throw validationResult;
    }
  };
} // end class Visitor

/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
/**
 *  Conversion between a visitor object and a corresponding Firestore document
 */
Visitor.converter = {
  toFirestore: function(visitor) {
    const data = {
      id: visitor.id,
      name: visitor.name,
      visitorType: visitor.visitorType,
      assignedBranch: visitor.assignedBranch,
      companyName: visitor.companyName,
      email: visitor.email
    };
    return data;
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new Visitor(data);
  },
};
// Load a visitor record from Firestore
Visitor.retrieve = async function(id) {
  const keysCollRef = db.collection("visitors"),
    keyDocRef = keysCollRef.doc(id);
  var keyDocSnapshot = null;
  try {
    keyDocSnapshot = await keyDocRef.get();
  } catch (e) {
    console.error(`Error when retrieving visitor record: ${e}`);
    return null;
  }
  const keyRecord = keyDocSnapshot.data();
  return keyRecord;
};
// Load all visitor records from Firestore
Visitor.retrieveAll = async function() {
  const keysCollRef = db.collection("visitors");
  var visitorsQuerySnapshot = null;
  try {
    visitorsQuerySnapshot = await keysCollRef.get();
  } catch (e) {
    console.error(`Error when retrieving visitor records: ${e}`);
    return null;
  }
  const visitorDocs = keysQuerySnapshot.docs,
    visitorRecords = KeyDocs.map(d => d.data());
  console.log(`${keyRecords.length} visitor records retrieved.`);
  return visitorRecords;
};

//
// // Create a Firestore document in the Firestore collection "visitors"
// Visitor.add = async function(slots) {
//   const keysCollRef = db.collection("visitors"),
//     keyDocRef = keysCollRef.doc(slots.id);
//   try {
//     await keyDocRef.set(slots);
//   } catch (e) {
//     console.error(`Error when adding visitor record: ${e}`);
//     return;
//   }
//   console.log(`Visitor record ${slots.name} created.`);
// };
Visitor.add = async function(slots) {
  var visitor = null;
  try {
    // validate data by creating visitor instance
    console.log(slots)
    visitor = new Visitor(slots);
    console.log(visitor)
    // invoke asynchronous ID/uniqueness check
    let validationResult = await Visitor.checkIdAsId(visitor.id);
    if (!validationResult instanceof NoConstraintViolation) {
      throw validationResult;
    }
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
    visitor = null;
  }
  if (visitor) {
    try {
      const keyDocRef = db.collection("visitors").doc(visitor.id);
      awaitvisitoryDocRef.withConverter(Visitor.converter).set(visitor);
      console.log(`Visitor record "${visitor.id}" created!`);
    } catch (e) {
      console.error(`Error when adding visitor record: ${e}`);
    }
  }
};
// Update a Firestore document in the Firestore collection "visitors"
Visitor.update = async function(slots) {
  const updSlots = {};
  let validationResult = null,
    visitorRec = null,
    keyDocRef = null;
  try {
    // retrieve up-to-date book record
    keyDocRef = db.collection("visitors").doc(slots.id);
    const keyDocSn = await KeyDocRef.withConverter(Visitor.converter).get();
    console.log(keyDocSn.data())
    visitorRec = keyDocSn.data();
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
  }
  // update only those slots that have changed
  try {
    if (visitorRec._name !== slots.name) {
      validationResult = Visitor.checkName(slots.name);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.name = slots.name;
      } else {
        throw validationResult;
      }
    }
    if (visitorRec._visitorType !== slots.visitorType) {
      validationResult = Visitor.checkVisitorType(slots.visitorType);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.visitorType = slots.visitorType;
      } else {
        throw validationResult;
      }
    }
    if (visitorRec._assignedBranch !== slots.assignedBranch) {
      validationResult = Visitor.checkAssignedBranch(slots.assignedBranch);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.assignedBranch = slots.assignedBranch;
      } else {
        throw validationResult;
      }
    }
    if (visitorRec._companyName !== slots.companyName) {
      validationResult = Visitor.checkCompanyName(slots.companyName);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.companyName = slots.companyName;
      } else {
        throw validationResult;
      }
    }
    if (visitorRec._email !== slots.email) {
      validationResult = Visitor.checkEmail(slots.email);
      if (validationResult instanceof NoConstraintViolation) {
        updSlots.email = slots.email;
      } else {
        throw validationResult;
      }
    }
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
  }

  if (Object.visitors(updSlots).length > 0) {
    try {
      await db.collection("visitors").doc(slots.id).update(updSlots);
    } catch (e) {
      console.error(`Error when updating visitor record: ${e}`);
      return;
    }
    console.log(`visitor record ${slots.id} modified.`);
  }
};
// Delete a Firestore document in the Firestore collection "visitors"
Visitor.destroy = async function(id) {
  try {
    await db.collection("visitors").doc(id).delete();
  } catch (e) {
    console.error(`Error when deleting visitor record: ${e}`);
    return;
  }
  console.log(`Visitor record ${id} deleted.`);
};
/*******************************************
 *** Auxiliary methods for testing **********
 ********************************************/
// Create test data
Visitor.generateTestData = async function() {
  let visitorRecords = [{
    id: 1,
    name: "Max Must",
    visitorType: "internal visitor",
    assignedBranch: "Berlin",
    companyName: "XYZ GmbH",
    email: "max@email.com"
  }, ];
  // save all visitor records
  await Promise.all(visitorRecords.map(
    visitorRec => db.collection("visitors").doc(visitorRec.id).set(visitorRec)
  ));
  console.log(`${Object.visitors( visitorRecords).length} visitors saved.`);
};
// Clear test data
Visitor.clearData = async function() {
  if (confirm("Do you really want to delete all visitor records?")) {
    // retrieve all visitors documents from Firestore
    const visitorRecords = await Visitor.retrieveAll();
    // delete all documents
    await Promise.all(visitorRecords.map(
      visitorRec => db.collection("visitors").doc(visitorRec.id).delete()));
    // ... and then report that they have been deleted
    console.log(`${Object.values( visitorRecords).length} visitors deleted.`);
  }
};


export default Visitor;
