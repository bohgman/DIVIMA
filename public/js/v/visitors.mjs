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
      row.insertCell().textContent = visitor.assignedBranch;
      row.insertCell().textContent = visitor.companyName;
      row.insertCell().textContent = visitor.email;

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
/***************************************************************
Add event listeners for responsive validation
***************************************************************/
// add event listeners for responsive validation
createFormEl.id.addEventListener("input", function() {
  createFormEl.id.setCustomValidity(Visitor.checkId(createFormEl.id.value).message);
});
createFormEl.visitorType.addEventListener("input", function() {
  createFormEl.visitorType.setCustomValidity(Visitor.checkVisitorType(createFormEl.visitorType.value).message);
});
createFormEl.name.addEventListener("input", function() {
  createFormEl.name.setCustomValidity(Visitor.checkName(createFormEl.name.value).message);
});
createFormEl.assignedBranch.addEventListener("input", function() {
  createFormEl.assignedBranch.setCustomValidity(Visitor.checkAssignedBranch(createFormEl.assignedBranch.value).message);
});
createFormEl.companyName.addEventListener("input", function() {
  createFormEl.companyName.setCustomValidity(Visitor.checkCompanyName(createFormEl.companyName.value).message);
});
createFormEl.email.addEventListener("input", function() {
  createFormEl.email.setCustomValidity(Visitor.checkEmail(createFormEl.email.value).message);
});
// handle Save button click events
saveButton.addEventListener("click", async function() {
  const createFormEl = document.forms['VisitorFormCreate'];
  const slots = {
    id: createFormEl.id.value,
    name: createFormEl.name.value,
    visitorType: createFormEl.visitorType.value,
    assignedBranch: createFormEl.assignedBranch.value,
    companyName: createFormEl.companyName.value,
    email: createFormEl.email.value
  };
  console.log(slots);
  createFormEl.id.setCustomValidity((await Visitor.checkIdAsId(slots.id)).message);
  createFormEl.visitorType.setCustomValidity(Visitor.checkVisitorType(slots.visitorType).message);
  createFormEl.name.setCustomValidity(Visitor.checkName(slots.name).message);
  createFormEl.assignedBranch.setCustomValidity(Visitor.checkAssignedBranch(slots.assignedBranch).message);
  createFormEl.companyName.setCustomValidity(Visitor.checkCompanyName(slots.companyName).message);
  createFormEl.email.setCustomValidity(Visitor.checkEmail(slots.email).message);
  console.log(createFormEl)
  if (createFormEl.checkValidity()) {
    await Visitor.add(slots);
    refreshManageDataUI();
  } else {
    console.log("error")
  }
});
createFormEl.addEventListener("submit", function(e) {
  e.preventDefault();
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
// add event listeners for responsive validation
updateFormEl.id.addEventListener("input", function() {
  updateFormEl.id.setCustomValidity(Visitor.checkId(createFormEl.id.value).message);
});
updateFormEl.visitorType.addEventListener("input", function() {
  updateFormEl.visitorType.setCustomValidity(Visitor.checkVisitorType(createFormEl.visitorType.value).message);
});
updateFormEl.name.addEventListener("input", function() {
  updateFormEl.name.setCustomValidity(Visitor.checkName(createFormEl.name.value).message);
});
updateFormEl.assignedBranch.addEventListener("input", function() {
  updateFormEl.assignedBranch.setCustomValidity(Visitor.checkAssignedBranch(createFormEl.assignedBranch.value).message);
});
updateFormEl.companyName.addEventListener("input", function() {
  updateFormEl.companyName.setCustomValidity(Visitor.checkCompanyName(createFormEl.companyName.value).message);
});
updateFormEl.email.addEventListener("input", function() {
  updateFormEl.email.setCustomValidity(Visitor.checkEmail(createFormEl.email.value).message);
});

// handle change events on visitor select element
updSelVisitorEl.addEventListener("change", await handleCourseSelectChangeEvent);

// handle Save button click events
saveButtonUpdate.addEventListener("click", async function() {
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
updateFormEl.addEventListener("submit", function(e) {
  e.preventDefault();
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
