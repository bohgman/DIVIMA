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

class Visitor {
  // using a single record parameter with ES6 function parameter destructuring
  constructor({id, name, visitorType, assignedBranch, companyName, email}) {
    this.id = id;
    this.name = name;
    this.visitorType = visitorType;
    this.assignedBranch = assignedBranch;
    this.companyName = companyName;
    this.email = email;
  }
}
/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
// Load a visitor record from Firestore
Visitor.retrieve = async function (id) {
  const visitorsCollRef = db.collection("visitors"),
        visitorDocRef = visitorsCollRef.doc( id);
  var visitorDocSnapshot=null;
  try {
    visitorDocSnapshot = await visitorDocRef.get();
  } catch( e) {
    console.error(`Error when retrieving visitor record: ${e}`);
    return null;
  }
  const visitorRecord = visitorDocSnapshot.data();
  return visitorRecord;
};
// Load all visitor records from Firestore
Visitor.retrieveAll = async function () {
  const visitorsCollRef = db.collection("visitors");
  var visitorsQuerySnapshot=null;
  try {
    visitorsQuerySnapshot = await visitorsCollRef.get();
  } catch( e) {
    console.error(`Error when retrieving visitor records: ${e}`);
    return null;
  }
  const visitorDocs = visitorsQuerySnapshot.docs,
        visitorRecords = visitorDocs.map( d => d.data());
  console.log(`${visitorRecords.length} visitor records retrieved.`);
  return visitorRecords;
};
// Create a Firestore document in the Firestore collection "visitors"
Visitor.add = async function (slots) {
  const visitorsCollRef = db.collection("visitors"),
        visitorDocRef = visitorsCollRef.doc( slots.id);
  try {
    await visitorDocRef.set( slots);
  } catch( e) {
    console.error(`Error when adding visitor record: ${e}`);
    return;
  }
  console.log(`Visitor record ${slots.id} created.`);
};
// Update a Firestore document in the Firestore collection "visitors"
Visitor.update = async function (slots) {
  const updSlots={};
  // retrieve up-to-date visitor record
  const visitorRec = await Visitor.retrieve( slots.id);
  // update only those slots that have changed
  if (visitorRec.name !== slots.name) updSlots.name = slots.name;
  if (visitorRec.companyName !== slots.companyName) updSlots.companyName = slots.companyName;
  if (visitorRec.email !== slots.email) updSlots.email = slots.email;
  if (visitorRec.year !== slots.year) updSlots.year = slots.year;
  if (visitorRec.visitorType !== slots.visitorType) updSlots.visitorType = slots.visitorType;
  if (visitorRec.assignedBranch !== slots.assignedBranch) updSlots.assignedBranch = slots.assignedBranch;

  if (Object.keys( updSlots).length > 0) {
    try {
      await db.collection("visitors").doc( slots.id).update( updSlots);
    } catch( e) {
      console.error(`Error when updating visitor record: ${e}`);
      return;
    }
    console.log(`Visitor record ${slots.id} modified.`);
  }
};
// Delete a Firestore document in the Firestore collection "visitors"
Visitor.destroy = async function (id) {
  try {
    await db.collection("visitors").doc( id).delete();
  } catch( e) {
    console.error(`Error when deleting visitor record: ${e}`);
    return;
  }
  console.log(`Visitor record ${id} deleted.`);
};
/*******************************************
 *** Auxiliary methods for testing **********
 ********************************************/
// Create test data
Visitor.generateTestData = async function () {
  let visitorRecords = [
    {
      id: "1",
      name: "Max Must",
      visitorType: "internal visitor",
      assignedBranch: "Berlin",
      companyName: "XYZ GmbH",
      email: "max@email.com"
    },
    {
      id: "2",
      name: "Max Must",
      visitorType: "internal visitor",
      assignedBranch: "Berlin",
      companyName: "XYZ GmbH",
      email: "max@email.com"
    },
  ];
  // save all visitor records
  await Promise.all( visitorRecords.map(
    visitorRec => db.collection("visitors").doc( visitorRec.id).set( visitorRec)));
  console.log(`${Object.keys( visitorRecords).length} visitors saved.`);
};
// Clear test data
Visitor.clearData = async function () {
  if (confirm("Do you really want to delete all visitor records?")) {
    // retrieve all visitors documents from Firestore
    const visitorRecords = await Visitor.retrieveAll();
    // delete all documents
    await Promise.all( visitorRecords.map(
      visitorRec => db.collection("visitors").doc( visitorRec.id).delete()));
    // ... and then report that they have been deleted
    console.log(`${Object.values( visitorRecords).length} visitors deleted.`);
  }
};
