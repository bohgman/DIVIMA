/**
 * @fileOverview  View methods for the use case "update book"
 * @authors Gerd Wagner & Juan-Francisco Reyes
 */
pl.v.updateVisitor = {
  setupUserInterface: async function () {
    const formEl = document.forms["Visitor"],
          updateButton = formEl.commit,
          selectVisitorEl = formEl.selectVisitor;
    // load all visitor records
    const visitorRecords = await Visitor.retrieveAll();
    for (const visitorRec of visitorRecords) {
      const optionEl = document.createElement("option");
      optionEl.text = visitorRec.name;
      optionEl.value = visitorRec.id;
      selectVisitorEl.add( optionEl, null);
    }
    // when a visitor is selected, fill the form with its data
    selectVisitorEl.addEventListener("change", async function () {
      const id = selectVisitorEl.value;
      if (id) {
        // retrieve up-to-date book record
        const visitorRec = await Visitor.retrieve( id);
        formEl.id.value = visitorRec.id;
        formEl.name.value = visitorRec.name;
        formEl.visitorType.value = visitorRec.visitorType;
        formEl.assignedBranch.value = visitorRec.assignedBranch;
        formEl.companyName.value = visitorRec.companyName;
        formEl.email.value = visitorRec.email;
      } else {
        formEl.reset();
      }
    });
    // set an event handler for the submit/save button
    updateButton.addEventListener("click",
        pl.v.updateVisitor.handleSaveButtonClickEvent);
    // neutralize the submit event
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  },
  // save data
  handleSaveButtonClickEvent: async function () {
    const formEl = document.forms["Visitor"],
          selectVisitorEl = formEl.selectVisitor;
    const slots = {
      id: formEl.id.value,
      name: formEl.name.value,
      visitorType: formEl.visitorType.value,
      assignedBranch: formEl.assignedBranch.value,
      companyName: formEl.companyName.value,
      email: formEl.email.value
    };
    await Visitor.update( slots);
    // update the selection list option element
    selectVisitorEl.options[selectVisitorEl.selectedIndex].text = slots.name;
    formEl.reset();
  }
};