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
import Enumeration from "../../lib/Enumeration.mjs"


class Key {
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
Key.retrieve = async function(id) {
  const keysCollRef = db.collection("keys"),
    keyDocRef = keysCollRef.doc(id);
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
Key.retrieveAll = async function() {
  const keysCollRef = db.collection("keys");
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


// Create a Firestore document in the Firestore collection "keys"
Key.add = async function(slots) {
  const keysCollRef = db.collection("keys"),
    keyDocRef = keysCollRef.doc(slots.id);
  try {
    await keyDocRef.set(slots);
  } catch (e) {
    console.error(`Error when adding key record: ${e}`);
    return;
  }
  console.log(`Key record ${slots.name} created.`);
};

// Update a Firestore document in the Firestore collection "keys"
Key.update = async function(slots) {
  const updSlots = {};
  // retrieve up-to-date key record
  const keyRec = await Key.retrieve(slots.id);
  // update only those slots that have changed
  if (keyRec.name !== slots.name) {
    updSlots.name = slots.name;
  }
  if (keyRec.title !== slots.title) updSlots.title = slots.title;
  if (keyRec.location !== slots.location) updSlots.location = slots.location;
  if (keyRec.isAvailable !== slots.isAvailable) updSlots.isAvailable = slots.isAvailable;

  if (Object.keys(updSlots).length > 0) {
    try {
      await db.collection("keys").doc(slots.id).update(updSlots);
    } catch (e) {
      console.error(`Error when updating key record: ${e}`);
      return;
    }
    console.log(`Key record ${slots.id} modified.`);
  }
};
// Delete a Firestore document in the Firestore collection "keys"
Key.destroy = async function(id) {
  try {
    await db.collection("keys").doc(id).delete();
  } catch (e) {
    console.error(`Error when deleting key record: ${e}`);
    return;
  }
  console.log(`Key record ${id} deleted.`);
};
/*******************************************
 *** Auxiliary methods for testing **********
 ********************************************/
// Create test data
Key.generateTestData = async function() {
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
    keyRec => db.collection("keys").doc(keyRec.id).set(keyRec)
  ));
  console.log(`${Object.keys( keyRecords).length} keys saved.`);
};
// Clear test data
Key.clearData = async function() {
  if (confirm("Do you really want to delete all key records?")) {
    // retrieve all keys documents from Firestore
    const keyRecords = await Key.retrieveAll();
    // delete all documents
    await Promise.all(keyRecords.map(
      keyRec => db.collection("keys").doc(keyRec.id).delete()));
    // ... and then report that they have been deleted
    console.log(`${Object.values( keyRecords).length} keys deleted.`);
  }
};


export default Key;
