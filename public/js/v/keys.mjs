/***************************************************************
 Import classes, datatypes and utility procedures
 ***************************************************************/
 import Key from "../m/Key.mjs";
 import {fillSelectWithOptions} from "../../lib/util.mjs";
 
 /***************************************************************
  Load data
  ***************************************************************/
 //await Key.retrieveAll();
 
 /***************************************************************
  Set up general, use-case-independent UI elements
  ***************************************************************/
 
 // Set up Manage Key UI
 refreshManageDataUI();
 
 // neutralize the submit event for all CRUD UIs
 for (const frm of document.querySelectorAll("section > form")) {
     frm.addEventListener("submit", async function (e) {
         e.preventDefault();
         frm.reset();
     });
 }
 // save data when leaving the page
 //TODO
 window.addEventListener("beforeunload", Key.saveAll);
 
 /**********************************************
  Use case Retrieve/List All Courses
  **********************************************/
 document.getElementById("retrieveAndListAll")
     .addEventListener("click", async function () {
     document.getElementById("Key-M").style.setProperty("display", "none", "important")
     document.getElementById("Key-C").style.setProperty("display", "none", "important")
     document.getElementById("Key-R").style.display = "Block";
     document.getElementById("Key-U").style.setProperty("display", "none", "important")
     document.getElementById("Key-D").style.setProperty("display", "none", "important")
     const tableBodyEl = document.querySelector("#keys > tbody");
     tableBodyEl.innerHTML = "";  // drop old content
     const visitorInstances = await Key.retrieveAll();
     for (const objectKey of Object.keys( visitorInstances)) {
         const key = visitorInstances[objectKey];
         const row = tableBodyEl.insertRow();
      row.insertCell().textContent = key.id; // added from me
      row.insertCell().textContent = key.name;
      row.insertCell().textContent = key.title;
      row.insertCell().textContent = key.location;
      row.insertCell().textContent = key.isAvailable;
     }
 });
 
 /**********************************************
  Use case Create Key
  **********************************************/
 const createFormEl = document.querySelector("#KeyFormCreate"), 
    saveButton = createFormEl.commit;
 document.getElementById("create").addEventListener("click",async function () {
    console.log("cliccato");
    document.getElementById("Key-M").style.setProperty("display", "none", "important")
    document.getElementById("Key-C").style.display = "block";
    document.getElementById("Key-R").style.setProperty("display", "none", "important")
    document.getElementById("Key-U").style.setProperty("display", "none", "important")
    document.getElementById("Key-D").style.setProperty("display", "none", "important")
     createFormEl.reset();
 });

 /***************************************************************
 Add event listeners for responsive validation
 ***************************************************************/
    // add event listeners for responsive validation
    createFormEl.id.addEventListener("input", function () {
        createFormEl.id.setCustomValidity( Key.checkId( createFormEl.id.value).message);
    });
    createFormEl.title.addEventListener("input", function () {
        createFormEl.title.setCustomValidity( Key.checkTitle( createFormEl.title.value).message);
    });
    createFormEl.name.addEventListener("input", function () {
        createFormEl.name.setCustomValidity( Key.checkName( createFormEl.name.value).message);
    });
    createFormEl.location.addEventListener("input", function () {
        createFormEl.location.setCustomValidity( Key.checkLocation( createFormEl.location.value).message);
    });
    createFormEl.isAvailable.addEventListener("input", function () {
        createFormEl.isAvailable.setCustomValidity( Key.checkIsAvailable( createFormEl.isAvailable.value).message);
    });
 
 // handle Save button click events
 saveButton.addEventListener("click", async function () {
     const createFormEl = document.forms['KeyFormCreate'];
     const slots = {
        id: createFormEl.id.value,
        name: createFormEl.name.value,
        title: createFormEl.title.value,
        location: createFormEl.location.value,
        isAvailable: createFormEl.isAvailable.checked
     };
     console.log(slots);
     createFormEl.id.setCustomValidity(( await Key.checkIdAsId( slots.id)).message);
     createFormEl.title.setCustomValidity( Key.checkTitle( slots.title).message);
     createFormEl.name.setCustomValidity( Key.checkName( slots.name).message);
     createFormEl.location.setCustomValidity( Key.checkLocation( slots.location).message);
     createFormEl.isAvailable.setCustomValidity( Key.checkIsAvailable( slots.isAvailable).message);
     console.log(createFormEl)
     if ( createFormEl.checkValidity()) {
        await Key.add( slots);
        refreshManageDataUI();
     } else {
         console.log("error")
     }
 });
 createFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
  });
 /**********************************************
  Use case Update Key
  **********************************************/
  const updateFormEl = document.querySelector("#KeyFormUpdate"),
    saveButtonUpdate = updateFormEl.commit,
    updSelKeyEl = updateFormEl.selectKey;
 document.getElementById("update").addEventListener("click",async function () {
    document.getElementById("Key-M").style.setProperty("display", "none", "important")
    document.getElementById("Key-C").style.setProperty("display", "none", "important")
    document.getElementById("Key-R").style.setProperty("display", "none", "important")
    document.getElementById("Key-U").style.display = "block";
    document.getElementById("Key-D").style.setProperty("display", "none", "important")
    const visitorInstances = await Key.retrieveAll();
    updSelKeyEl.innerHTML = "";
    fillSelectWithOptions( updSelKeyEl, visitorInstances,
        "id", {displayProp:"name"});
        updateFormEl.reset();
 });
  /***************************************************************
 Add event listeners for responsive validation
 ***************************************************************/
    // add event listeners for responsive validation
    updateFormEl.id.addEventListener("input", function () {
        updateFormEl.id.setCustomValidity( Key.checkId( updateFormEl.id.value).message);
    });
    updateFormEl.title.addEventListener("input", function () {
        updateFormEl.title.setCustomValidity( Key.checkTitle( updateFormEl.title.value).message);
    });
    updateFormEl.name.addEventListener("input", function () {
        updateFormEl.name.setCustomValidity( Key.checkName( updateFormEl.name.value).message);
    });
    updateFormEl.location.addEventListener("input", function () {
        updateFormEl.location.setCustomValidity( Key.checkLocation( updateFormEl.location.value).message);
    });
    updateFormEl.isAvailable.addEventListener("input", function () {
        updateFormEl.isAvailable.setCustomValidity( Key.checkIsAvailable( updateFormEl.isAvailable.value).message);
    });
 // handle change events on key select element
 updSelKeyEl.addEventListener("change", await handleCourseSelectChangeEvent);
 
 // handle Save button click events
 saveButtonUpdate.addEventListener("click", async function () {
     const slots = {
        id: updateFormEl.id.value,
        name: updateFormEl.name.value,
        title: updateFormEl.title.value,
        location: updateFormEl.location.value,
        isAvailable: updateFormEl.isAvailable.checked,
     };
     await Key.update( slots);
     refreshManageDataUI();
 });

 updateFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
  });
 
 /**********************************************
  * Use case Delete Key
  **********************************************/
  const deleteFormEl = document.querySelector("#KeyFormDelete");
  const delSelKeyEl = deleteFormEl.selectKey;
 //----- set up event handler for Update button -------------------------
 document.getElementById("delete").addEventListener("click", async function () {
   console.log("delete!!");
   document.getElementById("Key-M").style.setProperty("display", "none", "important")
   document.getElementById("Key-C").style.setProperty("display", "none", "important")
   document.getElementById("Key-R").style.setProperty("display", "none", "important")
   document.getElementById("Key-U").style.setProperty("display", "none", "important")
   document.getElementById("Key-D").style.display = "block";
   const visitorInstances = await Key.retrieveAll();
     // reset selection list (drop its previous contents)
     delSelKeyEl.innerHTML = "";
     // populate the selection list
     fillSelectWithOptions( delSelKeyEl, visitorInstances,
         "id", {displayProp:"name"});
     deleteFormEl.reset();
 });
 // handle Delete button click events
 deleteFormEl["commit"].addEventListener("click", async function () {
     const delSelKeyEl = deleteFormEl.selectKey;
     const courseId = delSelKeyEl.value;
     let index = delSelKeyEl.selectedIndex;
     if (!courseId) return;
     if (confirm("Do you really want to delete this key?")) {
         await Key.destroy(courseId);
         delSelKeyEl.remove(index);
     }
 });

  /**********************************************
  * Create keys
  **********************************************/
 
 
 /**********************************************
  * Refresh the Manage Courses Data UI
  **********************************************/
 function refreshManageDataUI() {
     // show the manage key UI and hide the other UIs
     document.getElementById("Key-M").style.display = "block";
     document.getElementById("Key-C").style.setProperty("display", "none", "important")
     document.getElementById("Key-R").style.setProperty("display", "none", "important")
     document.getElementById("Key-U").style.setProperty("display", "none", "important")
     document.getElementById("Key-D").style.setProperty("display", "none", "important")
 }
 
 /**
  * handle key selection events
  * when a key is selected, populate the form with the data of the selected key
  */
 async function handleCourseSelectChangeEvent() {
     const updateFormEl = document.querySelector("#KeyFormUpdate"),
         saveButtonUpdate = updateFormEl.commit;
     const objectKey = updSelKeyEl.value;
     console.log(objectKey)
     if(objectKey) {
         const key = await Key.retrieve( objectKey);
         updateFormEl.id.value = key.id;
         updateFormEl.name.value = key.name;
         updateFormEl.title.value = key.title;
         updateFormEl.location.value = key.location;
         updateFormEl.isAvailable.checked = key.isAvailable;
         saveButtonUpdate.disabled = false;
     } else {
         updateFormEl.reset();
         saveButtonUpdate.disabled = true;
     }
 }
 