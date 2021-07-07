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
import Enumeration from "../../lib/Enumeration.mjs"


class Parking {
  // using a single record parameter with ES6 function parameter destructuring
  constructor({
    id,
    name,
    title,
    location,
    isAvailable
  }) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.location = location;
    this.isAvailable = isAvailable;
  }
}
/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
// Load a key record from Firestore
Parking.retrieve = async function(id) {
  const keysCollRef = db.collection("parkings"),
    keyDocRef = keysCollRef.doc(id);
  console.log(keyDocRef.get())
  var keyDocSnapshot = null;
  try {
    keyDocSnapshot = await keyDocRef.get();
  } catch (e) {
    console.error(`Error when retrieving key record: ${e}`);
    return null;
  }
  const keyRecord = keyDocSnapshot.data();
  return keyRecord;
};
// Load all key records from Firestore
Parking.retrieveAll = async function() {
  const keysCollRef = db.collection("parkings");
  var keysQuerySnapshot = null;
  try {
    keysQuerySnapshot = await keysCollRef.get();
  } catch (e) {
    console.error(`Error when retrieving key records: ${e}`);
    return null;
  }
  const keyDocs = keysQuerySnapshot.docs,
    keyRecords = keyDocs.map(d => d.data());
  console.log(`${keyRecords.length} key records retrieved.`);
  return keyRecords;
};


// Create a Firestore document in the Firestore collection "parkings"
Parking.add = async function(slots) {
  const keysCollRef = db.collection("parkings"),
    keyDocRef = keysCollRef.doc(slots.id);
  try {
    await keyDocRef.set(slots);
  } catch (e) {
    console.error(`Error when adding key record: ${e}`);
    return;
  }
  console.log(`Parking record ${slots.name} created.`);
};

// Update a Firestore document in the Firestore collection "parkings"
Parking.update = async function(slots) {
  const updSlots = {};
  // retrieve up-to-date key record
  console.log(slots.name)
  const keyRec = await Parking.retrieve(slots.id);
  console.log(keyRec)
  // update only those slots that have changed
  if (keyRec.name !== slots.name) {
    updSlots.name = slots.name;
  }
  if (keyRec.title !== slots.title) updSlots.title = slots.title;
  if (keyRec.location !== slots.location) updSlots.location = slots.location;
  if (keyRec.isAvailable !== slots.isAvailable) updSlots.isAvailable = slots.isAvailable;

  if (Object.keys(updSlots).length > 0) {
    try {
      await db.collection("parkings").doc(slots.id).update(updSlots);
    } catch (e) {
      console.error(`Error when updating key record: ${e}`);
      return;
    }
    console.log(`Parking record ${slots.id} modified.`);
  }
};
// Delete a Firestore document in the Firestore collection "parkings"
Parking.destroy = async function(id) {
  try {
    await db.collection("parkings").doc(id).delete();
  } catch (e) {
    console.error(`Error when deleting key record: ${e}`);
    return;
  }
  console.log(`Parking record ${id} deleted.`);
};
/*******************************************
 *** Auxiliary methods for testing **********
 ********************************************/
// Create test data
Parking.generateTestData = async function() {
  let keyRecords = [{
    id: 1,
    name: "Max Must",
    keyType: "internal key",
    assignedBranch: "Berlin",
    companyName: "XYZ GmbH",
    email: "max@email.com"
  }, ];
  // save all key records
  await Promise.all(keyRecords.map(
    keyRec => db.collection("parkings").doc(keyRec.id).set(keyRec)
  ));
  console.log(`${Object.keys( keyRecords).length} keys saved.`);
};
// Clear test data
Parking.clearData = async function() {
  if (confirm("Do you really want to delete all key records?")) {
    // retrieve all keys documents from Firestore
    const keyRecords = await Parking.retrieveAll();
    // delete all documents
    await Promise.all(keyRecords.map(
      keyRec => db.collection("parkings").doc(keyRec.id).delete()));
    // ... and then report that they have been deleted
    console.log(`${Object.values( keyRecords).length} keys deleted.`);
  }
};


export default Parking;
