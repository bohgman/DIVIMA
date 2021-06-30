/**
 * @fileOverview  Contains various view functions for the use case deleteVisitor
 * @authors Gerd Wagner & Juan-Francisco Reyes
 */
pl.v.deleteVisitor = {
  setupUserInterface: async function () {
    const formEl = document.forms["Visitor"],
          deleteButton = formEl.commit,
          selectVisitorEl = formEl.selectVisitor;
    // load all book records
    const visitorRecords = await Visitor.retrieveAll();
    for (const visitorRec of visitorRecords) {
      const optionEl = document.createElement("option");
      optionEl.text = visitorRec.name;
      optionEl.value = visitorRec.id;
      selectVisitorEl.add( optionEl, null);
    }
    // Set an event handler for the submit/delete button
    deleteButton.addEventListener("click",
        pl.v.deleteVisitor.handleDeleteButtonClickEvent);
  },
  // Event handler for deleting a visitor
  handleDeleteButtonClickEvent: async function () {
    const selectVisitorEl = document.forms['Visitor'].selectVisitor;
    const id = selectVisitorEl.value;
    if (id) {
      await Visitor.destroy( id);
      // remove deleted visitor from select options
      selectVisitorEl.remove( selectVisitorEl.selectedIndex);
    }
  }
}