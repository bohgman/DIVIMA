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
import Enumeration from "../../lib/Enumeration.mjs"


class Location {
  // using a single record parameter with ES6 function parameter destructuring
  constructor({
    id,
    name
  }) {
    this.id = id;
    this.name = name;
  }
}
/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
// Load a key record from Firestore
Location.retrieve = async function(id) {
  const keysCollRef = db.collection("locations"),
    keyDocRef = keysCollRef.doc(id);
  var keyDocSnapshot = null;
  try {
    keyDocSnapshot = await keyDocRef.get();
  } catch (e) {
    console.error(`Error when retrieving location record: ${e}`);
    return null;
  }
  const keyRecord = keyDocSnapshot.data();
  return keyRecord;
};
// Load all key records from Firestore
Location.retrieveAll = async function() {
  const keysCollRef = db.collection("locations");
  var keysQuerySnapshot = null;
  try {
    keysQuerySnapshot = await keysCollRef.get();
  } catch (e) {
    console.error(`Error when retrieving location records: ${e}`);
    return null;
  }
  const keyDocs = keysQuerySnapshot.docs,
    keyRecords = keyDocs.map(d => d.data());
  console.log(`${keyRecords.length} location records retrieved.`);
  return keyRecords;
};


// Create a Firestore document in the Firestore collection "locations"
Location.add = async function(slots) {
  const keysCollRef = db.collection("locations"),
    keyDocRef = keysCollRef.doc(slots.id);
  try {
    await keyDocRef.set(slots);
  } catch (e) {
    console.error(`Error when adding location record: ${e}`);
    return;
  }
  console.log(`Location record ${slots.name} created.`);
};

// Update a Firestore document in the Firestore collection "locations"
Location.update = async function(slots) {
  const updSlots = {};
  // retrieve up-to-date key record
  const keyRec = await Location.retrieve(slots.id);
  // update only those slots that have changed
  if (keyRec.name !== slots.name) {
    updSlots.name = slots.name;
  }

  if (Object.keys(updSlots).length > 0) {
    try {
      await db.collection("locations").doc(slots.id).update(updSlots);
    } catch (e) {
      console.error(`Error when updating location record: ${e}`);
      return;
    }
    console.log(`Location record ${slots.id} modified.`);
  }
};
// Delete a Firestore document in the Firestore collection "locations"
Location.destroy = async function(id) {
  try {
    await db.collection("locations").doc(id).delete();
  } catch (e) {
    console.error(`Error when deleting key record: ${e}`);
    return;
  }
  console.log(`Location record ${id} deleted.`);
};
/*******************************************
 *** Auxiliary methods for testing **********
 ********************************************/
// Create test data
Location.generateTestData = async function() {
  let locationRecords = [{
    id: 1,
    name: "Max Must",
  }, ];
  // save all key records
  await Promise.all(locationRecords.map(
    keyRec => db.collection("locations").doc(keyRec.id).set(keyRec)
  ));
  console.log(`${Object.keys( keyRecords).length} locations saved.`);
};
// Clear test data
Location.clearData = async function() {
  if (confirm("Do you really want to delete all location records?")) {
    // retrieve all keys documents from Firestore
    const keyRecords = await Location.retrieveAll();
    // delete all documents
    await Promise.all(keyRecords.map(
      keyRec => db.collection("locations").doc(keyRec.id).delete()));
    // ... and then report that they have been deleted
    console.log(`${Object.values( keyRecords).length} locations deleted.`);
  }
};


export default Location;
