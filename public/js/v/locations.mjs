/***************************************************************
 Import classes, datatypes and utility procedures
 ***************************************************************/
 import Location from "../m/Location.mjs";
 import {fillSelectWithOptions} from "../../lib/util.mjs";
 
 /***************************************************************
  Load data
  ***************************************************************/
 //await Location.retrieveAll();
 
 /***************************************************************
  Set up general, use-case-independent UI elements
  ***************************************************************/
 
 // Set up Manage Location UI
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
 window.addEventListener("beforeunload", Location.saveAll);
 
 /**********************************************
  Use case Retrieve/List All Courses
  **********************************************/
 document.getElementById("retrieveAndListAll")
     .addEventListener("click", async function () {
     document.getElementById("Location-M").style.setProperty("display", "none", "important")
     document.getElementById("Location-C").style.setProperty("display", "none", "important")
     document.getElementById("Location-R").style.display = "Block";
     document.getElementById("Location-U").style.setProperty("display", "none", "important")
     document.getElementById("Location-D").style.setProperty("display", "none", "important")
     const tableBodyEl = document.querySelector("#locations > tbody");
     tableBodyEl.innerHTML = "";  // drop old content
     const visitorInstances = await Location.retrieveAll();
     for (const objectKey of Object.keys( visitorInstances)) {
         const location = visitorInstances[objectKey];
         const row = tableBodyEl.insertRow();
      row.insertCell().textContent = location.id; // added from me
      row.insertCell().textContent = location.name;
     }
 });
 
 /**********************************************
  Use case Create Location
  **********************************************/
 const createFormEl = document.querySelector("#LocationFormCreate"), 
    saveButton = createFormEl.commit;
 document.getElementById("create").addEventListener("click",async function () {
    console.log("cliccato");
    document.getElementById("Location-M").style.setProperty("display", "none", "important")
    document.getElementById("Location-C").style.display = "block";
    document.getElementById("Location-R").style.setProperty("display", "none", "important")
    document.getElementById("Location-U").style.setProperty("display", "none", "important")
    document.getElementById("Location-D").style.setProperty("display", "none", "important")
     createFormEl.reset();
 });

 /***************************************************************
 Add event listeners for responsive validation
 ***************************************************************/
    // add event listeners for responsive validation
    createFormEl.id.addEventListener("input", function () {
        createFormEl.id.setCustomValidity( Location.checkId( createFormEl.id.value).message);
    });
    createFormEl.name.addEventListener("input", function () {
        createFormEl.name.setCustomValidity( Location.checkName( createFormEl.name.value).message);
    });

 
 // handle Save button click events
 saveButton.addEventListener("click", async function () {
     const createFormEl = document.forms['LocationFormCreate'];
     const slots = {
        id: createFormEl.id.value,
        name: createFormEl.name.value,
     };
     console.log(slots);
     createFormEl.id.setCustomValidity(( await Location.checkIdAsId( slots.id)).message);
     createFormEl.name.setCustomValidity( Location.checkName( slots.name).message);
     console.log(createFormEl)
     if ( createFormEl.checkValidity()) {
        await Location.add( slots);
        refreshManageDataUI();
     } else {
         console.log("error")
     }
 });
 createFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
  });
 /**********************************************
  Use case Update Location
  **********************************************/
  const updateFormEl = document.querySelector("#LocationFormUpdate"),
    saveButtonUpdate = updateFormEl.commit,
    updSelKeyEl = updateFormEl.selectKey;
 document.getElementById("update").addEventListener("click",async function () {
    document.getElementById("Location-M").style.setProperty("display", "none", "important")
    document.getElementById("Location-C").style.setProperty("display", "none", "important")
    document.getElementById("Location-R").style.setProperty("display", "none", "important")
    document.getElementById("Location-U").style.display = "block";
    document.getElementById("Location-D").style.setProperty("display", "none", "important")
    const visitorInstances = await Location.retrieveAll();
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
        updateFormEl.id.setCustomValidity( Location.checkId( updateFormEl.id.value).message);
    });
    updateFormEl.name.addEventListener("input", function () {
        updateFormEl.name.setCustomValidity( Location.checkName( updateFormEl.name.value).message);
    });
 // handle change events on location select element
 updSelKeyEl.addEventListener("change", await handleCourseSelectChangeEvent);
 
 // handle Save button click events
 saveButtonUpdate.addEventListener("click", async function () {
     const slots = {
        id: updateFormEl.id.value,
        name: updateFormEl.name.value,
     };
     await Location.update( slots);
     refreshManageDataUI();
 });

 updateFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
  });
 
 /**********************************************
  * Use case Delete Location
  **********************************************/
  const deleteFormEl = document.querySelector("#LocationFormDelete");
  const delSelKeyEl = deleteFormEl.selectKey;
 //----- set up event handler for Update button -------------------------
 document.getElementById("delete").addEventListener("click", async function () {
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
     if (confirm("Do you really want to delete this location?")) {
         await Location.destroy(courseId);
         delSelKeyEl.remove(index);
     }
 });

  /**********************************************
  * Create locations
  **********************************************/
 
 
 /**********************************************
  * Refresh the Manage Courses Data UI
  **********************************************/
 function refreshManageDataUI() {
     // show the manage location UI and hide the other UIs
     document.getElementById("Location-M").style.display = "block";
     document.getElementById("Location-C").style.setProperty("display", "none", "important")
     document.getElementById("Location-R").style.setProperty("display", "none", "important")
     document.getElementById("Location-U").style.setProperty("display", "none", "important")
     document.getElementById("Location-D").style.setProperty("display", "none", "important")
 }
 
 /**
  * handle location selection events
  * when a location is selected, populate the form with the data of the selected location
  */
 async function handleCourseSelectChangeEvent() {
     const updateFormEl = document.querySelector("#LocationFormUpdate"),
         saveButtonUpdate = updateFormEl.commit;
     const objectKey = updSelKeyEl.value;
     console.log(objectKey)
     if(objectKey) {
         const location = await Location.retrieve( objectKey);
         updateFormEl.id.value = location.id;
         updateFormEl.name.value = location.name;
         saveButtonUpdate.disabled = false;
     } else {
         updateFormEl.reset();
         saveButtonUpdate.disabled = true;
     }
 }
 