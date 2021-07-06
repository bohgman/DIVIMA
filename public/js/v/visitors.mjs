/***************************************************************
 Import classes, datatypes and utility procedures
 ***************************************************************/
import Visitor from "../m/Visitor.mjs";
import {
  fillSelectWithOptions
} from "../../lib/util.mjs";

/***************************************************************
 Load data
 ***************************************************************/
//await Visitor.retrieveAll();

/***************************************************************
 Set up general, use-case-independent UI elements
 ***************************************************************/

// Set up Manage Visitor UI
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
window.addEventListener("beforeunload", Visitor.saveAll);

/**********************************************
 Use case Retrieve/List All Courses
 **********************************************/
document.getElementById("retrieveAndListAll")
  .addEventListener("click", async function() {
    document.getElementById("Visitor-M").style.setProperty("display", "none", "important")
    document.getElementById("Visitor-C").style.setProperty("display", "none", "important")
    document.getElementById("Visitor-R").style.display = "Block";
    document.getElementById("Visitor-U").style.setProperty("display", "none", "important")
    document.getElementById("Visitor-D").style.setProperty("display", "none", "important")
    const tableBodyEl = document.querySelector("#visitors > tbody");
    tableBodyEl.innerHTML = ""; // drop old content
    const visitorInstances = await Visitor.retrieveAll();
    for (const key of Object.keys(visitorInstances)) {
      const visitor = visitorInstances[key];
      const row = tableBodyEl.insertRow();
      row.insertCell().textContent = visitor.id; // added from me
      row.insertCell().textContent = visitor.name;
      row.insertCell().textContent = visitor.visitorType;
      if (visitor.assignedBranch) {
        row.insertCell().textContent = visitor.assignedBranch;
      };
      if (visitor.companyName) {
        row.insertCell().textContent = visitor.companyName;
      };
      if (visitor.email) {
        row.insertCell().textContent = visitor.email;
      };
    }
  });

/**********************************************
 Use case Create Visitor
 **********************************************/
const createFormEl = document.querySelector("#VisitorFormCreate");
document.getElementById("create").addEventListener("click", async function() {
  console.log("cliccato");
  document.getElementById("Visitor-M").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-C").style.display = "block";
  document.getElementById("Visitor-R").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-U").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-D").style.setProperty("display", "none", "important")
  createFormEl.reset();
});

// handle Save button click events
createFormEl["commit"].addEventListener("click", async function() {
  const slots = {
    id: createFormEl.id.value,
    name: createFormEl.name.value,
    visitorType: createFormEl.visitorType.value,
    assignedBranch: createFormEl.assignedBranch.value,
    companyName: createFormEl.companyName.value,
    email: createFormEl.email.value
  };
  await Visitor.add(slots);
  refreshManageDataUI();
});

/**********************************************
 Use case Update Visitor
 **********************************************/
const updateFormEl = document.querySelector("#VisitorFormUpdate");
const updSelVisitorEl = updateFormEl.selectVisitor;
document.getElementById("update").addEventListener("click", async function() {
  document.getElementById("Visitor-M").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-C").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-R").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-U").style.display = "block";
  document.getElementById("Visitor-D").style.setProperty("display", "none", "important")
  const visitorInstances = await Visitor.retrieveAll();
  updSelVisitorEl.innerHTML = "";
  fillSelectWithOptions(updSelVisitorEl, visitorInstances,
    "id", {
      displayProp: "name"
    });
  updateFormEl.reset();
});

// handle change events on visitor select element
updSelVisitorEl.addEventListener("change", await handleCourseSelectChangeEvent);

// handle Save button click events
updateFormEl["commit"].addEventListener("click", async function() {
  const slots = {
    id: updateFormEl.id.value,
    name: updateFormEl.name.value,
    visitorType: updateFormEl.visitorType.value,
    assignedBranch: updateFormEl.assignedBranch.value,
    companyName: updateFormEl.companyName.value,
    email: updateFormEl.email.value
  };
  await Visitor.update(slots);
  refreshManageDataUI();
});


/**********************************************
 * Use case Delete Visitor
 **********************************************/
const deleteFormEl = document.querySelector("#VisitorFormDelete");
const delSelCourseEl = deleteFormEl.selectVisitor;
//----- set up event handler for Update button -------------------------
document.getElementById("delete").addEventListener("click", async function() {
  console.log("delete!!");
  document.getElementById("Visitor-M").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-C").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-R").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-U").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-D").style.display = "block";
  const visitorInstances = await Visitor.retrieveAll();
  // reset selection list (drop its previous contents)
  delSelCourseEl.innerHTML = "";
  // populate the selection list
  fillSelectWithOptions(delSelCourseEl, visitorInstances,
    "id", {
      displayProp: "name"
    });
  deleteFormEl.reset();
});
// handle Delete button click events
deleteFormEl["commit"].addEventListener("click", async function() {
  const delSelCourseEl = deleteFormEl.selectVisitor;
  const courseId = delSelCourseEl.value;
  let index = delSelCourseEl.selectedIndex;
  if (!courseId) return;
  if (confirm("Do you really want to delete this visitor?")) {
    await Visitor.destroy(courseId);
    delSelCourseEl.remove(index);
  }
});

/**********************************************
 * Refresh the visitors site
 **********************************************/
function refreshCourses() {
  document.getElementById("Visitor-M").style.display = "block";
  document.getElementById("Visitor-C").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-R").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-U").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-D").style.setProperty("display", "none", "important")
}

/**********************************************
 * Refresh the Manage Courses Data UI
 **********************************************/
function refreshManageDataUI() {
  // show the manage visitor UI and hide the other UIs
  document.getElementById("Visitor-M").style.display = "block";
  document.getElementById("Visitor-C").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-R").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-U").style.setProperty("display", "none", "important")
  document.getElementById("Visitor-D").style.setProperty("display", "none", "important")
}

/**
 * handle visitor selection events
 * when a visitor is selected, populate the form with the data of the selected visitor
 */
async function handleCourseSelectChangeEvent() {
  const updateFormEl = document.querySelector("#VisitorFormUpdate"),
    saveButton = updateFormEl.commit;
  const key = updSelVisitorEl.value;
  if (key) {
    const visitor = await await Visitor.retrieve(key);
    updateFormEl.id.value = visitor.id;
    updateFormEl.name.value = visitor.name;
    updateFormEl.visitorType.value = visitor.visitorType;
    updateFormEl.assignedBranch.value = visitor.assignedBranch;
    updateFormEl.companyName.value = visitor.companyName;
    updateFormEl.email.value = visitor.email;
    saveButton.disabled = false;
  } else {
    updateFormEl.reset();
    saveButton.disabled = true;
  }
}
