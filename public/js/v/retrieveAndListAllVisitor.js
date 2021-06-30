/**
 * @fileOverview  Contains various view functions for the use case listBooks
 * @authors Gerd Wagner & Juan-Francisco Reyes
 */
pl.v.retrieveAndListAllVisitors = {
  setupUserInterface: async function () {
    const tableBodyEl = document.querySelector("table#visitors>tbody");
    // load a list of all visitor records from Firestore
    const visitorRecord = await Visitor.retrieveAll();
    // for each visitor, create a table row with a cell for each attribute
    for (const visitorRec of visitorRecord) {
      const row = tableBodyEl.insertRow();
      row.insertCell().textContent = visitorRec.id; // added from me
      row.insertCell().textContent = visitorRec.name;
      row.insertCell().textContent = visitorRec.visitorType;
      if (visitorRec.assignedBranch) {
        row.insertCell().textContent = visitorRec.assignedBranch;
      };
      if (visitorRec.companyName) {
        row.insertCell().textContent = visitorRec.companyName;
      };
      if (visitorRec.email) {
        row.insertCell().textContent = visitorRec.email;
      };
    }
  }
}
