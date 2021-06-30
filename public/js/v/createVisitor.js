/**
 * @fileOverview  View methods for the use case "create book"
 * @authors Gerd Wagner & Juan-Francisco Reyes
 */
pl.v.createVisitor = {
  setupUserInterface: function () {
    const saveButton = document.forms['Visitor'].commit;
    // set an event handler for the submit/save button
    saveButton.addEventListener("click",
      pl.v.createVisitor.handleSaveButtonClickEvent);
  },
  // save user input data
  handleSaveButtonClickEvent: async function () {
    const formEl = document.forms['Visitor'];
    const slots = {
      id: formEl.id.value,
      name: formEl.name.value,
      visitorType: formEl.visitorType.value,
      assignedBranch: formEl.assignedBranch.value,
      companyName: formEl.companyName.value,
      email: formEl.email.value
    };
    await Visitor.add( slots);
    formEl.reset();
  }
}