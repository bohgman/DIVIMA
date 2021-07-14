/***************************************************************
 Import classes, datatypes and utility procedures
 ***************************************************************/
import Visit from "../m/Visit.mjs";
// import Visitor from "../m/Visitor.mjs";
import Location from "../m/Location.mjs";
import {
  fillSelectWithOptions
} from "../../lib/util.mjs";

/***************************************************************
 Load data
 ***************************************************************/
//await visit.retrieveAll();

/***************************************************************
 Set up general, use-case-independent UI elements
 ***************************************************************/

// Set up Manage visit UI
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
window.addEventListener("beforeunload", visit.saveAll);

/**********************************************
 Use case Retrieve/List All Courses
 **********************************************/
document.getElementById("retrieveAndListAll")
  .addEventListener("click", async function() {
    document.getElementById("Visit-M").style.setProperty("display", "none", "important")
    document.getElementById("Visit-C").style.setProperty("display", "none", "important")
    document.getElementById("Visit-R").style.display = "Block";
    document.getElementById("Visit-U").style.setProperty("display", "none", "important")
    document.getElementById("Visit-D").style.setProperty("display", "none", "important")
    const tableBodyEl = document.querySelector("#visits > tbody");
    tableBodyEl.innerHTML = ""; // drop old content
    const visitorInstances = await Visit.retrieveAll();
    for (const key of Object.keys(visitorInstances)) {
      const visit =  visitorInstances[objectKey];
      const row = tableBodyEl.insertRow();
      row.insertCell().textContent = visit.id; // added from me
      row.insertCell().textContent = visit.location;
      row.insertCell().textContent = visit.title;
      row.insertCell().textContent = visit.date;
      row.insertCell().textContent = visit.parkingPlace;
      row.insertCell().textContent = visit.isAvailable;

    }
  });

/**********************************************
 Use case Create visit
 **********************************************/
const createFormEl = document.querySelector("#VisitFormCreate");
document.getElementById("create").addEventListener("click", async function() {
  console.log("cliccato");
  document.getElementById("Visit-M").style.setProperty("display", "none", "important")
  document.getElementById("Visit-C").style.display = "block";
  document.getElementById("Visit-R").style.setProperty("display", "none", "important")
  document.getElementById("Visit-U").style.setProperty("display", "none", "important")
  document.getElementById("Visit-D").style.setProperty("display", "none", "important")
  createFormEl.reset();
});
/***************************************************************
Add event listeners for responsive validation
***************************************************************/
// add event listeners for responsive validation
createFormEl.id.addEventListener("input", function() {
  createFormEl.id.setCustomValidity(Visit.checkId(createFormEl.id.value).message);
});
createFormEl.location.addEventListener("input", function() {
  createFormEl.location.setCustomValidity(Visit.checkLocation(createFormEl.location.value).message);
});
createFormEl.title.addEventListener("input", function() {
  createFormEl.title.setCustomValidity(Visit.checkTitle(createFormEl.title.value).message);
});
createFormEl.date.addEventListener("input", function() {
  createFormEl.date.setCustomValidity(Visit.checkDate(createFormEl.date.value).message);
});
createFormEl.parkingPlace.addEventListener("input", function() {
  createFormEl.parkingPlace.setCustomValidity(Visit.checkParkingPlace(createFormEl.parkingPlace.value).message);
});
createFormEl.isAvailable.addEventListener("input", function() {
  createFormEl.isAvailable.setCustomValidity(Visit.checkIsAvailable(createFormEl.isAvailable.value).message);
});
// handle Save button click events
saveButton.addEventListener("click", async function() {
  const createFormEl = document.forms['VisitFormCreate'];
  const slots = {
    id: createFormEl.id.value,
    location: createFormEl.location.value,
    title: createFormEl.title.value,
    date: createFormEl.date.value,
    parkingPlace: createFormEl.parkingPlace.value,
    isAvailable: createFormEl.isAvailable.value
  };
  console.log(slots);
  createFormEl.id.setCustomValidity((await Visit.checkIdAsId(slots.id)).message);
  createFormEl.location.setCustomValidity(Visit.checkLocation(slots.location).message);
  createFormEl.title.setCustomValidity(Visit.checkTitle(slots.title).message);
  createFormEl.date.setCustomValidity(Visit.checkDate(slots.date).message);
  createFormEl.parkingPlace.setCustomValidity(Visit.checkParkingPlace(slots.parkingPlace).message);
  createFormEl.isAvailable.setCustomValidity(Visit.checkIsAvailable(slots.isAvailable).message);
  console.log(createFormEl)
  if (createFormEl.checkValidity()) {
    await Visit.add(slots);
    refreshManageDataUI();
  } else {
    console.log("error")
  }
});
createFormEl.addEventListener("submit", function(e) {
  e.preventDefault();
});

/**********************************************
 Use case Update Visit
 **********************************************/
