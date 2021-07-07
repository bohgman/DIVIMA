/*;import Visit from "../m/Visit.mjs";
 */
import Visitor from "../m/Visitor.mjs"
import Key from "../m/Key.mjs";
import Parking from "../m/Parking.mjs";
import Location from "../m/Location.mjs";

/**
 * Generate test data for testing
 */
//TODO generate data
async function generateTestData() {
  console.log(`Generating visitors`);
  try {
    let visitorInstances = [{
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
      {
        id: "3",
        name: "Max Must",
        visitorType: "internal visitor",
        assignedBranch: "Berlin",
        companyName: "XYZ GmbH",
        email: "max@email.com"
      },
    ];

    await Promise.all(visitorInstances.map(
      visitorRec => db.collection("visitors").doc(visitorRec.id).set(visitorRec)
    ));
  } catch (e) {
    console.log("Error: " + e);
  }
  console.log(`Generating keys`);
  try {
    let keyInstances = [{
      id: "1",
      name: "Key Must",
      title: "Key of front door",
      location: "Berlin",
      isAvailable: "off",
    }];

    await Promise.all(keysInstances.map(
      keyRec => db.collection("keys").doc(keyRec.id).set(keyRec)
    ));
  } catch (e) {
    console.log("Error: " + e);
  }
  console.log(`Generating parking`);
  try {
    let parkingInstances = [{
      id: "1",
      name: "Key Must",
      title: "Key of front door",
      location: "Berlin",
      isAvailable: "off",
    }];

    await Promise.all(parkingInstances.map(
      parkRec => db.collection("parkings").doc(parkRec.id).set(parkRec)
    ));
  } catch (e) {
    console.log("Error: " + e);
  }
}

/**
 * Clear data
 */
async function clearData() {
  if (confirm("Do you really want to delete the entire database?")) {
    //retrieve all visitor documents from Firestore
    const visitorRecords = await Visitor.retrieveAll();
    const keyRecords = await Key.retrieveAll();
    //delete all documents
    await Promise.all(visitorRecords.map(
      visitorRec => db.collection("visitors").doc(visitorRec.id).delete()));
    //show confirmation
    console.log(`${Object.values( visitorRecords).length} visitors deleted`);
    //delete all documents
    await Promise.all(keyRecords.map(
      keyRec => db.collection("keys").doc(keyRec.id).delete()));
    //show confirmation
    console.log(`${Object.values( keyRecords).length} keys deleted`);
  }
}

export {
  generateTestData,
  clearData
};
