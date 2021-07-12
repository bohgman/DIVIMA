/***************************************************************
 Import classes, datatypes and utility procedures
 ***************************************************************/
 import Parking from "../m/Parking.mjs";
 import {fillSelectWithOptions} from "../../lib/util.mjs";
 
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
     frm.addEventListener("submit", async function (e) {
         e.preventDefault();
         frm.reset();
     });
 }
 // save data when leaving the page
 //TODO
 window.addEventListener("beforeunload", Parking.saveAll);
 
 /**********************************************
  Use case Retrieve/List All Courses
  **********************************************/
 document.getElementById("retrieveAndListAll")
     .addEventListener("click", async function () {
     document.getElementById("Parking-M").style.setProperty("display", "none", "important")
     document.getElementById("Parking-C").style.setProperty("display", "none", "important")
     document.getElementById("Parking-R").style.display = "Block";
     document.getElementById("Parking-U").style.setProperty("display", "none", "important")
     document.getElementById("Parking-D").style.setProperty("display", "none", "important")
     const tableBodyEl = document.querySelector("#parkings > tbody");
     tableBodyEl.innerHTML = "";  // drop old content
     const visitorInstances = await Parking.retrieveAll();
     for (const objectKey of Object.keys( visitorInstances)) {
         const parking = visitorInstances[objectKey];
         const row = tableBodyEl.insertRow();
      row.insertCell().textContent = parking.id; // added from me
      row.insertCell().textContent = parking.name;
      row.insertCell().textContent = parking.title;
      row.insertCell().textContent = parking.location;
      row.insertCell().textContent = parking.isAvailable;
     }
 });
 
 /**********************************************
  Use case Create Parking
  **********************************************/
 const createFormEl = document.querySelector("#ParkingFormCreate"), 
    saveButton = createFormEl.commit;
 document.getElementById("create").addEventListener("click",async function () {
    console.log("cliccato");
    document.getElementById("Parking-M").style.setProperty("display", "none", "important")
    document.getElementById("Parking-C").style.display = "block";
    document.getElementById("Parking-R").style.setProperty("display", "none", "important")
    document.getElementById("Parking-U").style.setProperty("display", "none", "important")
    document.getElementById("Parking-D").style.setProperty("display", "none", "important")
     createFormEl.reset();
 });

 /***************************************************************
 Add event listeners for responsive validation
 ***************************************************************/
    // add event listeners for responsive validation
    createFormEl.id.addEventListener("input", function () {
        createFormEl.id.setCustomValidity( Parking.checkId( createFormEl.id.value).message);
    });
    createFormEl.title.addEventListener("input", function () {
        createFormEl.title.setCustomValidity( Parking.checkTitle( createFormEl.title.value).message);
    });
    createFormEl.name.addEventListener("input", function () {
        createFormEl.name.setCustomValidity( Parking.checkName( createFormEl.name.value).message);
    });
    createFormEl.location.addEventListener("input", function () {
        createFormEl.location.setCustomValidity( Parking.checkLocation( createFormEl.location.value).message);
    });
    createFormEl.isAvailable.addEventListener("input", function () {
        createFormEl.isAvailable.setCustomValidity( Parking.checkIsAvailable( createFormEl.isAvailable.value).message);
    });
 
 // handle Save button click events
 saveButton.addEventListener("click", async function () {
     const createFormEl = document.forms['ParkingFormCreate'];
     const slots = {
        id: createFormEl.id.value,
        name: createFormEl.name.value,
        title: createFormEl.title.value,
        location: createFormEl.location.value,
        isAvailable: createFormEl.isAvailable.checked
     };
     console.log(slots);
     createFormEl.id.setCustomValidity(( await Parking.checkIdAsId( slots.id)).message);
     createFormEl.title.setCustomValidity( Parking.checkTitle( slots.title).message);
     createFormEl.name.setCustomValidity( Parking.checkName( slots.name).message);
     createFormEl.location.setCustomValidity( Parking.checkLocation( slots.location).message);
     createFormEl.isAvailable.setCustomValidity( Parking.checkIsAvailable( slots.isAvailable).message);
     console.log(createFormEl)
     if ( createFormEl.checkValidity()) {
        await Parking.add( slots);
        refreshManageDataUI();
     } else {
         console.log("error")
     }
 });
 createFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
  });
 /**********************************************
  Use case Update Parking
  **********************************************/
  const updateFormEl = document.querySelector("#ParkingFormUpdate"),
    saveButtonUpdate = updateFormEl.commit,
    updSelKeyEl = updateFormEl.selectKey;
 document.getElementById("update").addEventListener("click",async function () {
    document.getElementById("Parking-M").style.setProperty("display", "none", "important")
    document.getElementById("Parking-C").style.setProperty("display", "none", "important")
    document.getElementById("Parking-R").style.setProperty("display", "none", "important")
    document.getElementById("Parking-U").style.display = "block";
    document.getElementById("Parking-D").style.setProperty("display", "none", "important")
    const visitorInstances = await Parking.retrieveAll();
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
        updateFormEl.id.setCustomValidity( Parking.checkId( updateFormEl.id.value).message);
    });
    updateFormEl.title.addEventListener("input", function () {
        updateFormEl.title.setCustomValidity( Parking.checkTitle( updateFormEl.title.value).message);
    });
    updateFormEl.name.addEventListener("input", function () {
        updateFormEl.name.setCustomValidity( Parking.checkName( updateFormEl.name.value).message);
    });
    updateFormEl.location.addEventListener("input", function () {
        updateFormEl.location.setCustomValidity( Parking.checkLocation( updateFormEl.location.value).message);
    });
    updateFormEl.isAvailable.addEventListener("input", function () {
        updateFormEl.isAvailable.setCustomValidity( Parking.checkIsAvailable( updateFormEl.isAvailable.value).message);
    });
 // handle change events on parking select element
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
     await Parking.update( slots);
     refreshManageDataUI();
 });

 updateFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
  });
 
 /**********************************************
  * Use case Delete Parking
  **********************************************/
  const deleteFormEl = document.querySelector("#ParkingFormDelete");
  const delSelKeyEl = deleteFormEl.selectKey;
 //----- set up event handler for Update button -------------------------
 document.getElementById("delete").addEventListener("click", async function () {
   console.log("delete!!");
   document.getElementById("Parking-M").style.setProperty("display", "none", "important")
   document.getElementById("Parking-C").style.setProperty("display", "none", "important")
   document.getElementById("Parking-R").style.setProperty("display", "none", "important")
   document.getElementById("Parking-U").style.setProperty("display", "none", "important")
   document.getElementById("Parking-D").style.display = "block";
   const visitorInstances = await Parking.retrieveAll();
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
     if (confirm("Do you really want to delete this parking?")) {
         await Parking.destroy(courseId);
         delSelKeyEl.remove(index);
     }
 });

  /**********************************************
  * Create parkings
  **********************************************/
 
 
 /**********************************************
  * Refresh the Manage Courses Data UI
  **********************************************/
 function refreshManageDataUI() {
     // show the manage parking UI and hide the other UIs
     document.getElementById("Parking-M").style.display = "block";
     document.getElementById("Parking-C").style.setProperty("display", "none", "important")
     document.getElementById("Parking-R").style.setProperty("display", "none", "important")
     document.getElementById("Parking-U").style.setProperty("display", "none", "important")
     document.getElementById("Parking-D").style.setProperty("display", "none", "important")
 }
 
 /**
  * handle parking selection events
  * when a parking is selected, populate the form with the data of the selected parking
  */
 async function handleCourseSelectChangeEvent() {
     const updateFormEl = document.querySelector("#ParkingFormUpdate"),
         saveButtonUpdate = updateFormEl.commit;
     const objectKey = updSelKeyEl.value;
     console.log(objectKey)
     if(objectKey) {
         const parking = await Parking.retrieve( objectKey);
         updateFormEl.id.value = parking.id;
         updateFormEl.name.value = parking.name;
         updateFormEl.title.value = parking.title;
         updateFormEl.location.value = parking.location;
         updateFormEl.isAvailable.checked = parking.isAvailable;
         saveButtonUpdate.disabled = false;
     } else {
         updateFormEl.reset();
         saveButtonUpdate.disabled = true;
     }
 }
 