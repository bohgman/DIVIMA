/***************************************************************
 Import classes, datatypes and utility procedures
 ***************************************************************/
import Location from "../m/Location.mjs";
import {
  fillSelectWithOptions
} from "../../lib/util.mjs";

/***************************************************************
 Load data
 ***************************************************************/
//await Parking.retrieveAll();

/***************************************************************
 Set up general, use-case-independent UI elements
 ***************************************************************/

// Set up Manage Parking UI
refreshManageDataUI();

// neutralize the submit event for all CRUD UIs
for (const frm of document.querySelectorAll("section > form")) {
  frm.addEventListener("submit", async function(e) {
    e.preventDefault();
    frm.reset();
  });
}
// save data when leaving the page
//TODO
window.addEventListener("beforeunload", Location.saveAll);

/**********************************************
 Use case Retrieve/List All Courses
 **********************************************/
document.getElementById("retrieveAndListAll")
  .addEventListener("click", async function() {
    document.getElementById("Location-M").style.setProperty("display", "none", "important")
    document.getElementById("Location-C").style.setProperty("display", "none", "important")
    document.getElementById("Location-R").style.display = "Block";
    document.getElementById("Location-U").style.setProperty("display", "none", "important")
    document.getElementById("Location-D").style.setProperty("display", "none", "important")
    const tableBodyEl = document.querySelector("#keys > tbody");
    tableBodyEl.innerHTML = ""; // drop old content
    const visitorInstances = await Location.retrieveAll();
    for (const objectKey of Object.keys(visitorInstances)) {
      const key = visitorInstances[objectKey];
      const row = tableBodyEl.insertRow();
      row.insertCell().textContent = key.id; // added from me
      row.insertCell().textContent = key.name;
    }
  });

/**********************************************
 Use case Create Location
 **********************************************/
const createFormEl = document.querySelector("#VisitorFormCreate");
document.getElementById("create").addEventListener("click", async function() {
  console.log("cliccato");
  document.getElementById("Location-M").style.setProperty("display", "none", "important")
  document.getElementById("Location-C").style.display = "block";
  document.getElementById("Location-R").style.setProperty("display", "none", "important")
  document.getElementById("Location-U").style.setProperty("display", "none", "important")
  document.getElementById("Location-D").style.setProperty("display", "none", "important")
  createFormEl.reset();
});

// handle Save button click events
createFormEl["commit"].addEventListener("click", async function() {
  const slots = {
    id: createFormEl.id.value,
    name: createFormEl.name.value,
  };
  await Location.add(slots);
  refreshManageDataUI();
});

/**********************************************
 Use case Update Parking
 **********************************************/
const updateFormEl = document.querySelector("#KeyFormUpdate");
const updSelKeyEl = updateFormEl.selectKey;
document.getElementById("update").addEventListener("click", async function() {
  document.getElementById("Location-M").style.setProperty("display", "none", "important")
  document.getElementById("Location-C").style.setProperty("display", "none", "important")
  document.getElementById("Location-R").style.setProperty("display", "none", "important")
  document.getElementById("Location-U").style.display = "block";
  document.getElementById("Location-D").style.setProperty("display", "none", "important")
  const visitorInstances = await Location.retrieveAll();
  updSelKeyEl.innerHTML = "";
  fillSelectWithOptions(updSelKeyEl, visitorInstances,
    "id", {
      displayProp: "name"
    });
  updateFormEl.reset();
});

// handle change events on key select element
updSelKeyEl.addEventListener("change", await handleCourseSelectChangeEvent);

// handle Save button click events
updateFormEl["commit"].addEventListener("click", async function() {
  const slots = {
    id: updateFormEl.id.value,
    name: updateFormEl.name.value,
  };
  await Location.update(slots);
  refreshManageDataUI();
});


/**********************************************
 * Use case Delete Location
 **********************************************/
const deleteFormEl = document.querySelector("#KeyFormDelete");
const delSelKeyEl = deleteFormEl.selectKey;
//----- set up event handler for Update button -------------------------
document.getElementById("delete").addEventListener("click", async function() {
  console.log("delete!!");
  document.getElementById("Location-M").style.setProperty("display", "none", "important")
  document.getElementById("Location-C").style.setProperty("display", "none", "important")
  document.getElementById("Location-R").style.setProperty("display", "none", "important")
  document.getElementById("Location-U").style.setProperty("display", "none", "important")
  document.getElementById("Location-D").style.display = "block";
  const visitorInstances = await Location.retrieveAll();
  // reset selection list (drop its previous contents)
  delSelKeyEl.innerHTML = "";
  // populate the selection list
  fillSelectWithOptions(delSelKeyEl, visitorInstances,
    "id", {
      displayProp: "name"
    });
  deleteFormEl.reset();
});
// handle Delete button click events
deleteFormEl["commit"].addEventListener("click", async function() {
  const delSelKeyEl = deleteFormEl.selectKey;
  const courseId = delSelKeyEl.value;
  let index = delSelKeyEl.selectedIndex;
  if (!courseId) return;
  if (confirm("Do you really want to delete this key?")) {
    await Location.destroy(courseId);
    delSelKeyEl.remove(index);
  }
});

/**********************************************
 * Refresh the keys site
 **********************************************/
function refreshCourses() {
  document.getElementById("Location-M").style.display = "block";
  document.getElementById("Location-C").style.setProperty("display", "none", "important")
  document.getElementById("Location-R").style.setProperty("display", "none", "important")
  document.getElementById("Location-U").style.setProperty("display", "none", "important")
  document.getElementById("Location-D").style.setProperty("display", "none", "important")
}

/**********************************************
 * Refresh the Manage Courses Data UI
 **********************************************/
function refreshManageDataUI() {
  // show the manage key UI and hide the other UIs
  document.getElementById("Location-M").style.display = "block";
  document.getElementById("Location-C").style.setProperty("display", "none", "important")
  document.getElementById("Location-R").style.setProperty("display", "none", "important")
  document.getElementById("Location-U").style.setProperty("display", "none", "important")
  document.getElementById("Location-D").style.setProperty("display", "none", "important")
}

/**
 * handle key selection events
 * when a key is selected, populate the form with the data of the selected key
 */
async function handleCourseSelectChangeEvent() {
  const updateFormEl = document.querySelector("#KeyFormUpdate"),
    saveButton = updateFormEl.commit;
  const objectKey = updSelKeyEl.value;
  if (objectKey) {
    const key = await Location.retrieve(objectKey);
    updateFormEl.id.value = key.id;
    updateFormEl.name.value = key.name;
    saveButton.disabled = false;
  } else {
    updateFormEl.reset();
    saveButton.disabled = true;
  }
}