const updateFormEl = document.querySelector("#VisitFormUpdate");
const updSelVisitEl = updateFormEl.selectVisit;
document.getElementById("update").addEventListener("click", async function() {
  document.getElementById("Visit-M").style.setProperty("display", "none", "important")
  document.getElementById("Visit-C").style.setProperty("display", "none", "important")
  document.getElementById("Visit-R").style.setProperty("display", "none", "important")
  document.getElementById("Visit-U").style.display = "block";
  document.getElementById("Visit-D").style.setProperty("display", "none", "important")
  const visitorInstances = await Visit.retrieveAll();
  updSelKeyEl.innerHTML = "";
  fillSelectWithOptions(updSelVisitEl, visitorInstances,
    "id", {
      displayProp: "name"
    });
  updateFormEl.reset();
});
// add event listeners for responsive validation
updateFormEl.id.addEventListener("input", function() {
  updateFormEl.id.setCustomValidity(Visit.checkId(updateFormEl.id.value).message);
});
updateFormEl.location.addEventListener("input", function() {
  updateFormEl.location.setCustomValidity(Visit.checkLocation(updateFormEl.location.value).message);
});
updateFormEl.title.addEventListener("input", function() {
  updateFormEl.title.setCustomValidity(Visit.checkTitle(updateFormEl.title.value).message);
});
updateFormEl.date.addEventListener("input", function() {
  updateFormEl.date.setCustomValidity(Visit.checkDate(updateFormEl.date.value).message);
});
updateFormEl.parkingPlace.addEventListener("input", function() {
  updateFormEl.parkingPlace.setCustomValidity(Visit.checkParkingPlace(updateFormEl.parkingPlace.value).message);
});
updateFormEl.isAvailable.addEventListener("input", function() {
  updateFormEl.isAvailable.setCustomValidity(Parking.checkIsAvailable(updateFormEl.isAvailable.value).message);
});

// handle change events on visit select element
updSelVisitEl.addEventListener("change", await handleCourseSelectChangeEvent);

// handle Save button click events
saveButtonUpdate.addEventListener("click", async function() {
  const slots = {
    id: updateFormEl.id.value,
    location: updateFormEl.location.value,
    title: updateFormEl.title.value,
    date: updateFormEl.date.value,
    parkingPlace: updateFormEl.parkingPlace.value,
    isAvailable: updateFormEl.isAvailable.value
  };
  await Visit.update(slots);
  refreshManageDataUI();
});
updateFormEl.addEventListener("submit", function(e) {
  e.preventDefault();
});

/**********************************************
 * Use case Delete Visit
 **********************************************/
const deleteFormEl = document.querySelector("#VisitFormDelete");
const delSelCourseEl = deleteFormEl.selectVisit;
//----- set up event handler for Update button -------------------------
document.getElementById("delete").addEventListener("click", async function() {
  console.log("delete!!");
  document.getElementById("Visit-M").style.setProperty("display", "none", "important")
  document.getElementById("Visit-C").style.setProperty("display", "none", "important")
  document.getElementById("Visit-R").style.setProperty("display", "none", "important")
  document.getElementById("Visit-U").style.setProperty("display", "none", "important")
  document.getElementById("Visit-D").style.display = "block";
  const visitorInstances = await Visit.retrieveAll();
  // reset selection list (drop its previous contents)
   delSelKeyEl.innerHTML = "";
  // populate the selection list
  fillSelectWithOptions( delSelKeyEl, visitorInstances,
      "id", {displayProp:"name"});
  deleteFormEl.reset();
   });
// handle Delete button click events
deleteFormEl["commit"].addEventListener("click", async function() {
  const delSeKeyEl = deleteFormEl.selectVisit;
  const courseId = delSelKeyEl.value;
  let index = delSelKeyEl.selectedIndex;
  if (!courseId) return;
  if (confirm("Do you really want to delete this Visit?")) {
    await Visit.destroy(courseId);
    delSelKeyEl.remove(index);
  }
});

/**********************************************
 * Refresh the Visits site
 **********************************************/
function refreshCourses() {
  document.getElementById("Visit-M").style.display = "block";
  document.getElementById("Visit-C").style.setProperty("display", "none", "important")
  document.getElementById("Visit-R").style.setProperty("display", "none", "important")
  document.getElementById("Visit-U").style.setProperty("display", "none", "important")
  document.getElementById("Visit-D").style.setProperty("display", "none", "important")
}

/**********************************************
 * Refresh the Manage Courses Data UI
 **********************************************/
function refreshManageDataUI() {
  // show the manage Visit UI and hide the other UIs
  document.getElementById("Visit-M").style.display = "block";
  document.getElementById("Visit-C").style.setProperty("display", "none", "important")
  document.getElementById("Visit-R").style.setProperty("display", "none", "important")
  document.getElementById("Visit-U").style.setProperty("display", "none", "important")
  document.getElementById("Visit-D").style.setProperty("display", "none", "important")
}

/**
 * handle Visit selection events
 * when a Visit is selected, populate the form with the data of the selected Visit
 */
async function handleCourseSelectChangeEvent() {
  const updateFormEl = document.querySelector("#VisitFormUpdate"),
    saveButton = updateFormEl.commit;
    const objectKey = updSelKeyEl.value;
    console.log(objectKey)
    if(objectKey) {
    const visit = await await Visit.retrieve(key);
    updateFormEl.id.value = visit.id;
    updateFormEl.location.value = visit.location;
    updateFormEl.title.value = visit.title;
    updateFormEl.date.value = visit.date;
    updateFormEl.parkingPlace.value = visit.parkingPlace;
    updateFormEl.isAvailable.checked = visit.isAvailable;
    saveButton.disabled = false;
  } else {
    updateFormEl.reset();
    saveButton.disabled = true;
  }
}
