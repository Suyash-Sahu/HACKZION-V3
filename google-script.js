function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // --- Duplicate USN check ---
    var existingData = sheet.getDataRange().getValues();
    var existingUSNs = new Set();

    // Collect all USNs already in the sheet
    // Assuming USN columns: Team Lead USN (index depends on your headers), and member USNs
    for (var r = 1; r < existingData.length; r++) {
      var row = existingData[r];
      for (var c = 0; c < row.length; c++) {
        var header = existingData[0][c] ? existingData[0][c].toString().toLowerCase() : "";
        if (header.indexOf("usn") !== -1 && row[c]) {
          existingUSNs.add(row[c].toString().trim().toUpperCase());
        }
      }
    }

    // Check team lead USN
    var allNewUSNs = [];
    if (data.teamLeadUSN) allNewUSNs.push(data.teamLeadUSN.trim().toUpperCase());

    // Check member USNs
    if (data.members && data.members.length > 0) {
      data.members.forEach(function(m) {
        if (m.usn) allNewUSNs.push(m.usn.trim().toUpperCase());
      });
    }

    var duplicates = allNewUSNs.filter(function(usn) {
      return existingUSNs.has(usn);
    });

    if (duplicates.length > 0) {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: "error",
          message: "Duplicate USN(s) found: " + duplicates.join(", "),
          duplicateUSNs: duplicates
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // --- Build the row ---
    var row = [
      new Date(),
      data.teamName,
      data.domain,
      data.participantCount,
      data.teamLeadName,
      data.teamLeadCollege,
      data.teamLeadUSN,
      data.teamLeadEmail,
      data.teamLeadPhone,
      data.teamLeadGithub || "",
      data.bestProjectGithub || "",
      data.pptLink
    ];

    // Add member data
    if (data.members && data.members.length > 0) {
      data.members.forEach(function(member) {
        row.push(member.name);
        row.push(member.usn);
        row.push(member.phone);
        row.push(member.email);
      });
    }

    sheet.appendRow(row);

    // Ensure headers exist on first row
    if (sheet.getLastRow() === 1 || existingData.length <= 1) {
      var headers = [
        "Timestamp", "Team Name", "Domain", "Participant Count",
        "Team Lead Name", "Team Lead College", "Team Lead USN",
        "Team Lead Email", "Team Lead Phone",
        "Team Lead GitHub", "Best Project GitHub", "PPT Link"
      ];
      var maxMembers = 3;
      for (var i = 1; i <= maxMembers; i++) {
        headers.push("Member " + i + " Name");
        headers.push("Member " + i + " USN");
        headers.push("Member " + i + " Phone");
        headers.push("Member " + i + " Email");
      }
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}